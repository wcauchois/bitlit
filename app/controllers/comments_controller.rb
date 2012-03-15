class CommentsController < ApplicationController
  def create
    @comment = Comment.new(params[:comment])
    if @comment.save
      redirect_to @comment.bit, notice: 'Comment added.'
    else
      redirect_to @comment.bit, notice: 'Failed to add comment.'
    end
  end
end
