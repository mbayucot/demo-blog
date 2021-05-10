FactoryBot.define do
  factory :article do
    title { Faker::Lorem.paragraph }
    body { Faker::Lorem.sentence }
    author factory: :user
    tag_list { Faker::Lorem.word }
  end
end
