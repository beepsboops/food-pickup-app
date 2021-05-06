const { Pool } = require("pg");
const { options } = require("pg/lib/defaults");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "midterm", // i made a database called midterm and populated it with our seeds and schema, but i think that's local, so we might have to all create one ourselves to start??
});

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console

const {
  ModelBuildPage,
} = require("twilio/lib/rest/autopilot/v1/assistant/modelBuild");

// and set the environment variables. See http://twil.io/secure
// require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSms = function (messageBody) {
  console.log("sendSms: messageBody:", messageBody);
  // console.log({ client });
  client.messages
    .create({
      body: messageBody,
      from: "+16044094601",
      to: "+16047150800",
    })
    .then((message) => console.log(message.sid));
};

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

const smsOrderReply = function (req, res) {
  const twiml = new MessagingResponse();
  const smsOrderReplyArr = req.body.Body.split("-");
  const orderId = smsOrderReplyArr[0];
  const pickupMins = smsOrderReplyArr[1];

  console.log("smsOrderReply: smsOrderReplyArr:", smsOrderReplyArr);
  console.log("smsOrderReply: orderId:", orderId);
  console.log("smsOrderReply: pickUpTime:", pickupMins);

  // const queryString = `SELECT name FROM orders JOIN users ON users.id = orders.user_id WHERE orders.id = $1`;
  // Query db to update orders table -> time_fulfilled for specific order, and return customer name
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

const updateTimeFulfilled = function (mins) {
  // const timeOrderPlaced = `SELECT time_placed FROM orders WHERE id = 1`;
  // console.log("updateTimeFulfilled: timeOrderPlaced:", timeOrderPlaced);

  const queryString = `UPDATE orders
  SET time_fulfilled = time_placed + $1
  WHERE id = 1;`;

  const values = [mins * 60];

  return pool
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { sendSms, smsOrderInfo, smsOrderReply };
