const config = {
  apiKey: "AIzaSyCjQERD3wgFXwmqjmioJgknqqatHBOLHE0",
  authDomain: "pc-lens.firebaseapp.com",
  databaseURL: "https://pc-lens.firebaseio.com",
  projectId: "pc-lens",
  storageBucket: "pc-lens.appspot.com",
  messagingSenderId: "437105965614"
};
firebase.initializeApp(config);

var db = firebase.firestore();
var isAnonymous;
var uid;

firebase
  .auth()
  .signInAnonymously()
  .catch(error => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // ...
    console.log(errorCode, errorMessage);
  });

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    isAnonymous = user.isAnonymous;
    uid = user.uid;
    // ...
  }
});
