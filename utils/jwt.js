import jwt from "jsonwebtoken";
import { Router } from "express";

export const validateJWT = Router();

validateJWT.use((req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ msg: "A json web token is needed" });
    return;
  }

  if (token.startsWith("Bearer")) {
    token = token.split(" ").at(1);
  }

  jwt.verify(token, process.env.JWT, (e, decoded) => {
    if (e) {
      res.status(401).json({ msg: "Bad token: " + e.message });
    } else {
      req.decoded = decoded;
      next();
    }
  });
});
