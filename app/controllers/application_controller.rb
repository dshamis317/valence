class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :new_user

  def not_authenticated
    redirect_to login_path
  end

  def new_user
    # unless current_user
      @user = User.new
    # end
  end

end
