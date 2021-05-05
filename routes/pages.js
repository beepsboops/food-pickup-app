const express = require("express");
const router = express.Router();

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const { sendSms } = require("../send_sms");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const {
  getMenuItems,
  getItemById,
  addOrderItem,
  getCurrentOrder,
} = require("./menuQuery");
// const bodyParser = require("body-parser");
// router.use(bodyParser.urlencoded({ extended: true }));
const {
  getUserWithEmail,
  getOrderData,
  updateOrderSubmission,
  updateOrderStatus,
} = require("./database");

module.exports = () => {
  // general get methods/templates, please delete or rewrite if neccessary
  router.get("/errors", (req, res) => {
    res.render("error");
  });

  router.get("/login", (req, res) => {
    res.render("login");
  });

  //Login Post Method
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    getUserWithEmail(email)
      .then((results) => {
        if (results.password === password) {
          const templateVars = {
            displayName: results.name,
            phone: results.phone
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
        displayName: req.cookies.displayName
      }
      res.render('menu_item', templateVars)
    })
    .catch((err) => {
      console.log(err.message)
    });
  });

  //post menu item to order
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

  // temp order ID get
  router.get("/order_submit", (req, res) => {
    getOrderData(req.cookies.displayName)
      .then((results) => {
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
    let data = req.body.orderSubmissionData;
    updateOrderSubmission(data).then(() =>
      updateOrderStatus(data).then(res.send("Order Status Updated"))
    );
  });

  router.get("/order_status", (req, res) => {
    const templateVars = {
      displayName: req.cookies.displayName,
    };
    res.render("order_status", templateVars);
  });

  router.get("/profile", (req, res) => {
    const templateVars = {
      displayName: req.cookies.displayName,
    };
    res.render("profile", templateVars);
  });

  router.get("/register", (req, res) => {
    const templateVars = {
      displayName: req.cookies.displayName,
    };
    res.render("register", templateVars);
  });

  // router.post("/orders", (req, res) => {
  //   sendSms(req.body.order);
  //   console.log(req.body);
  //   res.redirect("/orders");
  // });

  router.post("/sms", (req, res) => {
    const twiml = new MessagingResponse();

    twiml.message("The Robots are coming! Head for the hills!");

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  });


  // needs to be fixed kldfgjfldkgjdflkg
  router.post("/logout", (req, res) => {
    console.log('working');
    res.clearCookie('displayName');
    res.clearCookie('userID');
    return res.redirect("/");
  });

  return router;
};
