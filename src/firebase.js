import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAAotLWoFir0YPvRoR7jvsgEXPTaXHB3eg",
    authDomain: "react-blog-15045.firebaseapp.com",
    databaseURL: "https://react-blog-15045.firebaseio.com",
    projectId: "react-blog-15045",
    storageBucket: "react-blog-15045.appspot.com",
    messagingSenderId: "905233396937"
  };
  firebase.initializeApp(config);
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default firebase;


  