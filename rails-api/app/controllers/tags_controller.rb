class TagsController < SecuredController
  # GET /tags
  def index
    @tags = ActsAsTaggableOn::Tag.all
    render json: @tags
  end
end
