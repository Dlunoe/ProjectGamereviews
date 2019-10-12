class ReviewsController < ApplicationController
  before_action :set_review, only: [:show, :update, :destroy]
  after_action :add_headers

  def add_headers
    # response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.set_header('custom-header', 'present')
  end

  # GET /reviews
  def index
    @reviews = Review.all

    render json: {status:200, reviews: @reviews}
  end

  # GET /reviews/1
  def show
    @review = Review.find(params["id"])
    render json: {status:200, review: @review}
  end

  # POST /reviews
  def create
    @review = Review.new(review_params)

    if @review.save
      render json: {status: 200, review: @review}, status: :created, location: @review
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /reviews/1
  def update

    # puts "THIS IS REVIEW PARAMS RIGHT HERE #{review_params}"
    if @review.update(review_params)
      # puts review_params
      render json: {status:200, review: @review}
    else
      # puts review_params
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  # DELETE /reviews/1
  def destroy
    @review.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_review
      puts params["id"]
      @review = Review.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def review_params
      params.require(:review).permit(:title, :description, :opinion)
    end
end
