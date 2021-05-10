require 'rails_helper'

RSpec.describe Subscription, type: :model do
  subject { create(:subscription) }

  describe 'constants' do
    it { expect(subject.class).to be_const_defined(:ACCESS_GRANTING_STATUSES) }
  end

  it do
    expect(subject).to define_enum_for(:status).with_values(
      trialing: 0, active: 1, past_due: 2, canceled: 3
    )
  end

  describe 'associations' do
    it { expect(subject).to belong_to(:user) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:external_id) }
  end

  describe 'scopes' do
    describe '.active_or_trialing' do
      it 'finds subscriptions by active_or_trialing status' do
        expect(described_class.active_or_trialing.to_sql).to eq described_class
             .where(status: Subscription::ACCESS_GRANTING_STATUSES).to_sql
      end
    end

    describe '.recent' do
      it 'sorts subscriptions by current_period_end' do
        expect(described_class.recent.to_sql).to eq described_class.order(
             'current_period_end DESC NULLS LAST'
           ).to_sql
      end
    end
  end

  describe '#active_or_trialing?' do
    it 'is true if active_or_trialing' do
      subject.status = 0
      expect(subject.active_or_trialing?).to be_truthy
    end
  end

  describe '#assign_stripe_attrs?' do
    it 'assigns attributes' do
      stripe_sub =
        OpenStruct.new(
          status: 'trialing',
          cancel_at_period_end: true,
          current_period_start: DateTime.now.to_time.to_i,
          current_period_end: Faker::Date.forward(days: 30).to_time.to_i
        )

      subject.assign_stripe_attrs(stripe_sub)
      expect(subject.status).to eq stripe_sub.status
      expect(subject.cancel_at_period_end).to eq stripe_sub.cancel_at_period_end
      expect(subject.current_period_start).to eq Time.at(
           stripe_sub.current_period_start
         )
      expect(subject.current_period_end).to eq Time.at(
           stripe_sub.current_period_end
         )
    end
  end
end
