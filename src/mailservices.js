import { db } from "./firebaseconfig";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const mailCollectionRef = collection(db, "mails");
class MailDataService {
  addMails = (newMail) => {
    return addDoc(mailCollectionRef, newMail);
  };

  updateMail = (id, updatedMail) => {
    const mailDoc = doc(db, "mails", id);
    return updateDoc(mailDoc, updatedMail);
  };

  deleteMail = (id) => {
    const mailDoc = doc(db, "mails", id);
    return deleteDoc(mailDoc);
  };

  getAllMails = () => {
    return getDocs(mailCollectionRef);
  };

  getMail = (id) => {
    const mailDoc = doc(db, "mails", id);
    return getDoc(mailDoc);
  };
}

export default new MailDataService();