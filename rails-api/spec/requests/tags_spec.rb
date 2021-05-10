require 'rails_helper'

RSpec.describe '/tags', type: :request do
  let(:user) { create(:user) }
  let(:article) { create(:article) }

  before do
    allow_any_instance_of(SecuredController).to receive(:authenticate_request!)
      .and_return(true)
    allow_any_instance_of(SecuredController).to receive(:current_user)
      .and_return(user)
  end

  describe 'GET /index' do
    context 'with no parameter' do
      before { get tags_url }

      it 'returns 200' do
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
