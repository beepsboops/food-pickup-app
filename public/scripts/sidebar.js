$(document).ready(function() {

  //toggle menu side bar
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



