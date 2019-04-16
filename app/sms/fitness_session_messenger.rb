require 'twilio-ruby'

class FitnessSessionMessenger
  def initialize(session_id)
    @session = FitnessSession.find(session_id)
    @coach = @session.coach
    @client = @session.client
    @service = @session.fitness_service

    @account_sid = ENV['TWILIO_ACCOUNT_ID']
    @auth_token = ENV['TWILIO_AUTH_TOKEN']
    @twilio_phone = ENV['TWILIO_PHONE_NUMBER']
    @twilio_sms_client = Twilio::REST::Client.new(@account_sid, @auth_token)
  end

  def session_scheduled
    message = "#{@coach.name} has scheduled a #{@service.title} session with you" +
      " on #{@session.day.strftime('%A %m/%d/%Y')} from " +
      "#{@session.start_time_hour}:" +
      "#{@session.start_time_minutes.to_s.rjust(2, '0')}" +
      " #{@session.start_time_meridiem} to " +
      "#{@session.end_time_hour}:" +
      "#{@session.end_time_minutes.to_s.rjust(2, '0')}" +
      " #{@session.end_time_meridiem} at #{@session.location}"

    _send(@client.phone, message)
  end

  private

  def _send(to, message)
    @twilio_sms_client.messages.create(from: @twilio_phone, to: to, body: message)
  end
end


