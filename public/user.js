
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
    //  var userId = user.uid;
      var cashierNumber;

      if(user != null){


        var userId = firebase.auth().currentUser.uid;
        return firebase.database().ref('/user/' + userId+'/cashier_number').once('value').then(function(snapshot) {

        localStorage.cashiernumber = snapshot.val();
        window.location.href = "index.html";
        });

        var email_id = user.email;
        // if (window.location.href != "http://localhost:5000/index.html" || window.location.href != "http://localhost:5000/index.html" ) {
        //     window.location.href = "index.html";
        // }


    } else {
      // No user is signed in.
      if (window.location.href != "http://localhost:5000/login.html") {
        window.location.href = "login.html";
      }
    }
  }
  });

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);


    // ...
  });


}

function logout(){
  firebase.auth().signOut();
}
