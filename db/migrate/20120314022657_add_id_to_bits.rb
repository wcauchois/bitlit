class AddIdToBits < ActiveRecord::Migration
  def change
    add_column :bits, :id, :primary_key
  end
end
