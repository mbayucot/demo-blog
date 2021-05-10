Stripe.api_key = Rails.application.credentials.dig(:stripe, :secret_key)
StripeEvent.signing_secret = ENV['STRIPE_SIGNING_SECRET']

StripeEvent.configure do |events|
  events.subscribe 'invoice.payment_succeeded' do |event|
    StripeInteractors::PlaceOrder.call(invoice: event.data.object)
  end

  events.subscribe 'invoice.payment_failed' do |event|
    StripeInteractors::UpdateSubscription.call(invoice: event.data.object)
  end

  events.subscribe 'invoice.created' do |event|
    StripeInteractors::UpdateSubscription.call(stripe_sub: event.data.object)
  end

  events.subscribe 'customer.subscription.' do |event|
    StripeInteractors::UpdateSubscription.call(stripe_sub: event.data.object)
  end
end
