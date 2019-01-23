require_relative '../lib/util'

class ClientArchiveService < BaseService
  def initialize(data)
    super(data)
    _validate_params
  end

  def archive_client
    return @response if @response.errors?

    begin
      @client.update_attributes!(archived: true)
      @response.payload = @client
    rescue StandardError => exception
      @response.errors << exception.message
    end
    @response
  end

  private

  def _validate_params
    @client = @data[:client]
    @response.errors << 'Invalid type for client' unless @client&.is_a?(Client)
    @response.errors << 'Client is already archived' if @client&.archived
  end
end