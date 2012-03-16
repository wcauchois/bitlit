class TagsController < ApplicationController
  def create
    tag = Tag.new(params[:tag])
    if tag.save
      redirect_to tag.bit
    end
  end
end
