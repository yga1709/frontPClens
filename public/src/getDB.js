var showComment = new Vue({
  el: "#showComment",
  data: {
    list: []
  },
  created: function() {
    var vue = this;
    db.collection("pclens").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          vue.list.unshift(change.doc.data());
        }
      });
    });
  }
});

db.collection("pclens").onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === "added") {
    }
  });
});
