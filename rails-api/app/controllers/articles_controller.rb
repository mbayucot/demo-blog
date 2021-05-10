class ArticlesController < SecuredController
  skip_before_action :authenticate_request!, only: %i[index preview]
  before_action :set_article, only: %i[show update destroy preview like unlike]

  # GET /articles
  def index
    if params[:query].present?
      @articles = Article.search(params[:query]).ordered
    elsif params[:tag].present?
      @articles = Article.tagged_with(params[:tag])
    else
      @articles = Article.ordered
    end

    render json: @articles, adapter: :json, root: 'entries'
  end

  # GET /articles/1
  def show
    render json: @article, user: current_user
  end

  # POST /articles
  def create
    @article = current_user.articles.create!(article_params)
    render json: @article, status: :created
  end

  # PATCH/PUT /articles/1
  def update
    @article.update!(article_params)
    render json: @article
  end

  # DELETE /articles/1
  def destroy
    @article.destroy
  end

  # GET /articles/1/preview
  def preview
    render json: @article, user: current_user
  end

  # POST /articles/1/like
  def like
    @article.liked_by current_user, vote_weight: params[:weight]
  end

  # POST /articles/1/unlike
  def unlike
    @article.unliked_by current_user
  end

  private

  def set_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.permit(:title, :body, tag_list: [])
  end
end
