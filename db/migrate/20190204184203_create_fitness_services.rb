class CreateFitnessServices < ActiveRecord::Migration[5.2]
  def change
    create_table :fitness_services do |t|
      t.string :title, null: false
      t.integer :duration, null: false
      t.belongs_to :user

      t.timestamps
    end
  end
end
