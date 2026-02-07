import jwt from "jsonwebtoken";

const currentStudentId = (req) => {
  const decoded = verifyAndDecodeJWT(req);
  return decoded.id; 
};

const verifyAndDecodeJWT = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new Error("Unauthorized: Token not provided");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

export { currentStudentId };
