var oldSendTIme = null;

window.onload = () => {
  console.log(uid, isAnonymous);
};

document.getElementById("send").onclick = () => {
  if (!isAnonymous) {
    return 0;
  }
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;
  const url = document
    .getElementById("url")
    .value.replace(/\s+/g, "")
    .replace("http://", "")
    .replace("https://", "")
    .replace(/\/$/, "");
  const getColor = document.getElementById("color");
  const getSize = document.getElementById("size");
  const getPosition = document.getElementById("position");
  const userPosition = document.getElementById("posiNum").value;
  const color = getColor.colorList.value;
  const size = getSize.sizeList.value;
  let position = getPosition.posiList.value;

  if (!errorCheck(name, comment, url)) {
    return 0;
  }

  if (userPosition === "") {
    switch (position) {
      case "top":
        position = 0;
        break;
      case "center":
        position = 500;
        break;
      case "buttom":
        position = 1000;
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
      userID: uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function(docRef) {
      console.log(name, comment, url, color, size, scroll, position, uid);
      success.show = true;
      success.success = true;
      let sendDate = new Date();
      oldSendTIme = sendDate.getTime();
      document.getElementById("comment").value = "";
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
      success.show = true;
      success.success = false;
      success.message = error;
    });
};

errorCheck = (name, comment, url) => {
  if (oldSendTIme != null && !checkInterval()) {
    errorMessage("連続してコメントできません。10秒お待ちください。");
    return false;
  }
  if (name === "" || comment === "" || url === "") {
    errorMessage("必要事項が入力されていません。");
    return false;
  }
  if (url === "pc-lens.firebaseapp.com") {
    errorMessage("コメント投稿サイトに直接コメントできません。");
    return false;
  }
  if (/殺|ころす|死|4ね|しね|fuck/.test(comment)) {
    errorMessage("表示できない単語が含まれています。");
    return false;
  }
  return true;
};

errorMessage = message => {
  success.show = true;
  success.success = false;
  success.message = message;
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

checkInterval = () => {
  let now = new Date();
  let newSendTime = now.getTime();
  let diff = newSendTime - oldSendTIme;
  const diffSecond = Math.floor(diff / 1000);
  if (diffSecond >= 10) {
    return true;
  } else {
    return false;
  }
};
