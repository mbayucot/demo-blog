module StripeInteractors
  class UpdateCustomer < BaseInteractor
    def call
      user = User.find_by!(email: context.stripe_sub.customer_email)
      user.update!(stripe_customer_id: context.invoice.customer)
      context.user = user
    rescue StandardError => e
      context.fail!(message: e.message)
    end
  end
end
