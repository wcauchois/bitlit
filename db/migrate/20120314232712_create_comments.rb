class CreateComments < ActiveRecord::Migration
  def up
    create_table :comments do |t|
      t.integer :bit_id
      t.integer :parent_id, :null => true
      t.string :name
      t.text :content

      t.timestamps
    end
  end

  def down
    drop_table :comments
  end
end
