class BaseService
  def initialize(data)
    @response = ServiceResponse.new
    @data = HashWithIndifferentAccess.new(data)
  end
end