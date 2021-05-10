require 'rails_helper'

RSpec.describe UserMailer, type: :mailer do
  let(:user) { create(:user) }

  describe 'thank_you_email' do
    let(:mail) { described_class.with(user: user).thank_you_email }

    it 'renders the headers', :aggregate_failures do
      expect(mail.subject).to eq('Thanks for subscribing!')
      expect(mail.to).to eq([user.email])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match('Thanks for subscribing')
    end
  end
end
