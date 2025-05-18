import { db } from "../utils/firebase.js";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const getItems = async (req, res) => {
  const querySnapshot = await getDocs(collection(db, "items"));
  const items = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.json(items);
};

export const getItem = async (req, res) => {
  const q = query(
    collection(db, "items"),
    where(documentId(), "==", req.params.id)
  );
  const querySnapshot = await getDocs(q);
  const items = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.json(items);
};

export const postItem = async (req, res) => {
  const docRef = await addDoc(collection(db, "items"), req.body);
  const snap = await getDoc(docRef);
  res.json(snap.data());
};

export const putItem = async (req, res) => {
  const itemRef = doc(db, "items", req.params.id);
  await updateDoc(itemRef, req.body);
  const snap = await getDoc(itemRef);
  res.json(snap.data());
};

export const deleteItem = async (req, res) => {
  await deleteDoc(doc(db, "items", req.params.id));
  res.status(200).json({ msg: "item eliminado" });
};
