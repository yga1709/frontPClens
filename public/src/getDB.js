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
