let nico = new nicoJS({
  app: document.getElementById("app"),
  width: 600,
  height: 400,
  font_size: 50, // opt
  color: "#fff" // opt
});
//nico.loop(["comment_1", "comment_2", "comment_3", "comment_4"]);
nico.listen();

db.collection("pclens")
  .where("url", "==", url)
  .onSnapshot(function(snapshot) {
    snapshot.docChanges.forEach(function(change) {
      if (change.type === "added") {
        nico.send(change.comment);
        console.log(change.comment);
      }
      if (change.type === "removed") {
        console.log(`User ${change.doc.id} has gone offline.`);
      }
    });
  });
