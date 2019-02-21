module CoachApi
  class FitnessServicesController < ApiController
    def index
      services = FitnessService.where(coach: current_user).order(:title)
      render json: { services: services }, status: :ok
    end

    def show
      service = FitnessService.find(params[:id])
      render json: { service: service.as_json(except: [:created_at, :updated_at, :user_id]) }, status: :ok
    end
  end
end