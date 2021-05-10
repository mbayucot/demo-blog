class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.text :body
      t.references :article, null: false, foreign_key: true
      t.integer :author_id, null: false

      t.timestamps
    end

    add_foreign_key :comments, :users, column: :author_id

    add_index :comments, :author_id
  end
end
