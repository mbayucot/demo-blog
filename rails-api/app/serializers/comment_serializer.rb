class CommentSerializer < ActiveModel::Serializer
  attributes :id, :article_id, :body, :ancestry, :children
end
