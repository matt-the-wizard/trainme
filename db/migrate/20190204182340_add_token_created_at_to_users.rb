class AddTokenCreatedAtToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :auth_token_created_at, :datetime
    add_index :users, [:auth_token, :auth_token_created_at]
  end
end
