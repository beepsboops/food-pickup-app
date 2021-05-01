/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/errors", (req, res) => {
    res.render('error')
  });

  router.get("/login", (req, res) => {
    res.render('login')
  });

  router.get("/menu", (req, res) => {
    res.render('menu')
  });

  router.get("/menu/:item_id", (req, res) => {
    res.render('menu')
  });

  router.get("/order_history", (req, res) => {
    res.render('order_history')
  });

  router.get("/order_history/:order_id", (req, res) => {
    res.render('order_history')
  });

  router.get("/order_sumbit", (req, res) => {
    res.render('order_sumbit')
  });

  router.get("/profile", (req, res) => {
    res.render('profile')
  });

  router.get("/register", (req, res) => {
    res.render('register')
  });


  return router;
};
