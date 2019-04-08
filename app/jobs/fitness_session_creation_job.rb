class FitnessSessionCreationJob < ActiveJob::Base
  def perform(fitness_session_id)
    FitnessSessionMailer.with(session_id: fitness_session_id).session_scheduled.deliver
  end
end
