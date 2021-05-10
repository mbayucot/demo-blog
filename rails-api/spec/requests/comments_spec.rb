require 'rails_helper'

RSpec.describe '/comments', type: :request do
  let(:user) { create(:user) }
  let(:article) { create(:article) }

  let(:valid_attributes) { { body: Faker::Lorem.sentence } }

  let(:invalid_attributes) { { body: nil } }

  before do
    allow_any_instance_of(SecuredController).to receive(:authenticate_request!)
      .and_return(true)
    allow_any_instance_of(SecuredController).to receive(:current_user)
      .and_return(user)
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Comment' do
        expect do
          post article_comments_url(article), params: valid_attributes
        end.to change(Comment, :count).by(1)
      end

      it 'returns 201' do
        post article_comments_url(article), params: valid_attributes
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Comment' do
        expect do
          post article_comments_url(article), params: invalid_attributes
        end.to change(Comment, :count).by(0)
      end

      it 'returns 422 with an error message', :aggregate_failures do
        post article_comments_url(article), params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json).to include_json('body': ["can't be blank"])
      end
    end
  end
end
