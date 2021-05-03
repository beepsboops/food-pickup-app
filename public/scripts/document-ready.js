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

  // change item quantities
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

  // read and submit form data
  $('.order-submission-data').submit(() => {
    const allRows = $('.order-data-row')
    const orderSubmissionData = [{
      order_id: Number($(`.order-id`).html().split("#").pop()),
      time_confirmed: new Date()
    }];

    allRows.each((index, element) => {
      let id = $(`.order-submission-id:eq(${index})`).html();
      let itemName = $(`.item-name:eq(${index})`).html();
      let quantity = $(`.quantity-value:eq(${index})`).val();
      let tableObj = { id, itemName, quantity }
      orderSubmissionData.push(tableObj);
    })


    $.ajax({
      method: "POST",
      url: "/order_submit",
      data: { orderSubmissionData: JSON.stringify(orderSubmissionData) }
    })
  })

  // change order status
  $('.wrapper').click(() => {
    // add SQL function to update order status - active to processed? to confirmed?
    $('.wrapper').replaceWith("<p>Order Confirmed! You're ETA is 40 minutes! Redirecting to home...</p>")
    setTimeout(function() {
      window.location.replace("/");
    }, 3000);
  });

});



