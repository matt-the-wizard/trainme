module CoachApi
  class FitnessServicesController < ApiController
    def index
      services = FitnessService.where(coach: current_user, archived: false).order(:title)
      render json: { services: services }, status: :ok
    end

    def show
      service = FitnessService.find(params[:id])
      render json: { service: service.as_json(except: %i[created_at updated_at user_id]) }, status: :ok
    end

    def create
      response = FitnessServiceCreationService.new(
        _service_params.merge(coach: current_user)
      ).create_service

      if response.errors?
        render json: { errors: response.errors }, status: :conflict
      else
        render json: { service: response.payload.as_json(except: %i[created_at updated_at user_id]) }, status: :ok
      end
    end

    def update
      response = FitnessServiceUpdateService.new(
        _service_params.merge(service: FitnessService.find(params[:id]))
      ).update_service

      if response.errors?
        render json: { errors: response.errors }, status: :conflict
      else
        render json: { service: response.payload.as_json(except: %i[created_at updated_at user_id]) }, status: :ok
      end
    end

    def archive
      response = FitnessServiceArchiveService.new(
        service: FitnessService.find(params[:id])
      ).archive_service

      if response.errors?
        render json: { errors: response.errors }, status: :conflict
      else
        payload = {
          service: response.payload.as_json(except: %i[created_at updated_at user_id])
        }
        render json: payload, status: :ok
      end
    end

    private

    def _service_params
      params.require(:fitness_service).permit(:title, :duration)
    end
  end
end
