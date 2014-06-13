class AddPreviewAndImageUrlsToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :image_url, :string
    add_column :songs, :preview_url, :string
  end
end
