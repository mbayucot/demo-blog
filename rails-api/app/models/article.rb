class Article < ApplicationRecord
  extend FriendlyId

  include PgSearch::Model

  belongs_to :author, class_name: 'User'

  has_many :comments, counter_cache: true, dependent: :destroy

  validates :title, presence: true, uniqueness: { scope: :author_id }
  validates :body, presence: true
  validates :author_id, presence: true

  scope :ordered, -> { order(updated_at: :desc) }

  friendly_id :title, use: %i[slugged finders]

  acts_as_taggable

  acts_as_votable

  multisearchable against: %i[title body tags]
  pg_search_scope :search,
                  against: %i[title body],
                  associated_against: {
                    author: %i[first_name last_name], tags: %i[name]
                  },
                  using: { tsearch: { prefix: true } }
end
