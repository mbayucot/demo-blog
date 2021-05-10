require 'net/http'
require 'uri'

module Auth0Services
  class VerifyToken
    def initialize(token)
      @token = token
    end

    def call
      JWT.decode(
        @token,
        nil,
        true,
        # Verify the signature of this token
        algorithm: 'RS256',
        iss: domain,
        verify_iss: true,
        aud: Rails.application.credentials.dig(:auth0, :api_identifier),
        verify_aud: true
      ) { |header| jwks_hash[header['kid']] }
    end

    private

    def jwks_hash
      jwks_raw = Net::HTTP.get URI("#{domain}.well-known/jwks.json")
      jwks_keys = Array(JSON.parse(jwks_raw)['keys'])
      Hash[
        jwks_keys.map do |k|
          [
            k['kid'],
            OpenSSL::X509::Certificate.new(Base64.decode64(k['x5c'].first))
              .public_key
          ]
        end
      ]
    end

    def domain
      @domain ||= Rails.application.credentials.dig(:auth0, :domain)
    end
  end
end
