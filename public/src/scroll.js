document.getElementById("get").onclick = () => {
  let nico = new nicoJS({
    app: document.getElementById("app"),
    width: 600,
    height: 400,
    font_size: 50, // opt
    color: "#fff" // opt
  });
  nico.listen();
  const url = document.getElementById("url").value;
  db.collection("pclens")
    .where("url", "==", url)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data().comment}`);
        nico.send(doc.data().comment);
      });
    });

  /*db.collection("pclens")
    .where("url", "==", url)
    .onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data().comment}`);
        if (doc.type === "added") {
          console.log(doc.type);
        }
      });
    });*/
  db.collection("pclens")
    .where("url", "==", url)
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          console.log("New city: ", change.doc.data());
          nico.send(change.doc.data().comment);
        }
        if (change.type === "modified") {
          console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed city: ", change.doc.data());
        }
      });
    });
};
