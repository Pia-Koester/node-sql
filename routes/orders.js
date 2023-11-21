const express = require("express");
const router = express.Router();
PORT = process.env.PORT || 8000;
const { Pool } = require("pg");

//getting all the environment variables
require("dotenv").config();
const user = process.env.ELEPHANTuser;
const host = process.env.ELEPHANThost;
const database = process.env.ELEPHANTdatabase;
const PW = process.env.ELEPHANTPW;

const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: PW,
  port: 5432,
});

router.get("/", (req, res) => {
  pool
    .query("SELECT * FROM orders;")
    .then((data) => res.json(data))
    .catch((e) => res.sendStatus(500));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM orders WHERE id=$1;", [id])
    .then((data) => res.json(data))
    .catch((e) => res.sendStatus(404));
});

router.post("/", (req, res) => {
  const { price, date, user_id } = req.body;
  pool
    .query(
      "INSERT INTO orders(price, date, user_id) VALUES ($1,$2,$3) RETURNING *;",
      [price, date, user_id]
    )
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404));
});

router.put("/:id", (req, res) => {
  // how can I check if what data is being updated and only update certains fields based on that?
  const { id } = req.params;
  const { price } = req.body;
  pool
    .query("UPDATE orders SET price=$1 WHERE id =$2", [price, id])
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("DELETE FROM orders WHERE id=$1", [id])
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404));
});

module.exports = router;
