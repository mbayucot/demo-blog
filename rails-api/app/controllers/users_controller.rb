class UsersController < SecuredController
  before_action :set_user, only: %i[show]

  # GET /users/show
  def show
    render json: @user, show_stripe_id: true
  end

  # POST /users
  def create
    @user = User.find_or_create_by(auth0_user_id: user_params[:auth0_user_id])
    @user.update!(user_params) if @user.present?
    render json: @user, status: :ok
  end

  private

  def set_user
    @user = User.find(current_user.id)
  end

  def user_params
    params.permit(:auth0_user_id, :email, :first_name, :last_name)
  end
end
