class Bit < ActiveRecord::Base
  has_many :comments
  has_many :tags
end
