require 'spec_helper'

describe PlaylistsController do 

  describe 'given a playlist' do 

    before :each do 
      @playlist = Playlist.new
      @playlist.title = 'sad panda'
      @playlist.mood = 'emo'
      @playlist.save
    end

    # ---- INDEX ----
    describe 'GET index' do 

      before :each do 
        get :index
      end

      it 'responds successfully' do 
        actual = response.code
        expected = '200'
        expect(actual).to eq(expected)
      end

    end

  end



end