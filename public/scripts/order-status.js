$(document).ready(function () {
  var interval = setInterval(() => {
    $.ajax({
      method: "GET",
      url: "/check5seconds",
    }).done((response) => {
      if (response !== -1) {
        $(".order-status").replaceWith(
          `<div class="order-status"><h4>Order Confirmed! Your ETA is ${response.minutes} minutes. Redirecting to home...</h4></div>`
        );
        setTimeout(function () {
          window.location.replace("/");
        }, 3000);
        clearInterval(interval);
      }
    });
  }, 1000);
});
