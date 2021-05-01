REQUIREMENTS

Option 10: Food Pick-up Ordering
A food ordering experience for a single restaurant. Hungry clients of this fictitious restaurant can visit its website, select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready.

The restaurant and client both need to be notified since this app serves as an intermediary.

When an order is placed the restaurant receives the order via SMS. The restaurant can then specify how long it will take to fulfill it. Once they provide this information, the website updates for the client and also notifies them via SMS.

You can use a modern telecomm API service such as Twilio to implement SMS communication from the website to the client and restaurant.

For inspiration check out how Ritual works, but keep in mind that's implemented as a native app and serves more than one restaurant.



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

TASKS

[ ] Create pages/templates
    [ ] Login side bar
        * One click login
    [ ] Home page
        * Copy this design: https://smallvictory.ca/
    [ ] Full menu
        * See wireframe
    [ ] Individual menu item
        * See wireframe
        * Item can be ordered here
        * Quantity can be specified here
    [ ] Checkout
        * Profile summary
        * Pickup estimate (30 mins)
        * Payment
        * Items (can change quanity here - stretch?)
        * Price
          * Subtotal
          * Delivery Fee
          * Taxes
          * Tip
          * Total
        * Place order button
    [ ] Login
        * Email field
        * Password field
    [ ] Order status
        * AJAX elements
        1. Order placed/received via checkout page(ie promise made)
        2. Order object created (behind the scenes) -> order status page updates ("order received") & SMS sent to both customer & restaurant (promise pending)
        3. Restaurant specifies amount of pickup time via SMS
        4. Order status page updates with pickup time (counts down) and simulataneously customer receives SMS with pickup time
        5. Order is ready -> Customer recieves SMS notification (promise fulfilled) 
    [ ] User profile (stretch?)
    [ ] Order history (stretch?)

