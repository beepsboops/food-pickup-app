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


  $('.button-down').click(function() {
    let quantity = Number($('.quantity-value').val());
    if (quantity > 0) {
      quantity -=1;
    }
    $('.quantity-value').val(quantity)
  })

  $('.button-up').click(function() {
    let quantity = Number($('.quantity-value').val());
    if (quantity >= 10) {
      alert("You need to chill...");
      quantity = 10;
    } else if (quantity < 10) {
      quantity +=1;
    }

    $('.quantity-value').val(quantity)
  })

  $('.quantity-value').on('input', function() {
    let quantity = Number($('.quantity-value').val());
    if (quantity >= 10) {
      alert("You need to chill...");
      quantity = 10;
    }

    $('.quantity-value').val(quantity)
  });


});
