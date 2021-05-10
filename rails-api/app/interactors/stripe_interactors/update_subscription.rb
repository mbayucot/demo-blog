module StripeInteractors
  class UpdateSubscription < BaseInteractor
    before do
      if context.stripe_sup.blank? && context.invoice.present?
        context.stripe_sub =
          Stripe::Subscription.retrieve(context.invoice.subscription)
      end
    end

    def call
      subscription = Subscription.find_by!(external_id: context.stripe_sub.id)
      subscription.assign_stripe_attrs(context.stripe_sub)
      subscription.save!
      context.subscription = subscription
    rescue StandardError => e
      context.fail!(message: e.message)
    end
  end
end
