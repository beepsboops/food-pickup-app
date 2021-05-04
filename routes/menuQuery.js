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
       .then((result) => {return result.rows})
       .catch((err) => {console.log(err.message)});
   };

 exports.getMenuItems = getMenuItems;



 const getItemById = (id) => {
  const menuQuery = `SELECT * FROM items WHERE id = ${id}`;

  return pool.query(menuQuery)
       .then((result) => {return result.rows})
       .catch((err) => {console.log(err.message)});
   };

   exports.getItemById = getItemById;



const orderItem = (id) => {
  const itemQuery = `INSERT INTO order_submissions(item_id, quantity) VALUES ($1, $2)`, [item_id, quantity]

  return pool.query(itemQuery)
    .then((result) => {return result.rows})
    .catch((err) => {console.log(err.message)});
};

exports.orderItem = orderItem;




