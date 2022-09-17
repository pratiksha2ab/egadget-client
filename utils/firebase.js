import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAZY8DYNsUF_aujc11ipATOlk6x37b1FCw",
  authDomain: "egadet-d6bb8.firebaseapp.com",
  projectId: "egadet-d6bb8",
  storageBucket: "egadet-d6bb8.appspot.com",
  messagingSenderId: "466908890540",
  appId: "1:466908890540:web:af1bd1ecafcb2498bde609",
  measurementId: "G-9KV4144SXM"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
export { auth, firebase };



