$(document).ready(function() {

  //The actual fuction
  function toggleMenu() {
    if(!$('header').hasClass('menu-open')) {
      $('header').addClass('menu-open')
    } else {
      $('header').removeClass('menu-open')
    }
  }

  $('#open-menu').click(toggleMenu);
  $('#body-overlay').click(toggleMenu);

});
