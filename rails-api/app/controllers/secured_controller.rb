class SecuredController < ApplicationController
  include Secured

  private

  def current_user
    if session[:user_id]
      @current_user ||= User.find_by(auth0_user_id: session[:user_id])
    end
  end
  helper_method :current_user
end
