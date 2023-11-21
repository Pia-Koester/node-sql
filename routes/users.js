const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //GET  /  : To get all the users
});

router.get("/:id", (req, res) => {
  //GET  /:id :  To get one user (with the id)
});

//   POST / -> To create a new user
// PUT /:id  :  To edit one user (with the id)
// DELETE  /:id : To delete one user (with the id)

module.exports = router;
