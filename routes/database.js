const { Pool } = require('pg');
const { options } = require('pg/lib/defaults');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'midterm' // i made a database called midterm and populated it with our seeds and schema, but i think that's local, so we might have to all create one ourselves to start??
});


 const getUserWithEmail = function(email) {
  const queryString = `SELECT users.* FROM users WHERE email=$1;`
  const values = [email];

  return pool
    .query(queryString, values)
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message)
      });
}

exports.getUserWithEmail = getUserWithEmail;

const getOrderData = function() {
  const queryString = `
  SELECT items.name as item_name, items.price, items.stock, quantity, users.name as user_name, users.phone, orders.id as order_id, time_placed, order_submissions.id as order_submission_id
  FROM items
  JOIN order_submissions ON item_id = items.id
  JOIN orders ON orders.id = order_id
  JOIN users ON users.id = user_id
  WHERE order_status=$1;
  `;
  const values = ['Started']

  return pool
  .query(queryString, values)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message)
    });
}

exports.getOrderData = getOrderData;

const updateOrderStatus = function(dataArray) {
  const queryString = `
  UPDATE orders
  SET time_confirmed = $2, order_status = $3
  WHERE order_id=$1;
  `;
  const values = [dataArray[0].order_id, dataArray[0].time_confirmed, 'Processing']

  return pool
  .query(queryString, values)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message)
    });
};

exports.updateOrderStatus = updateOrderStatus;

const updateOrderSubmission = function(dataArray) {
  for (let i=1; i<dataArray.lenght; i++) {
    const queryString = `
    UPDATE order_submissions
    SET quantity = $3
    WHERE order_id=$1 AND item_id = $2;
    `;
    const values = [dataArray[0].order_id, dataArray[i].id, dataArray[i].quantity]

    return pool
    .query(queryString, values)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message)
      });
  }

};

exports.updateOrderSubmission = updateOrderSubmission;

const confirmOrder = function(dataArray) {
  const queryString = `
  UPDATE orders
  SET time_fulfilled = $2, order_status = $3
  WHERE order_id=$1;
  `;
  const values = [dataArray[0].order_id, new Date(), 'Delivered']

  return pool
  .query(queryString, values)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message)
    });
};

exports.confirmOrder = confirmOrder;
