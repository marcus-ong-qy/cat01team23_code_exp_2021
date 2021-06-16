import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKldEYTeLAuS5Jq_23UkWI9npHAKf5yxc",
  authDomain: "codeexptest.firebaseapp.com",
  projectId: "codeexptest",
  storageBucket: "codeexptest.appspot.com",
  messagingSenderId: "380245765547",
  appId: "1:380245765547:web:3eea28e5f2f5a5214df6ee",
  measurementId: "G-JXYF732NVQ"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
