import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { token } = req.cookies; // ✅ Correct: destructure token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ token is string here
    if (decoded && decoded.id) {
      req.user = decoded.id; // ✅ safer, attach userId into req.user
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token verification failed",
    });
  }
};
export default authUser;