class CreateTrackings < ActiveRecord::Migration
  def change
    create_table :trackings do |t|
    	t.string :ip
    	t.string :location
    	t.string :time

      t.timestamps
    end
  end
end
