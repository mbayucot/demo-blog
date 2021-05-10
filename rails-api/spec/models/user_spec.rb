require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it do
      expect(subject).to have_many(:articles).with_foreign_key('author_id')
        .dependent(:destroy)
    end
    it do
      expect(subject).to have_many(:comments).with_foreign_key('author_id')
        .dependent(:destroy)
    end
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:auth0_user_id) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:first_name) }
    it { is_expected.to validate_presence_of(:last_name) }

    it { is_expected.to validate_uniqueness_of(:auth0_user_id) }
  end

  describe '#is_subscribed' do
    it 'is false if no subscription' do
      expect(subject.is_subscribed).to be_falsey
    end
  end
end
