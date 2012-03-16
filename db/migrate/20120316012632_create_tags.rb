class CreateTags < ActiveRecord::Migration
  def up
    create_table :tags do |t|
      t.integer :bit_id
      t.string :name
    end
  end

  def down
    drop_table :tags
  end
end
