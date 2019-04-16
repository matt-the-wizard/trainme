require_relative '../lib/util'
require 'twilio-ruby'

class ClientUpdateService < BaseService
  def initialize(data)
    super(data)
    _validate_params
  end

  def update_client
    return @response if @response.errors?

    begin
      @twilio_lookup_client = Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_ID'], ENV['TWILIO_AUTH_TOKEN'])
      @phone = @twilio_lookup_client.lookups.phone_numbers(@phone).fetch.phone_number
      @client.update_attributes!(name: @name, phone: @phone, email: @email)
      @response.payload = @client
    rescue StandardError => exception
      @response.errors << exception.message
    end
    @response
  end

  private

  def _validate_params
    @client = @data[:client]
    @name  = @data[:name]
    @phone = @data[:phone]
    @email = @data[:email]

    @response.errors << 'Name not provided'  unless @name.present?
    @response.errors << 'Phone not provided' unless @phone.present?
    @response.errors << 'Email not provided' unless @email.present?
    @response.errors << 'Client not provided' unless @client.present?
    # Prevent nil exception
    return @response if @response.errors?

    @response.errors << 'Invalid type for name'  unless @name.is_a?(String)
    @response.errors << 'Invalid type for client' unless @client.is_a?(Client)

    unless @email.is_a?(String) && Util::EMAIL_FORMAT.match(@email)
      @response.errors << 'Invalid type for email'
    end
  end
end