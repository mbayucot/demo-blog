# frozen_string_literal: true
module Secured
  extend ActiveSupport::Concern

  included { before_action :authenticate_request! }

  private

  def authenticate_request!
    @auth_payload, @auth_header = auth_token
    if @auth_payload['sub'].present?
      session[:user_id] = @auth_payload['sub'].split('|')[1]
    end
  rescue JWT::VerificationError, JWT::DecodeError
    render json: { errors: ['Not Authenticated'] }, status: :unauthorized
  end

  def http_token
    if request.headers['Authorization'].present?
      request.headers['Authorization'].split(' ').last
    end
  end

  def auth_token
    Auth0Services::VerifyToken.new(http_token).call
  end
end
