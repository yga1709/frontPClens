document.getElementById("send").onclick = () => {
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;
  const url = document.getElementById("url").value;
  const getColor = document.getElementById("color");
  const getPosition = document.getElementById("position");
  const color = getColor.colorList.value;
  const position = getPosition.posiList.value;
  let scroll = window.pageYOffset;

  db.collection("pclens")
    .add({
      name: name,
      comment: comment,
      url: url,
      color: color,
      position: position,
      scroll: scroll
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};
