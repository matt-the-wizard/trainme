class AddArchivedToClients < ActiveRecord::Migration[5.2]
  def change
    add_column :clients, :archived, :boolean, null: false, default: false
  end
end
