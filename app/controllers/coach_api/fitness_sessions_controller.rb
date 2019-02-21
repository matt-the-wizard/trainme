module CoachApi
  class FitnessSessionsController < ApiController
    def index
      day = params[:day].present? ? Date.parse(params[:day]) : Date.today
      response = FitnessSessionReportService.new(
        coach: current_user,
        day: day
      ).report

      if response.errors?
        render json: { errors: response.errors }, status: :conflict
      else
        render json: { sessions: response.payload.as_json }, status: :ok
      end
    end

    def create
      response = FitnessSessionCreationService.new(
        _session_creation_params.merge(coach: current_user,
                                       start_time: Time.zone.parse(_session_creation_params[:start_time]),
                                       end_time: Time.zone.parse(_session_creation_params[:end_time]),
                                       day: Date.parse(_session_creation_params[:day]),
                                       client: Client.find_by_id(_session_creation_params[:client_id]),
                                       service: FitnessService.find_by_id(_session_creation_params[:service_id]))
      ).create_session

      if response.errors?
        render json: { errors: response.errors }, status: :conflict
      else
        render json: { session: response.payload.as_json }, status: :ok
      end
    end

    private

    def _session_creation_params
      params.require(:session)
            .permit(
              :service_id,
              :client_id,
              :notes,
              :location,
              :start_time,
              :end_time,
              :day
            )
    end
  end
end
