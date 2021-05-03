const { Pool } = require('pg');
const { options } = require('pg/lib/defaults');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'midterm' // i made a database called midterm and populated it with our seeds and schema, but i think that's local, so we might have to all create one ourselves to start??
});


 const getUserWithEmail = function(email) {
  const queryString = `SELECT users.* FROM users WHERE email=$1`
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
  SELECT items.name as item_name, items.price, items.stock, quantity, users.name as user_name, users.phone, orders.id as order_id, time_placed
  FROM items
  JOIN order_submissions ON item_id = items.id
  JOIN orders ON orders.id = order_id
  JOIN users ON users.id = user_id
  WHERE order_status=$1
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
