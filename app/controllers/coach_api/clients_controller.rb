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
      params.require(:client).permit(:name, :phone, :email)
      service_params = {
        name: params[:client][:name],
        email: params[:client][:email],
        phone: params[:client][:phone],
        coach: current_user
      }
      response = ClientService.new(service_params).create_client

      if response.errors?
        render json: { errors: response.errors }, status: :conflict
      else
        render json: { client: response.payload }, status: :ok
      end
    end

    private

    def _client_params
      params.require(:client).permit(:name)
    end
  end
end
