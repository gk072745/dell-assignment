const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/user.model");
const { dataValidate } = require("../Middlewares/user.middleware");

const userRoute = express.Router();

// register user........
userRoute.post("/register", dataValidate, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const usernameExist = await UserModel.findOne({ username });
    const emailExist = await UserModel.findOne({ email });

    if (usernameExist) {
      res.status(400).send({ massage: "username already exist!" });
      return;
    } else if (emailExist) {
      res.status(400).send({ massage: "Email address already exist!" });
      return;
    } else {
      bcrypt.hash(password, 3, async (err, hash) => {
        if (err) {
          res
            .status(500)
            .send({ massage: "password hashing failed, try again!" });
        } else {
          try {
            const user = new UserModel({ username, email, password: hash });
            await user.save();
            res.status(201).send({ massage: "User successfully registered!" });
          } catch (error) {
            res.status(500).send({ massage: error });
          }
        }
      });
      return;
    }
  } catch (error) {
    res.status(500).send({ massage: error });
  }
});

// login user
userRoute.post("/login", dataValidate, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id }, "dell");
          res.send({ massage: "User successfully logged in!", token });
        } else {
          res.status(404).send({ massage: "Enter valid password!" });
        }
      });
    } else {
      res.send({ massage: "User doesn't exist!" }, 404);
    }
  } catch (error) {
    res.send({ error: "Something went wrong!" }, 500);
  }
});

module.exports = { userRoute };
