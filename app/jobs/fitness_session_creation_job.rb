class FitnessSessionCreationJob < ActiveJob::Base
  def perform(fitness_session_id)
    # TODO: Make this async once I get sidekiq configured with deliver later
    FitnessSessionMailer.with(session_id: fitness_session_id).session_scheduled.deliver
  end
end
