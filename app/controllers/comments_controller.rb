class CommentsController < ApplicationController
  def create
    @comment = Comment.new
    redirect_to @comment.bit
  end
end
