module CoachApi
  class FitnessSessionsController < ApiController
    def index
      day = params[:day].present? ? Date.parse(params[:day]) : Time.zone.now.to_date
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
                                       start_time_hour: _session_creation_params[:start_time_hour],
                                       start_time_minutes: _session_creation_params[:start_time_minutes],
                                       start_time_meridiem: _session_creation_params[:start_time_meridiem],
                                       end_time_hour: _session_creation_params[:end_time_hour],
                                       end_time_minutes: _session_creation_params[:end_time_minutes],
                                       end_time_meridiem: _session_creation_params[:end_time_meridiem],
                                       day: Date.parse(_session_creation_params[:day]),
                                       client: Client.find_by_id(_session_creation_params[:client_id]),
                                       service: FitnessService.find_by_id(_session_creation_params[:service_id]))
      ).create_session

      if response.errors?
        render json: { errors: response.errors }, status: :conflict
      else
        fitness_session = response.payload
        render json: { session: response.payload.as_json.merge(
          client_name: fitness_session.client&.name,
          service_title: fitness_session.fitness_service&.title
        ) }, status: :ok
      end
    end

    private

    def _session_creation_params
      params.require(:fitness_session).permit(:service_id,
                                              :client_id,
                                              :notes,
                                              :location,
                                              :start_time_hour,
                                              :start_time_minutes,
                                              :start_time_meridiem,
                                              :end_time_hour,
                                              :end_time_minutes,
                                              :end_time_meridiem,
                                              :day)
    end
  end
end
