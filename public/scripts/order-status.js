$(document).ready(function () {
  // change order status
  $(".order-status").click(() => {
    // add SQL function to update order status - active to processed? to confirmed?
    $(".order-status").replaceWith(
      "<span>Order Confirmed! Your ETA is 40 minutes! Redirecting to home...</span>"
    );
    setTimeout(function () {
      window.location.replace("/");
    }, 3000);
  });
});
