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

const sendSms = function (code) {
  const body = `Your message content: ${code}`;
  console.log("sendSms: body:", body);
  client.messages
    .create({
      body: body,
      from: "+16044094601",
      to: "+16047150800",
    })
    .then((message) => console.log(message.sid));
};

module.exports = { sendSms };
