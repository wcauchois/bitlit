class Comment < ActiveRecord::Base
  belongs_to :bit
  belongs_to :comment, :foreign_key => "parent_id"
  has_many :comments, :foreign_key => "parent_id"
end
