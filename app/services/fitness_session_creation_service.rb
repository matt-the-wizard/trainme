class FitnessSessionCreationService < BaseService
  def initialize(data)
    super(data)
    _validate_params
  end

  def create_session
    return @response if @response.errors?

    begin
      fitness_session = FitnessSession.create!(
        notes: @notes,
        coach: @coach,
        location: @location,
        client: @client,
        start_time: @start_time,
        end_time: @end_time,
        day: @day,
        fitness_service: @service
      )
      if fitness_session.persisted?
        @response.payload = fitness_session
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
    @start_time = @data[:start_time]
    @end_time = @data[:end_time]
    @day = @data[:day]

    @response.errors << 'Coach not provided'  unless @coach.present?
    @response.errors << 'Client not provided' unless @client.present?
    @response.errors << 'Service not provided' unless @service.present?
    @response.errors << 'Start Time not provided' unless @start_time.present?
    @response.errors << 'End Time not provided' unless @end_time.present?
    @response.errors << 'Location not provided' unless @location.present?
    # Prevent nil exception
    return @response if @response.errors?

    @response.errors << 'Invalid type for coach' unless @coach.is_a? User
    @response.errors << 'Invalid type for client' unless @client.is_a? Client
    @response.errors << 'Invalid type for service' unless @service.is_a? FitnessService
    @response.errors << 'Invalid type for day' unless @day.is_a? Date
    @response.errors << 'Invalid type for start time' unless @start_time.is_a? Time
    @response.errors << 'Invalid type for end time' unless @end_time.is_a? Time

    @response.errors << 'Start time must be before end time' if @start_time >= @end_time
  end
end