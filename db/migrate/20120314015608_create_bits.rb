class CreateBits < ActiveRecord::Migration
  def change
    create_table :bits do |t|
      t.string :title
      t.text :content

      t.timestamps
    end
  end
end
