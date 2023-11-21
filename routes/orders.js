const express = require("express");
const router = express.Router();
PORT = process.env.PORT || 8000;
const pool = require("../db.js");

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
  if (price < 0 && isFinite(price)) res.sendStatus(403);
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
  const { price, date, user_id } = req.body;
  pool
    .query(
      "UPDATE orders SET price=coalesce($1, price),date=coalesce($2, date), user_id=coalesce($3, user_id) WHERE id=$4;",
      [price, date, user_id, id]
    )
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
