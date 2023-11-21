const express = require("express");
const app = express();
PORT = process.env.PORT || 8000;
const { Pool } = require("pg");

const userRouter = require("./routes/users.js");
const orderRoouter = require("./routes/orders.js");
app.use(express.json());
app.use("/users", userRouter);
app.use("/orders", orderRoouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
