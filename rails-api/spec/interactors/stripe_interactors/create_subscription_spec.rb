require 'rails_helper'

RSpec.describe StripeInteractors::CreateSubscription, type: :interactor do
  let(:user) { create(:user) }
  let(:stripe_sub) do
    OpenStruct.new(
      external_id: 'number',
      status: 'trialing',
      cancel_at_period_end: true,
      current_period_start: DateTime.now.to_time.to_i,
      current_period_end: Faker::Date.forward(days: 30).to_time.to_i
    )
  end

  subject(:context) do
    StripeInteractors::CreateSubscription.call(
      stripe_sub: stripe_sub, user: user
    )
  end

  describe '.call' do
    context 'when given a valid stripe subscription' do
      it 'succeeds' do
        expect(context).to be_a_success
      end

      it 'provides the sbuscription' do
        expect(context.subscription).to be_present
      end

      it 'provides the external_id' do
        expect(context.subscription.external_id).to eq(stripe_sub.external_id)
      end
    end

    context 'when given an invalid stripe subscription' do
      let(:context) do
        StripeInteractors::CreateSubscription.call(stripe_sub: nil, user: user)
      end

      it 'fails' do
        expect(context).to be_a_failure
      end

      it 'provides a failure message' do
        expect(context.message).to be_present
      end
    end
  end
end
