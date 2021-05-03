// don't link this, i'm just playing around with code here

const updatePrice = (obj, quantity) => {
  let unitPrice = Number($(obj).closest('.order-data-row').find('.item-price').text().substring(1));

  let newPrice = unitPrice * quantity

  $(obj).closest('.order-data-row').find('.item-subtotal').replaceWith(`<td class="item-subtotal">$${newPrice.toFixed(2)}</td>`)
  return;
}

const totalPrice = (obj) => {
  let unitPrice = Number($(obj).closest('.order-data-row').find('.item-price').text().substring(1));

  let totalPrice = Number($(obj).closest('.order-submission-data').find('.total-price-value').text().substring(1))
  console.log(totalPrice)

  $(obj).closest('.order-submission-data').find('.total-price-value').replaceWith(`<h5 class='total-price-value'>$${(totalPrice - unitPrice).toFixed(2)}</h5>`)
}
