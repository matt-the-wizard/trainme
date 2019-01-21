class ServiceResponse
  attr_accessor :errors, :payload

  def initialize
    @errors = []
    @payload = nil
  end

  def errors?
    @errors.any?
  end
end