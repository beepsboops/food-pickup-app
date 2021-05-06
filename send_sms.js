const { Pool } = require("pg");
const { options } = require("pg/lib/defaults");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const {
  ModelBuildPage,
} = require("twilio/lib/rest/autopilot/v1/assistant/modelBuild");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "midterm",
});

// Function that gets order data from View Cart -> Confirm Order and formats it for SMS
const smsOrderInfo = function (data) {
  let orderItems = [];
  let timestamp = data[0].time_confirmed;
  let orderId = data[0].order_id;
  for (let i = 1; i < data.length; i++) {
    let quantity = data[i].quantity;
    let item = data[i].itemName;
    orderItems.push(` ${quantity}x ${item}`);
  }
  return `Order #${orderId} received. For:${orderItems} on ${timestamp}`;
};

// Function that sends SMS to customer confirming order #, order items, and time received
const smsOrderReceived = function (messageBody) {
  console.log("smsOrderReceived: messageBody:", messageBody);
  // console.log({ client });
  client.messages
    .create({
      body: messageBody,
      from: "+16044094601",
      to: "+16047150800",
    })
    .then((message) => console.log(message.sid));
};

// Function that sends SMS from restaurant to customer confirming pickup time
const smsOrderPickup = function (req, res) {
  const twiml = new MessagingResponse();
  const smsOrderPickupArr = req.body.Body.split("-");
  const orderId = smsOrderPickupArr[0];
  const pickupMins = smsOrderPickupArr[1];

  console.log("smsOrderReply: smsOrderPickupArr:", smsOrderPickupArr);
  console.log("smsOrderReply: orderId:", orderId);
  console.log("smsOrderReply: pickUpMins:", pickupMins);

  // Query db to update "time_fulfilled" in "orders" table for specific order, and return customer name
  const queryString = `UPDATE orders
  SET time_fulfilled = time_placed + $1
  FROM users
  WHERE users.id = user_id
  AND orders.id = $2
  RETURNING name;`;
  const values = [pickupMins * 60, orderId];

  return pool
    .query(queryString, values)
    .then((result) => {
      // Store customer name in variable
      console.log("result.rows[0]:", result.rows[0]);
      const customer = result.rows[0].name;

      // Send SMS message to customer
      twiml.message(
        `Hello ${customer}. Order #${orderId} will be ready for pick up in ${pickupMins} mins`
      );
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { smsOrderInfo, smsOrderReceived, smsOrderPickup };
