require 'rails_helper'

RSpec.describe StripeInteractors::PlaceOrder, type: :interactor do
  describe '.call' do
    it 'calls the interactors' do
      expect(StripeInteractors::CreateSubscription).to receive(:call!).ordered
      expect(StripeInteractors::UpdateCustomer).to receive(:call!).ordered
      expect(StripeInteractors::SendThankYou).to receive(:call!).ordered
      described_class.call
    end
  end
end
