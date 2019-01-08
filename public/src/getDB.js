document.getElementById("get").onclick = () => {
  const nico = new nicoJS({
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
        listComment.insertAdjacentHTML("afterbegin", doc.data().comment);
      });
    });
};
