const jwt = require("jsonwebtoken");
const MY_SIGN = "my name is PateL@DhaRmIk@V";

// creating a middleware to decode id from token
const fetchuser = (req, res, next) => {
  const token = req.header("auth-Token");
  if (!token) {
    res
      .status(401)
      .send({ error: "please authenticate valid useing valid method1" });
  }
  try {
    const data = jwt.verify(token, MY_SIGN);
    req.user = data.id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: error });
  }
};

module.exports = fetchuser;
