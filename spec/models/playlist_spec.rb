require 'spec_helper'

describe Playlist do 

  describe '#new playlist' do 
    it 'can accept mood and name parameters and create a new instance of Playlist' do 
      playlist = Playlist.new({mood: 'sad panda', title: 'rainy day mix'})
      actual = [playlist.mood, playlist.title]
      expected = ['sad panda', 'rainy day mix']
      expect(actual).to eq(expected)
    end
  end
  

  describe '#edit playlist' do 
    it 'can update its mood and title' do 
      playlist = Playlist.new({mood: 'sad panda', title: 'rainy day mix'})
      playlist.mood = 'suns out guns out'
      playlist.title = 'frat boy party'
      actual = [playlist.mood, playlist.title]
      expected = ['suns out guns out', 'frat boy party']
      expect(actual).to eq(expected)
    end
  end
  
end