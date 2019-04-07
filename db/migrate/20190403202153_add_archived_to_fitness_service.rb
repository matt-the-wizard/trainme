class AddArchivedToFitnessService < ActiveRecord::Migration[5.2]
  def change
    add_column :fitness_services, :archived, :boolean, null: false, default: false
  end
end
