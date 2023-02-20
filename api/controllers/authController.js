const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const authEndPoint = (req, res) => {
  res.send("hello,this is auth endpoint");
};

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUSer = new User({
      username,
      email,
      password: hash,
    });
    newUSer.save();

    res.status(201).send("user has been registered");
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compare(user.password, req.body.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT
      );
      res.cookie("Token", token, { httpOnly: true }).status(201).json(user);
    } else {
      res.send("invalid name or password");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { login, register };
