const express = require("express");
const router = express.Router();

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const {
  smsOrderInfo,
  smsOrderReceived,
  smsOrderPickup,
} = require("../lib/sms_queries");

const {
  getMenuItems,
  getItemById,
  addOrderItem,
  getCurrentOrder,
} = require("../lib/menu_queries");
// const bodyParser = require("body-parser");
// router.use(bodyParser.urlencoded({ extended: true }));
const {
  getUserWithEmail,
  getOrderData,
  updateOrderSubmission,
  updateOrderStatus,
} = require("../lib/order_queries");

module.exports = () => {
  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    getUserWithEmail(email)
      .then((results) => {
        if (results.password === password) {
          const templateVars = {
            displayName: results.name,
            phone: results.phone,
          };
          res.cookie("displayName", templateVars.displayName);
          res.cookie("userID", results.id);
          return res.render("home", templateVars);
        } else {
          return res.redirect("/login");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  });

  router.get("/menu", (req, res) => {
    getMenuItems()
      .then((results) => {
        const templateVars = {
          results,
          displayName: req.cookies.displayName,
        };
        res.render("menu", templateVars);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  router.get("/menu/:item_id", (req, res) => {
    let id = req.params.item_id;
    getItemById(id)
      .then((results) => {
        const templateVars = {
          results,
          displayName: req.cookies.displayName,
        };
        res.render("menu_item", templateVars);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  router.post("/menu/:item_id", (req, res) => {
    let itemId = req.params.item_id;
    let quantity = req.body.quantity;
    getCurrentOrder(req.cookies.userID)
      .then((order_id) => {
        return addOrderItem(order_id, itemId, quantity);
      })
      .then(() => res.redirect("/menu"))
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  router.get("/order_submit", (req, res) => {
    getOrderData(req.cookies.displayName)
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

  router.post("/order_submit", (req, res) => {
    console.log("*** At router.post /order_submit ***");
    let data = req.body.orderSubmissionData;
    let smsData = smsOrderInfo(data);
    console.log("router.post: order_submit: req.body:", req.body);
    console.log("router.post: order_submit: data:", data);
    console.log("router.post: order_submit: smsData:", smsData);
    updateOrderSubmission(data).then(() =>
      updateOrderStatus(data)
        .then(res.send("Order Status Updated"))
        .then(smsOrderReceived(smsData))
    );
  });

  router.get("/order_status", (req, res) => {
    const templateVars = {
      displayName: req.cookies.displayName,
    };
    res.render("order_status", templateVars);
  });

  router.post("/sms", (req, res) => {
    console.log("*** At router.post /sms ***");
    // const templateVars = { pickupTime: pickupMins}
    smsOrderPickup(req, res);
    // res.render("home");
  });

  router.post("/logout", (req, res) => {
    console.log("working");
    res.clearCookie("displayName");
    res.clearCookie("userID");
    return res.redirect("/");
  });

  return router;
};
