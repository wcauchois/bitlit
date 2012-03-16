class TagsController < ApplicationController
  def create
    tag = Tag.new(params[:tag])
    if tag.save
      redirect_to tag.bit
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
    bit_id = @tag.bit_id
    @tag.destroy

    redirect_to bit_path(bit_id)
  end
end
