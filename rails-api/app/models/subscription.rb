class Subscription < ApplicationRecord
  ACCESS_GRANTING_STATUSES = %w[trialing active past_due]

  enum status: { trialing: 0, active: 1, past_due: 2, canceled: 3 }

  belongs_to :user

  validates :external_id, presence: true

  scope :active_or_trialing, -> { where(status: ACCESS_GRANTING_STATUSES) }
  scope :recent, -> { order('current_period_end DESC NULLS LAST') }

  def active_or_trialing?
    ACCESS_GRANTING_STATUSES.include?(status)
  end

  def assign_stripe_attrs(stripe_sub)
    assign_attributes(
      status: stripe_sub.status,
      cancel_at_period_end: stripe_sub.cancel_at_period_end,
      current_period_start: Time.at(stripe_sub.current_period_start),
      current_period_end: Time.at(stripe_sub.current_period_end)
    )
  end
end
