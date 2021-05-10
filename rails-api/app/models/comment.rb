class Comment < ApplicationRecord
  belongs_to :article
  belongs_to :author, class_name: 'User'

  validates :body, presence: true
  validates :author_id, presence: true

  has_ancestry
end
