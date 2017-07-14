var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyCjabn3cej-4q2dv-ywaPtQ6TM3NvjC9Q0",
  authDomain: "rest-man-grayfox.firebaseapp.com",
  databaseURL: "https://rest-man-grayfox.firebaseio.com",
  storageBucket: "rest-man-grayfox.appspot.com",
}
firebase.initializeApp(config)

var tablesUpdate = firebase.database().ref('tables/')
tablesUpdate.once('value').then(function (snapshot) {
  var tables = snapshot.val()
  console.log(tables)
})