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
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          console.log(change.doc.data());
          nico.send(
            change.doc.data().comment,
            change.doc.data().color,
            change.doc.data().position
          );
        }
      });
    });
};
