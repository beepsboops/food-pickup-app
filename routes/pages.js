const express = require('express');
const router  = express.Router();

const cookieParser = require('cookie-parser')
router.use(cookieParser());
// const bodyParser = require("body-parser");
// router.use(bodyParser.urlencoded({ extended: true }));
const { getUserWithEmail, getOrderData, updateOrderSubmission, updateOrderStatus } = require ('./database')

module.exports = () => {
  // general get methods/templates, please delete or rewrite if neccessary
  router.get("/errors", (req, res) => {
    res.render('error')
  });

  router.get("/login", (req, res) => {
    res.render('login')
  });


  //Login Post Method
  router.post("/login", (req, res) => {
    const {email, password} = req.body;
    getUserWithEmail(email)
    .then((results) => {
      if (results.password === password) {
        const templateVars = {
          displayName: results.name,
          phone: results.phone
        }
        res.cookie('displayName', templateVars.displayName)
        return res.render("home", templateVars);
      } else {
        return res.redirect("/login");
      }
    })
    .catch(e => {
      console.error(e);
    });
  });

  router.get("/menu", (req, res) => {
    const templateVars = {
      displayName: req.cookies.displayName
    }
    res.render('menu', templateVars)
  });

  router.get("/menu/:item_id", (req, res) => {
    res.render('menu')
  });

  router.get("/orders", (req, res) => {
    res.render('order_history')
  });

  router.get("/order_history/:order_id", (req, res) => {
    res.render('orders/:order_id')
  });

  // temp order ID get
  router.get("/order_submit", (req, res) => {
    getOrderData()
    .then((results) => {
      const templateVars = {
        results,
        displayName: req.cookies.displayName
      }
      res.render('order_submit', templateVars)
    })
    .catch(e => {
      console.error(e);
    });
  });

  router.post("/order_submit", (req, res) => {
    let data = req.body.orderSubmissionData
    updateOrderSubmission(data)
      .then(() => updateOrderStatus(data)
      .then(res.send("Order Status Updated")))

    // Promise.all([updateOrderSubmission(data), confirmOrder(data)])
    //   .then(res.send("Order Status Updated")))
  })

  router.get("/order_status", (req, res) => {
    console.log(typeof req.headers.cookie)
    res.render('order_status')
  });

  router.get("/profile", (req, res) => {
    res.render('profile')
  });

  router.get("/register", (req, res) => {
    res.render('register')
  });


  return router;
};
