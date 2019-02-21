class FitnessServiceCreationService < BaseService
  def initialize(data)
    super(data)
    _validate_params
  end

  def create_service
    return @response if @response.errors?

    begin
      fitness_service = FitnessService.create!(title: @title, coach: @coach, duration: @duration)
      if fitness_service.persisted?
        @response.payload = fitness_service
      else
        @response.errors << 'Failed to create fitness service'
      end
    rescue StandardError => exception
      @response.errors << exception.message
    end
    @response
  end

  private

  def _validate_params
    @coach = @data[:coach]
    @title = @data[:title]
    @duration = @data[:duration]

    @response.errors << 'Title not provided'  unless @title.present?
    @response.errors << 'Duration not provided' unless @duration.present?
    @response.errors << 'Coach not provided' unless @coach.present?
    # Prevent nil exception
    return @response if @response.errors?

    @response.errors << 'Invalid type for coach' unless @coach.is_a? User
  end
end