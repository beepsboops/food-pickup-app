/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const {
  getOrderData,
  updateOrderSubmission,
  updateOrderStatus,
}  = require('./orderQuery')

module.exports = (db) => {
  // temp order ID get
  router.get("/", (req, res) => {
    getOrderData(db, req.cookies.displayName)
      .then((results) => {
        console.log(results);
        const templateVars = {
          results,
          displayName: req.cookies.displayName,
        };
        res.render("order_submit", templateVars);
      })
      .catch((e) => {
        console.error(e);
      });
  });

  router.post("/", (req, res) => {
    let data = req.body.orderSubmissionData;
    updateOrderSubmission(db, data).then(() =>
      updateOrderStatus(data).then(res.send("Order Status Updated"))
    );
  });

  router.get("/status", (req, res) => {
    const templateVars = {
      displayName: req.cookies.displayName,
    };
    res.render("order_status", templateVars);
  });


  return router;
}
