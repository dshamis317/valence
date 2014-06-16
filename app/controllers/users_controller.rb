class UsersController < ApplicationController
  before_action :require_login, only: [:profile, :edit, :update, :show ]
  

  def index
    @user = User.new
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
      
    if @user.save
      redirect_to login_path
    else
      render :new
    end
  end

  def profile # instead of show...
    @user = User.find(params[:id])
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    redirect_to user_path(current_user)
  end

  def destroy
    User.delete(params[:id])
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :email_confirmation, :password_confirmation)
  end

end
