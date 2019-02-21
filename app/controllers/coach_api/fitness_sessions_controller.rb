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
  end
end
