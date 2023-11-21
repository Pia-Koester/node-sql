const express = require("express");
const app = express();
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

app.get("/users", (req, res) => {
  pool
    .query("SELECT * FROM users;")
    .then((data) => res.json(data))
    .catch((e) => res.sendStatus(500));
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM users WHERE id=$1;", [id])
    .then((data) => res.json(data))
    .catch((e) => res.sendStatus(404));
});

// const userRouter = require("./routes/users.js");

// app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
