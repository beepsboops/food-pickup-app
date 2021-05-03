Order Submission Page

adding to cart: 
if checkout is empty
click - insert new unique order with current timestamp, status (processing???)
more clicks, creates new order submissions with same order.id but different items.id and quantities

User Information:
- users.name
- users.phone

Order Summary
- orders.id
- current date (timestamp in the background too?)

Items
- item # incremented population
- items.name
- items.price
- orders.quantity - if quantity different, update quanity value
- subtotal = items.price * quantity

Total Price
- sum subtotal column values

Confirm Order
- post method here?
- update database
  - update neccessary tables
  - set orders.time_created timestamp 
- need to be able to see this on order history
