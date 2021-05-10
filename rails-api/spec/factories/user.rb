FactoryBot.define do
  factory :user do
    auth0_user_id { Faker::Alphanumeric.alphanumeric(number: 10) }
    email { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
  end
end
