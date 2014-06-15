$(function() {
   var $signUp = $('.signUp');
   $signUp.click(function() {
      var $div = $('<div>');
      $div.addClass('signUpModal').css({'height': '500px', 'width': '500px', 'background-color': 'steelblue'}).html('Sign Up Here');
      $('.container').append($div);
   })
})


