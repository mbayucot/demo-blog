class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :auth0_user_id
      t.string :email
      t.string :first_name
      t.string :last_name

      t.timestamps
    end

    add_index :users, %i[auth0_user_id], unique: true
  end
end
