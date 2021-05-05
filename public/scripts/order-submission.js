$(document).ready(function() {
  //helper functions for button presses
  const updatePrice = (obj, quantity) => {
    let unitPrice = Number($(obj).closest('.order-data-row').find('.item-price').text().substring(1));

    let newPrice = unitPrice * quantity

    $(obj).closest('.order-data-row').find('.item-subtotal').replaceWith(`<td class="item-subtotal">$${newPrice.toFixed(2)}</td>`)
    return;
  }

  const totalPrice = (obj, increaseDecrease) => {
    let unitPrice = Number($(obj).closest('.order-data-row').find('.item-price').text().substring(1));

    let totalPrice = Number($(obj).closest('.order-submission-data').find('.total-price-value').text().substring(1))

    if (increaseDecrease === 'increase') {
      $(obj).closest('.order-submission-data').find('.total-price-value').replaceWith(`<h5 class='total-price-value'>$${(totalPrice + unitPrice).toFixed(2)}</h5>`)
    } else if (increaseDecrease === 'decrease') {
      $(obj).closest('.order-submission-data').find('.total-price-value').replaceWith(`<h5 class='total-price-value'>$${(totalPrice - unitPrice).toFixed(2)}</h5>`)
    }
  }

  // change item quantities
  $('.button-down').click(function() {
    let quantity = Number($(this).siblings('.quantity-value').val());
    if (quantity > 0) {
      quantity -=1;
      $(this).siblings('.quantity-value').val(quantity)

      updatePrice(this, quantity);
      totalPrice(this, 'decrease');
    }
  })

  $('.button-up').click(function() {
    let quantity = Number($(this).siblings('.quantity-value').val());
    if (quantity >= 10) {
      alert("You need to chill...");
      quantity = 10;
    } else if (quantity < 10) {
      quantity +=1;
      $(this).siblings('.quantity-value').val(quantity)

      updatePrice(this, quantity);
      totalPrice(this, 'increase');
    }
  })

  $('.quantity-value').on('input', function() {
    let quantity = Number($(this).val());
    if (quantity >= 10) {
      alert("You need to chill...");
      quantity = 10;
    }

    $(this).val(quantity)
  });

  // read and submit form data
  $('.order-submission-data').submit((event) => {
    event.preventDefault();

    const allRows = $('.order-data-row')
    const orderSubmissionData = [{

      order_id: Number($(`.order-id`).html().split("#").pop())
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
      data: { orderSubmissionData: orderSubmissionData }
    }).done((response) => {
      console.log('working...', response);
      window.location.replace("/order_status");
    })
  })

});



