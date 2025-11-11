console.log("JWT_SECRET:", process.env.JWT_SECRET);

import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  console.log("Authorization header:", req.headers.authorization);

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log("Authorization header received:", req.headers.authorization);
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; 
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

export { protect, adminOnly }; 
