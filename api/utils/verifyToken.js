const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //   console.log(req.cookies.Token);
  //   const token = req.cookies.Token;
  let token;
  let header = req.headers.Authorization || req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    token = header.split(" ")[1];
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) {
        return res.status(401).send("invalid token");
      }
      req.user = user;
    });
    next();
  }
  //   if (!token) {
  //     return res.status(401).send("you are not authenticated");
  //   }
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(401).send("you are not authorized");
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).send("you are not authorized");
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
