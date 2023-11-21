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
    .query("SELECT * FROM users;")
    .then((data) => res.json(data))
    .catch((e) => res.sendStatus(500));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM users WHERE id=$1;", [id])
    .then((data) => res.json(data))
    .catch((e) => res.sendStatus(404));
});

router.post("/", (req, res) => {
  const { first_name, last_name, age, active } = req.body;
  pool
    .query(
      "INSERT INTO users(first_name, last_name, age, active) VALUES ($1,$2,$3,$4) RETURNING *;",
      [first_name, last_name, age, active]
    )
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404));
});

router.put("/:id", (req, res) => {
  // how can I check if what data is being updated and only update certains fields based on that?
  const { id } = req.params;
  const { first_name } = req.body;
  pool
    .query("UPDATE users SET first_name=$1 WHERE id =$2", [first_name, id])
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("DELETE FROM users WHERE id=$1", [id])
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404));
});

module.exports = router;
