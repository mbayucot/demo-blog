Rails.application.routes.draw do
  defaults format: :json do
    resources :articles do
      member do
        patch 'like'
        patch 'unlike'
        get 'preview'
      end
      resources :comments, only: %i[create]
    end

    resource :users, only: %i[create] do
      collection { get :show }
    end

    resources :tags, only: %i[index]

    scope module: :webhooks do
      namespace :stripe do
        post :webhook
      end
    end
  end

  mount StripeEvent::Engine, at: '/stripe/webhooks'
end
