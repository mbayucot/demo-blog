FactoryBot.define do
  factory :comment do
    body { Faker::Lorem.paragraph }
    author
  end
end
