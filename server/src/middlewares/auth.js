import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, studentID, role }
    if (decoded.role !== "student") {
      return res.status(403).json({ message: "Access denied: Student role required" });
    }
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};