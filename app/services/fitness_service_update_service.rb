class FitnessServiceUpdateService < BaseService
  def initialize(data)
    super(data)
    _validate_params
  end

  def update_service
    return @response if @response.errors?

    begin
      @service.update_attributes!(title: @title, duration: @duration)
      @response.payload = @service
    rescue StandardError => exception
      @response.errors << exception.message
    end
    @response
  end

  private

  def _validate_params
    @service = @data[:service]
    @title = @data[:title]
    @duration = @data[:duration]

    @response.errors << 'Title not provided'  unless @title.present?
    @response.errors << 'Duration not provided' unless @duration.present?
    @response.errors << 'Service not provided' unless @service.present?

    # Prevent nil exception
    return @response if @response.errors?

    @response.errors << 'Invalid type for service' unless @service.is_a?(FitnessService)
  end
end