module StripeInteractors
  class PlaceOrder < BaseOrganizer
    organize StripeInteractors::CreateSubscription,
             StripeInteractors::UpdateCustomer,
             StripeInteractors::SendThankYou
  end
end
