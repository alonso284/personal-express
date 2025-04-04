import jwt from "jsonwebtoken";

import { Router } from "express";
export const validateJWT = Router();

validateJWT.use((req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "You need a token" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid token: " + err.message });
    }
    req.userId = decoded.id;
    next();
  });
});
