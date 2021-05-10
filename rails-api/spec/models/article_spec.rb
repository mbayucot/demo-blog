require 'rails_helper'

RSpec.describe Article, type: :model do
  describe 'associations' do
    it { expect(subject).to belong_to(:author).class_name('User') }

    it do
      is_expected.to have_many(:comments).counter_cache(true).dependent(
        :destroy
      )
    end
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }
  end

  describe 'scopes' do
    describe '.ordered' do
      it 'sort articles by updated_at' do
        expect(described_class.ordered.to_sql).to eq described_class.order(
             updated_at: :desc
           ).to_sql
      end
    end
  end
end
