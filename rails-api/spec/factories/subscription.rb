FactoryBot.define do
  factory :subscription do
    external_id { Faker::Alphanumeric.alpha(number: 10) }
    status { Subscription.statuses.keys.sample }
    cancel_at_period_end { [true, false].sample }
    current_period_start { DateTime.now }
    current_period_end { Faker::Date.forward(days: 30) }
    user
  end
end
