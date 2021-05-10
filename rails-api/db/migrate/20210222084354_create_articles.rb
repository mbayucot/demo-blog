class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :body
      t.integer :author_id, null: false

      t.timestamps
    end

    add_foreign_key :articles, :users, column: :author_id

    add_index :articles, :author_id
    add_index :articles, %i[title author_id], unique: true
  end
end
