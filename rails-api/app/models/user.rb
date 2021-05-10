class User < ApplicationRecord
  include PgSearch::Model

  has_one :subscription, dependent: :destroy

  has_many :articles, foreign_key: 'author_id', dependent: :destroy
  has_many :comments, foreign_key: 'author_id', dependent: :destroy

  validates :auth0_user_id, presence: true, uniqueness: true
  validates :email, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true

  def is_subscribed
    subscription.present? ? subscription.active_or_trialing? : false
  end

  acts_as_voter

  multisearchable against: %i[first_name last_name]
end
