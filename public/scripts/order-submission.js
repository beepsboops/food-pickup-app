$(document).ready(function() {

  // change order status
  $('.wrapper').click(() => {
    // add SQL function to update order status - active to processed? to confirmed?
    $('.wrapper').replaceWith("<p>Order Confirmed! You're ETA is 40 minutes! Redirecting to home...</p>")
    setTimeout(function() {
      window.location.replace("/");
    }, 3000);
  });

});



