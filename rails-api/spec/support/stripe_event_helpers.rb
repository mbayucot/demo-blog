module StripeEventHelpers
  def generate_stripe_event_signature(payload)
    time = Time.now
    secret = ENV['STRIPE_SIGNING_SECRET']
    signature =
      Stripe::Webhook::Signature.compute_signature(time, payload, secret)
    Stripe::Webhook::Signature.generate_header(
      time,
      signature,
      scheme: Stripe::Webhook::Signature::EXPECTED_SCHEME
    )
  end
end
