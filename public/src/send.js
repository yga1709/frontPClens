// Initialize Cloud Firestore through Firebase

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

document.getElementById("send").onclick = () => {
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;
  const url = document.getElementById("url").value;
  db.collection("pclens")
    .add({
      name: name,
      comment: comment,
      url: url
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};
