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

document.getElementById("get").onclick = () => {
  const url = document.getElementById("url").value;
  const listComment = document.getElementById("listComment");
  db.collection("pclens")
    .where("url", "==", url)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data().comment}`);
        listComment.insertAdjacentHTML("afterbegin", doc.data().comment);
      });
    });
};
