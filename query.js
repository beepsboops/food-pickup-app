const { Pool } = require("pg");
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "midterm",
});

const getPickupTime = function () {
  // Get userID from cookie
  // console.log("getPickupTime: req.cookies", req.cookies);
  // Temporary hard coded value
  const cookieUserId = 1;

  // Query db for pickup time value to display on webpage
  const queryString = `SELECT time_fulfilled - time_confirmed as pickup_time
  FROM orders
  WHERE user_id = $1
  AND order_status = 'Processing';`;
  const values = [cookieUserId];

  return pool.query(queryString, values).then((result) => {
    console.log("getPickupTime:", result.rows[0].pickup_time.minutes);
    const pickupTime = result.rows[0].pickup_time;
    return pickupTime;
  });
};

console.log(getPickupTime());
