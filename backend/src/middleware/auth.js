const jwt = require("jsonwebtoken");

module.exports = function (roles = []) {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ msg: "Invalid token" });
      if (roles.length && !roles.includes(decoded.role))
        return res.status(403).json({ msg: "Unauthorized" });
      req.user = decoded;
      next();
    });
  };
};
