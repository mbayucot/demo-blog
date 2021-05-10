require 'rails_helper'

RSpec.describe '/users', type: :request do
  let(:user) { create(:user) }

  let(:valid_attributes) do
    {
      auth0_user_id: Faker::IDNumber.valid,
      email: Faker::Internet.email,
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name
    }
  end

  let(:invalid_attributes) { { auth0_user_id: nil } }

  before do
    allow_any_instance_of(SecuredController).to receive(:authenticate_request!)
      .and_return(true)
    allow_any_instance_of(SecuredController).to receive(:current_user)
      .and_return(user)
  end

  describe 'GET /show' do
    context 'with valid parameters' do
      before { get users_url }

      it 'returns 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns a user' do
        expect(response.body).to eq(
          ActiveModelSerializers::SerializableResource.new(user).to_json
        )
      end
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new User' do
        expect { post users_url, params: valid_attributes }.to change(
          User,
          :count
        ).by(1)
      end

      it 'returns 200' do
        post users_url, params: valid_attributes
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new User' do
        expect { post users_url, params: invalid_attributes }.to change(
          User,
          :count
        ).by(0)
      end

      it 'returns 422 with an error message', :aggregate_failures do
        post users_url, params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json).to include_json('email': ["can't be blank"])
      end
    end
  end
end
