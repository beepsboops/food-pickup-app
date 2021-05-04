$(document).ready(function() {

  $(".item-submission").submit((event) => {
    event.preventDefault();



    $.post("/order_sumbit", $(this))
    .then(orderItem(id))
    .catch(err => console.log(err));
  })
});


