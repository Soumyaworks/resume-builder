import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyCFEpXimllhk9FUQ7Tf0OGCIPbZooc4BUQ",
  authDomain: "resume-builder-b56b4.firebaseapp.com",
  projectId: "resume-builder-b56b4",
  storageBucket: "resume-builder-b56b4.appspot.com",
  messagingSenderId: "422907022473",
  appId: "1:422907022473:web:5c6b1a783ec68a1f110a58",
  measurementId: "G-WDJPGCMH2W",
};

firebase.default.initializeApp(config);

export default firebase;
