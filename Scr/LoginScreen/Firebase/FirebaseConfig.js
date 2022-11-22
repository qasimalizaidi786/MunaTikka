// import firebase from 'firebase/compat/app'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD1h5lCXvcgH4e6_0FgjkzM5QFXpzGXmSA",
  authDomain: "food-app-c955f.firebaseapp.com",
  projectId: "food-app-c955f",
  storageBucket: "food-app-c955f.appspot.com",
  messagingSenderId: "202214131817",
  appId: "1:202214131817:web:4b5e8e1025d4abb2f2faf8"
};

// if(!firebase.app.length){
//   firebase.initializeApp(firebaseConfig)
// }
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase }