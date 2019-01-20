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

  if (name === "" || comment === "" || url === "") {
    success.show = true;
    success.success = false;
  }

  if (userPosition === null) {
    switch (position) {
      case top:
        position = 0;
        break;
      case center:
        position = 100;
        break;
      case buttom:
        position = 500;
        break;
    }
  } else {
    position = Math.round(Number(userPosition) / 10) * 10;
  }

  db.collection("pclens")
    .add({
      name: name,
      comment: comment,
      url: url,
      color: color,
      size: size,
      scroll: position,
      userID: uid
    })
    .then(function(docRef) {
      console.log(name, comment, url, color, size, scroll, position, uid);
      success.show = true;
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
      success.show = true;
      success.success = false;
      success.message = error;
    });
};

const app = new Vue({
  el: "#checkURL"
});

const success = new Vue({
  el: "#result",
  data: {
    show: false,
    success: true
  }
});
