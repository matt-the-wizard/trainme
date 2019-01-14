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
      client = Client.new(_client_params)
      client.coach = current_user

      # TODO: Replace with client creation service
      if client.save
        render json: { client: client }, status: :ok
      else
        render json: { errors: client.errors }, status: :conflict
      end
    end

    private

    def _client_params
      params.require(:client).permit(:name)
    end
  end
end
