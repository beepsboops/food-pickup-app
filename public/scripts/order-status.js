$(document).ready(function() {

  // change order status
  $('.order-status').click(() => {
    // add SQL function to update order status - active to processed? to confirmed?
    $('.order-status').replaceWith(`<div class='order-status'>
    Order Confirmed! You're ETA is 40 minutes! Redirecting to home...</div>`)
    setTimeout(function() {
      window.location.replace("/");
    }, 3000);
  });

});



