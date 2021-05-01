User Stories

A user story describes how users will intereact with your application/

- as a user i can view menu items
- as a user i can create an order

  - add any number of dishes

- as a user i will receive a SMS notification when... (for both customers and resturant)
  (use api here?)

  - order is confirmed
  - order is ready

- as a user i will get an estimated on how long my order will take

- front end and back end notification for order status:
- front: user notification?? (order fulfilled!)
- back: promise fullfillment?

- as a user i shouldn't be able to edit other people's orders
- as a user i shouldn't be able to order items not on the menu
- as a user i shouldn't be able to make an order outside of open hours
- as a user i shouldn't be able to click multiple times to make multiple identical orders
- as a user i shouldn't be able to make an order without an existing account
- as a user i can't make an order without providing a phone number (stretch: only accepts proper phone number format)

- (stretch) payment mechanism

What kind of food do we want?

- we don't want order custimization
- order from pre existing menu only

Database

- food menu
- orders
- customers

ROUTE

Browse
get /
Read
get /users - redirect to login?
get /users/:user_id - show user information
get /menu - menu overview
get /menu/:item_id - show indepth item description
get /orders - shows order history, only if logged in
get /orders/:order_id - shows orders details, only if logged in
get /login
Edit
post /orders/:order_id/edit - edits order items
post /orders/:order_id/delete-item - delete order line item???
post /logout
Add
post /submit-order - submit order, add into database
Delete
post /orders/:order_id/delete - delete order???
(delete only avaialble withint certain time???)
