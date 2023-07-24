const express = require("express");
const { connection } = require("./Configs/db");
const cors = require("cors");
const { userRoute } = require("./Routes/user.route");
const { partRouter } = require("./Routes/part.route");
const { searchRoute } = require("./Routes/search.route");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/parts", partRouter);
app.use("/search", searchRoute);

app.get("/", async (req, res) => {
  res.send("Welcome to Dell");
});

app.listen(process.env.PORT, async (req, res) => {
  try {
    await connection;
    console.log("dell server connected");
  } catch (error) {
    console.log(error);
  }
});
