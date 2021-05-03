// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
require("dotenv").config({ debug: process.env.DEBUG });
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(accountSid);
console.log(authToken);
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "Hi from Lighthouse Full Stack Burgers 🤤 Your order was received!",
    from: "+16044094601",
    to: "+16047150800",
  })
  .then((message) => console.log(message.sid));
