// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body:
      "This is the lighthouse ship that made the Kessel Run in fourteen parsecs?",
    from: "+16044094601",
    to: "+6047150800",
  })
  .then((message) => console.log(message.sid));
