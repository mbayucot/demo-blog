require 'rails_helper'

RSpec.describe SecuredController, type: :controller do
  let(:user) { create(:user) }

  controller do
    include Secured

    def index
      head :ok
    end
  end

  before do
    allow(controller).to receive(:authenticate_request!).and_return(true)
    allow(controller).to receive(:current_user).and_return(user)

    routes.draw { get :index, to: 'secured#index' }
  end

  describe 'authenticate! action callback' do
    it 'does redirect if user not sign in' do
      get :index
      expect(response).to have_http_status(:ok)
    end
  end
end
