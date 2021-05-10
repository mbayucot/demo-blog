require 'rails_helper'

RSpec.describe Auth0Services::VerifyToken do
  describe '#call' do
    context 'with invalid token' do
      it 'raises an error message' do
        expect { Auth0Services::VerifyToken.new('token').call }.to raise_error(
          JWT::DecodeError
        )
      end
    end
  end
end
