const { Pool } = require('pg');
const { options } = require('pg/lib/defaults');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'db'
});




  const getMenuItems = () => {
     const menuQuery = `SELECT * FROM items`;

     return pool.query(menuQuery)
       .then((result) => {return result.rows})
       .catch((err) => {console.log(err.message)});
   };


 exports.getMenuItems = getMenuItems;
