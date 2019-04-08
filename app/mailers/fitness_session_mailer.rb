class FitnessSessionMailer < ActionMailer::Base

  def session_scheduled
    @session = FitnessSession.find(params[:session_id])
    @coach = @session.coach
    @client = @session.client
    @service = @session.fitness_service

    to = @client.email
    from = @coach.email
    subject = "#{@service.title} Scheduled On #{@session.day.strftime("%A %m/%d/%Y")}"
    mail(to: to, from: from, subject: subject)
  end
end
