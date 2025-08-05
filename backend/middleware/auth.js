// middleware/auth.js
const authMiddleware = (req, res, next) => {
  // placeholder: you can verify JWT or session here
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized access" });
  }

  // TODO: Validate token
  next();
};

module.exports = authMiddleware;
