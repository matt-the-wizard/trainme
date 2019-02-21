class FitnessSessionReportService < BaseService
  def initialize(data)
    super(data)
    _validate_params
  end

  def report
    return @response if @response.errors?

    begin
      sessions = FitnessSession.arel_table
      clients = Client.arel_table
      coaches = User.arel_table
      services = FitnessService.arel_table

      projection = [
        sessions[:id],
        clients[:name].as('client_name'),
        services[:title].as('service_title'),
        sessions[:start_time],
        sessions[:end_time],
        sessions[:day],
        sessions[:location],
        sessions[:notes]
      ]

      sql = sessions
            .join(clients).on(clients[:id].eq(sessions[:client_id]))
            .join(coaches).on(coaches[:id].eq(sessions[:user_id]))
            .join(services).on(services[:id].eq(sessions[:fitness_service_id]))
            .project(*projection)
            .where(coaches[:id].eq(@coach.id))
            .where(sessions[:day].eq(@day)) # TODO: Make this array of date inputs
            .to_sql

      @response.payload = ActiveRecord::Base.connection.execute(sql).to_a
    rescue StandardError => exception
      @response.errors << exception.message
    end
    @response
  end

  private

  def _validate_params
    @coach = @data[:coach]
    @day = @data[:day]

    @response.errors << 'Coach not provided' unless @coach.present?
    @response.errors << 'Day not provided' unless @day.present?

    @response.errors << 'Invalid type for coach' unless @coach.is_a? User
    @response.errors << 'Invalid type for day' unless @day.is_a? Date
  end
end