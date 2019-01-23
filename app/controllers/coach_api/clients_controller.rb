module CoachApi
  class ClientsController < ApiController
    def index
      clients = Client.where(coach: current_user).order(:name)
      render json: { clients: clients }, status: :ok
    end

    def show
      client = Client.find(params[:id])
      render json: { client: client }, status: :ok
    end

    def create
      response = ClientCreationService.new(
        _client_params.merge(coach: current_user)
      ).create_client

      if response.errors?
        render json: { errors: response.errors }, status: :conflict
      else
        render json: { client: response.payload.as_json(except: [:created_at, :updated_at, :user_id]) }, status: :ok
      end
    end

    def update
      response = ClientUpdateService.new(
        _client_params.merge(client: Client.find(params[:id]))
      ).update_client

      if response.errors?
        render json: { errors: response.errors }, status: :conflict
      else
        render json: { client: response.payload.as_json(except: [:created_at, :updated_at, :user_id]) }, status: :ok
      end
    end

    private

    def _client_params
      params.require(:client).permit(:name, :phone, :email)
    end
  end
end
