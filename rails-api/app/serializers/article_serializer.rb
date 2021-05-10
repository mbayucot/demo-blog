class ArticleSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :slug,
             :author,
             :tag_list,
             :preview,
             :comments,
             :comments_count,
             :created_at_fmt,
             :vote_weight

  attribute :is_subscribed, if: -> { @instance_options[:user].present? }
  attribute :body, if: -> { @instance_options[:user].present? }

  def preview
    object.body.truncate(250, omission: '...')
  end

  def comments
    object.comments.arrange_serializable(order: :created_at)
  end

  def comments_count
    object.comments.length
  end

  def created_at_fmt
    I18n.l(object.created_at, format: :gmt)
  end

  def is_subscribed
    @instance_options[:user].is_subscribed
  end

  def body
    object.body if is_subscribed
  end

  def vote_weight
    if @instance_options[:user].present?
      vote = @instance_options[:user].votes.where(votable_id: object.id)
      vote.first.vote_weight if vote.exists?
    else
      0
    end
  end
end
