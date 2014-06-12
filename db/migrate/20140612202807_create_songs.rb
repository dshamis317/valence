class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title
      t.string :artist
      t.float :energy
      t.float :liveness
      t.float :tempo
      t.float :speechiness
      t.float :acousticness
      t.integer :time_signature
      t.float :duration
      t.float :loudness
      t.float :valence
      t.float :danceability

      t.timestamps
    end
  end
end
