module StripeInteractors
  class SendThankYou < BaseInteractor
    def call
      UserMailer.with(user: context.user).thank_you_email.deliver_later
    end
  end
end
