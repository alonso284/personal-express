import { db } from "../utils/firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  let isLogin = false;

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", req.body.username));
  const querySnapshot = await getDocs(q);
  const user = querySnapshot.docs[0];

  if (!user) {
    res.status(400).json({ isLogin: isLogin, user: {} });
    return;
  }

  const userData = user.data();
  const dbPassword = userData.password;

  const salt = dbPassword.slice(0, 10);
  const pepper = process.env.PEPPER;
  const hashing = crypto.createHash("sha512");

  const hash =
    salt +
    hashing.update(salt + req.body.password + pepper).digest("base64url");

  isLogin = dbPassword === hash;
  console.log(dbPassword, hash);

  if (isLogin) {
    const token = jwt.sign({ sub: user.id }, process.env.JWT, {
      expiresIn: "1h",
    });
    res.status(200).json({ isLogin: isLogin, user: userData, token: token });
  } else {
    res.status(400).json({ isLogin: isLogin, user: {} });
  }
};

export const register = async (req, res) => {
  const salt = crypto.randomBytes(24).toString().slice(0, 10);
  const pepper = process.env.PEPPER;

  const hashing = crypto.createHash("sha512");
  const hash =
    salt +
    hashing.update(salt + req.body.password + pepper).digest("base64url");

  const usersRef = collection(db, "users");
  const newUser = {
    name: req.body.name,
    username: req.body.username,
    password: hash,
  };

  await addDoc(usersRef, newUser);

  res.status(200).json({ done: true });
};
