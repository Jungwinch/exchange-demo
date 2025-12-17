import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET || "dev-secret";

export const issueToken = (user) =>
  jwt.sign({ uid: user.id, admin: user.admin }, SECRET, { expiresIn: "1h" });

export const verifyToken = (token) =>
  jwt.verify(token, SECRET);


