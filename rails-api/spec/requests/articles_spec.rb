require 'rails_helper'

RSpec.describe '/articles', type: :request do
  let(:user) { create(:user) }

  let!(:articles) { create_list(:article, 10, author: user) }
  let(:article) { articles.first }

  let(:valid_attributes) do
    {
      title: Faker::Lorem.paragraph,
      body: Faker::Lorem.sentence,
      tag_list: [Faker::Lorem.word]
    }
  end

  let(:invalid_attributes) { { title: nil } }

  before do
    allow_any_instance_of(SecuredController).to receive(:authenticate_request!)
      .and_return(true)
    allow_any_instance_of(SecuredController).to receive(:current_user)
      .and_return(user)
  end

  describe 'GET /index' do
    context 'with no parameter' do
      before { get articles_url }

      it 'returns 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns a paginated result' do
        expect(json['entries'].size).to eq(10)
      end
    end

    context 'with query parameter' do
      before { get articles_url(query: Faker::Lorem.word) }

      it 'returns 200' do
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with tag parameter' do
      before { get articles_url(tag: Faker::Lorem.word) }

      it 'returns 200' do
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'GET /show' do
    context 'with valid parameters' do
      before { get article_url(article) }

      it 'returns 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns a article' do
        expect(response.body).to eq(
          ActiveModelSerializers::SerializableResource.new(article, user: user)
            .to_json
        )
      end
    end

    context 'with invalid parameters' do
      it 'returns 404' do
        get article_url(id: 0), as: :json
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Article' do
        expect { post articles_url, params: valid_attributes }.to change(
          Article,
          :count
        ).by(1)
      end

      it 'returns 201' do
        post articles_url, params: valid_attributes
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Article' do
        expect { post articles_url, params: invalid_attributes }.to change(
          Article,
          :count
        ).by(0)
      end

      it 'returns 422 with an error message', :aggregate_failures do
        post articles_url, params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json).to include_json('title': ["can't be blank"])
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:new_attributes) { { title: Faker::Lorem.word } }

      it 'updates the requested article' do
        patch article_url(article), params: new_attributes
        article.reload
        expect(article.title).to eq(new_attributes[:title])
      end

      it 'returns 200' do
        patch article_url(article), params: new_attributes
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid parameters', :aggregate_failures do
      it 'returns 422 with an error message' do
        patch article_url(article), params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json).to include_json('title': ["can't be blank"])
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'destroys the requested article' do
      expect { delete article_url(article) }.to change(Article, :count).by(-1)
    end

    it 'returns 204' do
      delete article_url(article)
      expect(response).to have_http_status(:no_content)
    end
  end

  describe 'GET /preview' do
    context 'with valid parameters' do
      before { get article_url(article) }

      it 'returns 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns an article' do
        expect(response.body).to eq(
          ActiveModelSerializers::SerializableResource.new(article, user: user)
            .to_json
        )
      end
    end

    context 'with invalid parameters' do
      it 'returns 404' do
        get article_url(id: 0), as: :json
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'PATCH /like' do
    context 'with valid parameters' do
      let(:new_attributes) { { vote_weight: 2 } }

      it 'likes the article' do
        expect do
          patch like_article_url(article), params: new_attributes
        end.to change(article.get_likes, :size).by(1)
      end

      it 'returns 204' do
        patch like_article_url(article), params: new_attributes
        expect(response).to have_http_status(:no_content)
      end
    end
  end

  describe 'PATCH /unlike' do
    context 'with valid parameters' do
      it 'unlikes the article' do
        expect { patch unlike_article_url(article) }.to change(
          article.get_likes,
          :size
        ).by(0)
      end

      it 'returns 204' do
        patch unlike_article_url(article)
        expect(response).to have_http_status(:no_content)
      end
    end
  end
end
