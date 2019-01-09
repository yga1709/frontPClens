document.getElementById("send").onclick = () => {
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;
  const url = document.getElementById("url").value;
  const getColor = document.getElementById("color");
  const getSize = document.getElementById("size");
  const getPosition = document.getElementById("position");
  const color = getColor.colorList.value;
  const size = getSize.sizeList.value;
  const position = getPosition.posiList.value;
  let scroll = window.pageYOffset;

  db.collection("pclens")
    .add({
      name: name,
      comment: comment,
      url: url,
      color: color,
      size: size,
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
