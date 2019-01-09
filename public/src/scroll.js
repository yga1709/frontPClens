nicoComment = (comment, color, size, position) => {
  const nico = new nicoJS({
    app: document.getElementById("app"),
    width: 600,
    height: 400,
    font_size: 50, // opt
    color: "#fff" // opt
  });
  nico.listen();
  nico.send(comment,color,size,position);
}

document.getElementById("get").onclick = () => {

  const url = document.getElementById("url").value;

  db.collection("pclens")
    .where("url", "==", url)
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          console.log(change.doc.data());
          nicoComment(change.doc.data().comment,change.doc.data().color,change.doc.data().size,change.doc.data().position);
        }
      });
    });
};
