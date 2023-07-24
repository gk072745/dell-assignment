const dataValidate = (req, res, next) => {
  const { username, password, email } = req.body;

  if (!email) {
    res.status(400).send({ massage: "Please enter valid email address!" });
    return;
  } else if (!password) {
    res.status(400).send({ massage: "Please enter valid password!" });
    return;
  }

  if (req.url === "/register" && !username) {
    res.status(400).send({ massage: "Please enter valid username!" });
    return;
  }

  next();
};

module.exports = { dataValidate };
