class CommentsController < SecuredController
  before_action :set_article, only: %i[create]

  # POST /comments
  def create
    @comment = @article.comments.new(comment_params)
    @comment.author = current_user
    @comment.save!

    render json: @comment, status: :created
  end

  private

  def set_article
    @article = Article.find(params[:article_id])
  end

  def comment_params
    params.permit(:body, :parent_id)
  end
end
