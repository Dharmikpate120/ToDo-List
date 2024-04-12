const express = require("express");
//importing schema
const User = require("../models/user");
// importing express router
const router = express.Router();
//importing express validator to validate name, email and password
const { body, validationResult } = require("express-validator");
//bcryptjs to incript password
const bcrypt = require("bcryptjs");
//to create a unique webtoken with signature
const jwt = require("jsonwebtoken");

const fetchuser = require("../middleware/fetchuser");
//to use environment variable
const MY_SIGN = "my name is PateL@DhaRmIk@V";

//uses post method to send data to the server
router.post(
  "/signup",
  [
    //validating all user fields
    body("name", "enter a name bigger than 3 letters").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "enter password with length more than 5 letters").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    //catching the validation results and checking if there's an error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    //checking if the email already exist in the database
    let user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (user) {
      return res.json({
        error: "sorry a user with this email already exist",
        code: "1",
      });
    }
    // defining salt for the password
    const salt = await bcrypt.genSalt(10);
    //encrypting the password
    const secpass = await bcrypt.hash(req.body.password, salt);

    //inserting the user if the email doesn't exist in the database
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secpass,
    });
    // res.json(user);

    //creating token object with id of user
    const data = {
      id: user.id,
    };

    // signing the token with unique sign an encoding into special format
    const loginToken = jwt.sign(data, MY_SIGN);
    res.json({
      id: loginToken,
      code: "0",
    });
    // extracting the data from the token using .verify method which takes the generated token and the key
    // const verify = jwt.verify(loginToken, MY_SIGN);
    // console.log(verify);

    // .then((user) => res.send(user))
    // .catch((err) => {
    //   console.log(err);
    //   res.json({
    //     error: "please enter a unique value for email!",
    //     message: err.message,
    //   });
    // });

    // res.send(req.body);
  }
);
router.post(
  "/signin",
  [
    //validating all user fields
    body("email", "enter a valid email").isEmail(),
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    let { email, password, name } = req.body;
    try {
      const emailcheck = await User.findOne({ email });
      // console.log(emailcheck);
      if (!emailcheck) {
        return res
          .status(400)
          .json({ error: "invaild credentials", code: "1" });
      }
      let passwordcheck = await bcrypt.compare(password, emailcheck.password);
      let namecheck = emailcheck.name;
      if (!passwordcheck || namecheck !== name) {
        return res
          .status(400)
          .json({ error: "invalid credentials", code: "1" });
      }
      const data = {
        id: emailcheck.id,
      };

      // signing the token with unique sign an encoding into special format
      const loginToken = jwt.sign(data, MY_SIGN);
      // const verified = jwt.verify(loginToken, MY_SIGN);
      res.json({
        id: loginToken,
        code: "0",
      });
    } catch (error) {
      console.log(error);
      res.json({ error: error, code: "2" });
    }
  }
);

//getting user
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).select("-password");
    await res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
