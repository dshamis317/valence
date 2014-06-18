require 'spec_helper'

describe User do 

  describe '#new user' do 
    it 'can accept email and password parameters and create a new instance of User' do 
      user = User.new({email: 'email@email.com', password: 'password'})
      actual = user.email
      expected = 'email@email.com'
      expect(actual).to eq(expected)
    end
  end


  describe '#edit user' do 
    it 'can update its email address' do 
      user = User.new ({email: 'email@email.com', password: 'password'})
      user.email = 'user@user.com'
      actual = user.email
      expected = 'user@user.com'
      expect(actual).to eq(expected)
    end
  end
  
end