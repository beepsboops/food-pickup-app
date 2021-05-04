const express = require('express');
const router  = express.Router();

const cookieParser = require('cookie-parser')
router.use(cookieParser());

const { getUserWithEmail, getOrderData } = require ('./database');
const { getMenuItems, getItemById } = require('./menuQuery');

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
        res.cookie('cookieName', 'cheese')
        const templateVars = {
          displayName: results.name,
          phone: results.phone
        }
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
    getMenuItems()
    .then((results) => {
      const templateVars = {
        results
      }
      res.render('menu', templateVars)
    })
    .catch((err) => {
      console.log(err.message)
    });
  });

  router.get("/menu/:item_id", (req, res) => {
    let id = req.params.item_id;
    getItemById(id)
    .then((results) => {
      const templateVars = {
        results
      }
      res.render('menu_item', templateVars)
    })
    .catch((err) => {
      console.log(err.message)
    });
  });

  //post menu item to order
  router.post("/menu/:item_id", (req, res) => {
    console.log(orderItem(id))
    res.redirect('/order_submit')
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
        results
      }
      res.render('order_submit', templateVars)
    })
    .catch(e => {
      console.error(e);
    });
  });

  router.post("/order_submit", (req, res) => {
    // update database here??
    console.log('working', JSON.parse(req.body.finalArray));
    // write and implment helper function
    res.render('order_status');
  })

  router.get("/order_status", (req, res) => {
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
