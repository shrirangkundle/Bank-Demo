const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  loginVarify,
  transactionUpdate,
  transactionList,
} = require("../controllers/user");

router.route("/").post(createUser);
router.route("/userTransaction/:id").get(getUser);
router.route("/transactionUpdate/:id").post(transactionUpdate);
router.route("/transactionList/:id/:page").get(transactionList);
router.route("/login").post(loginVarify);

module.exports = router;
