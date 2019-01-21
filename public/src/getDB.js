var showComment = new Vue({
  el: "#showComment",
  data: {
    list: []
  },
  created: function() {
    var vue = this;
    db.collection("pclens")
      .orderBy("timestamp")
      .limit(100)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            vue.list.unshift(change.doc.data());
          }
        });
      });
  }
});
