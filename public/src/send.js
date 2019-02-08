var oldSendTIme = null;

window.onload = () => {
  console.log(uid, isAnonymous);
};

document.getElementById("send").onclick = () => {
  if (!isAnonymous) {
    return 0;
  }
  success.show = false;
  const viewTime = getTime();
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;
  const url = parseUrl(document.getElementById("url").value);
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
      viewTime: viewTime,
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
  if (/pc-lens/.test(url)) {
    errorMessage("コメント投稿サイトに直接コメントできません。");
    return false;
  }
  if (comment.length >= 140) {
    errorMessage("コメントが長すぎます。（制限：140字以下）");
    return false;
  }
  if (name.length >= 20) {
    errorMessage(
      "名前が長すぎます。本名が長い方はニックネームを利用してください。"
    );
    return false;
  }
  if (/殺|ころす|死|4ね|しね|fuck|キャトルミューティレーション/.test(comment)) {
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

parseUrl = address => {
  let parse = address
    .replace(/\s+/g, "")
    .replace("http://", "")
    .replace("https://", "")
    .replace(/\/$/, "");
  let deleteString;
  let resultUrl;
  if (parse.indexOf("?") >= 0) {
    deleteString = parse.substring(parse.indexOf("?"), parse.length);
    resultUrl = parse.replace(deleteString, "");
  } else {
    resultUrl = parse;
  }
  return resultUrl;
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

getTime = () => {
  const data = new Date();
  //時・分・秒を取得する
  const hour = data.getHours();
  const minute = data.getMinutes();
  const second = data.getSeconds();

  //年・月・日・曜日を取得する
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();

  const fileStamp = `${year}年${month}月${day}日${hour}時${minute}分${second}秒`;
  return fileStamp;
};
