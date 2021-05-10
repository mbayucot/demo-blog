require 'rails_helper'

RSpec.describe StripeInteractors::UpdateCustomer, type: :interactor do
  let(:user) { create(:user, email: 'test@gmail.com') }
  let(:invoice) { OpenStruct.new(customer: 'customer') }
  let(:stripe_sub) do
    OpenStruct.new(
      external_id: 'number',
      customer_email: user.email,
      status: 'trialing',
      cancel_at_period_end: true,
      current_period_start: DateTime.now.to_time.to_i,
      current_period_end: Faker::Date.forward(days: 30).to_time.to_i
    )
  end

  subject(:context) do
    StripeInteractors::UpdateCustomer.call(
      invoice: invoice, stripe_sub: stripe_sub
    )
  end

  describe '.call' do
    context 'when given a valid stripe subscription' do
      it 'succeeds' do
        expect(context).to be_a_success
      end

      it 'provides the user' do
        expect(context.user).to be_present
      end

      it 'provides the stripe_customer_id' do
        expect(context.user.stripe_customer_id).to eq(invoice.customer)
      end
    end

    context 'when given an invalid stripe subscription' do
      let(:context) { StripeInteractors::UpdateCustomer.call(invoice: nil) }

      it 'fails' do
        expect(context).to be_a_failure
      end

      it 'provides a failure message' do
        expect(context.message).to be_present
      end
    end
  end
end
