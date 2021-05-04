const { Pool } = require('pg');
const { options } = require('pg/lib/defaults');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});

const getMenuItems = () => {
  const menuQuery = `SELECT * FROM items`;

     return pool.query(menuQuery)
       .then((result) => {return result.rows});
   };

exports.getMenuItems = getMenuItems;



 const getItemById = (id) => {
  const menuQuery = `SELECT * FROM items WHERE id = $1`;

  return pool.query(menuQuery, [id])
       .then((result) => {return result.rows[0]});
   };

exports.getItemById = getItemById;


//Add new item to cart
const addOrderItem = (order_id, item_id, quantity) => {
  const itemQuery = `INSERT INTO order_submissions(order_id, item_id, quantity)
  VALUES ($1, $2, $3)`
  const values = [order_id, item_id, quantity];

  return pool.query(itemQuery, values)
    .then((result) => {return result.rows});
};

exports.addOrderItem = addOrderItem;



const getCurrentOrder = (user_id) => {
  const query = `SELECT id FROM orders WHERE user_id = $1 AND order_status = 'Started';`
  const insertQuery = `INSERT INTO orders (user_id, order_status) VALUES ($1, $2)
  RETURNING id`

  return pool.query(query, [user_id])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0].id
      } else {
        return pool.query(insertQuery, [user_id, 'Started'])
        .then((results) =>
          results.rows[0].id
        )
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getCurrentOrder = getCurrentOrder;




