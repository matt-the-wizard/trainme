class FitnessServiceArchiveService < BaseService
  def initialize(data)
    super(data)
    _validate_params
  end

  def archive_service
    return @response if @response.errors?

    begin
      @service.update_attributes!(archived: true)
      @response.payload = @service
    rescue StandardError => exception
      @response.errors << exception.message
    end
    @response
  end

  private

  def _validate_params
    @service = @data[:service]
    @response.errors << 'Invalid type for service' unless @service&.is_a?(FitnessService)
    @response.errors << 'Service is already archived' if @service&.archived
  end
end