window.onload = () => {
  console.log(uid, isAnonymous);
};
document.getElementById("send").onclick = () => {
  if (!isAnonymous) {
    return 0;
  }
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;
  const url = document.getElementById("url").value;
  const getColor = document.getElementById("color");
  const getSize = document.getElementById("size");
  const getPosition = document.getElementById("position");
  const userPosition = document.getElementById("posiNum").value;
  const color = getColor.colorList.value;
  const size = getSize.sizeList.value;
  let position = getPosition.posiList.value;
  let scroll = window.pageYOffset;

  db.collection("pclens")
    .add({
      name: name,
      comment: comment,
      url: url,
      color: color,
      size: size,
      scroll: scroll,
      position: position,
      uid: uid
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};
