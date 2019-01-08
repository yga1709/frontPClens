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
