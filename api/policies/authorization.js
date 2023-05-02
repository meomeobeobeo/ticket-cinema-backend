const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  try {
    if (!req.headers.authorization) {
        res.sendStatus(401).json("not authentication.");
        return false;
      }
    
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.sendStatus(401).json("not authentication.");
      return false;
    }
    
    let verifyToken = jwt.verify(token, "meomeomeo");

    if (!verifyToken) {
      res.sendStatus(403).json("token is expired,please re signup....");
      return false;
    }
    req.userType = "nomalUser";
    console.log("authentication success...........");
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
