class AddHomeTownToUsers < ActiveRecord::Migration
  def change
    add_column :users, :hometown, :string
  end
end
