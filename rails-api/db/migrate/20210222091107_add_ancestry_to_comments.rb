class AddAncestryToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :ancestry, :string
    add_index :comments, :ancestry
  end
end
