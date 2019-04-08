# frozen_string_literal: true

class FitnessSessionCreationService < BaseService
  def initialize(data)
    super(data)
    _validate_params
  end

  def create_session
    return @response if @response.errors?

    begin
      @fitness_session.save!
      if @fitness_session.persisted?
        FitnessSessionCreationJob.perform_now(@fitness_session.id)
        @response.payload = @fitness_session
      else
        @response.errors << 'Failed to create fitness session'
      end
    rescue StandardError => exception
      @response.errors << exception.message
    end
    @response
  end

  private

  def _validate_params
    @coach = @data[:coach]
    @notes = @data[:notes]
    @client = @data[:client]
    @service = @data[:service]
    @location = @data[:location]
    @day = @data[:day]

    @start_time_hour = @data[:start_time_hour]
    @start_time_minutes = @data[:start_time_minutes]
    @start_time_meridiem = @data[:start_time_meridiem]

    @end_time_hour = @data[:end_time_hour]
    @end_time_minutes = @data[:end_time_minutes]
    @end_time_meridiem = @data[:end_time_meridiem]

    # Validate Nil
    @response.errors << 'Coach not provided'  unless @coach.present?
    @response.errors << 'Client not provided' unless @client.present?
    @response.errors << 'Service not provided' unless @service.present?
    @response.errors << 'Location not provided' unless @location.present?

    unless @start_time_hour.present?
      @response.errors << 'Start Time Hour not provided'
    end
    unless @start_time_minutes.present?
      @response.errors << 'Start Time Minute not provided'
    end
    unless @start_time_meridiem.present?
      @response.errors << 'Start Time Meridiem not provided'
    end

    unless @end_time_hour.present?
      @response.errors << 'End Time Hour not provided'
    end
    unless @end_time_minutes.present?
      @response.errors << 'End Time Minute not provided'
    end
    unless @end_time_meridiem.present?
      @response.errors << 'End Time Meridiem not provided'
    end

    # Prevent nil exception
    return @response if @response.errors?

    # Validate Data Types
    @response.errors << 'Invalid type for coach' unless @coach.is_a? User
    @response.errors << 'Invalid type for client' unless @client.is_a? Client
    @response.errors << 'Invalid type for day' unless @day.is_a? Date

    unless @service.is_a? FitnessService
      @response.errors << 'Invalid type for service'
    end

    unless @start_time_hour.is_a?(Integer) && (1..12).cover?(@start_time_hour)
      @response.errors << 'Invalid type for start time hour'
    end
    unless @start_time_minutes.is_a?(Integer) && (0..59).cover?(@start_time_minutes)
      @response.errors << 'Invalid type for start time minutes'
    end
    unless @start_time_meridiem.is_a?(String) && %w[AM PM].include?(@start_time_meridiem)
      @response.errors << 'Invalid type for start time meridiem'
    end

    unless @end_time_hour.is_a?(Integer) && (1..12).cover?(@end_time_hour)
      @response.errors << 'Invalid type for end time hour'
    end
    unless @end_time_minutes.is_a?(Integer) && (0..59).cover?(@end_time_minutes)
      @response.errors << 'Invalid type for end time minutes'
    end
    unless @end_time_meridiem.is_a?(String) && %w[AM PM].include?(@end_time_meridiem)
      @response.errors << 'Invalid type for end time meridiem'
    end

    # Validate constructed start time is before constructed end time
    @fitness_session = FitnessSession.new(
      notes: @notes,
      coach: @coach,
      location: @location,
      client: @client,
      start_time_hour: @start_time_hour,
      start_time_minutes: @start_time_minutes,
      start_time_meridiem: @start_time_meridiem,
      end_time_hour: @end_time_hour,
      end_time_minutes: @end_time_minutes,
      end_time_meridiem: @end_time_meridiem,
      day: @day,
      fitness_service: @service
    )

    unless @fitness_session.session_start_time < @fitness_session.session_end_time
      logger = Logger.new(STDOUT)
      logger.debug("Start Time: #{@fitness_session.session_start_time}")
      logger.debug("End Time: #{@fitness_session.session_end_time}")
      @response.errors << 'Start time must be before end time'
    end
  end
end
