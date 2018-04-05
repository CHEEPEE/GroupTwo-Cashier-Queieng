
  var config = {
    apiKey: "AIzaSyAQX3GCptmzzfukbDcXXCw81lXjvtEHVp4",
    authDomain: "cashier-queing-system.firebaseapp.com",
    databaseURL: "https://cashier-queing-system.firebaseio.com",
    projectId: "cashier-queing-system",
    storageBucket: "cashier-queing-system.appspot.com",
    messagingSenderId: "654094023765"
  };
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        window.alert(localStorage.cashiernumber);
        window.alert("Current Date: "+ getCurrentDate()+" ");
      var user = firebase.auth().currentUser;
    //  var userId = user.uid;
      var cashierNumber;

      if(user != null){
        var userId = firebase.auth().currentUser.uid;
        return firebase.database().ref('/user/' + userId+'/cashier_number').once('value').then(function(snapshot) {
        localStorage.cashiernumber = snapshot.val();

        });

        var email_id = user.email;

      }
    } else {
      // No user is signed in.
        window.location.href = "signin/";
        window.alert(localStorage.cashiernumber);

    }

  });
  function logout(){
    firebase.auth().signOut();
  }
var showCashierNumber1 = document.getElementById('cashier-number1');
var showCashierNumber2 = document.getElementById('cashier-number2');
var showCashierNumber3 = document.getElementById('cashier-number3');
var currentQueueNumber = document.getElementById('queue-number');
var currentStudentNumber = document.getElementById('student-number');
var currentStudentName = document.getElementById('student-name');
var currentTotalTransactionCost = document.getElementById('total-transaction-cost');

var database = firebase.database();

function writeCashierNumber(number,cashier) {
  firebase.database().ref('cashiernumber'+cashier).set({
    cashierNnumber: number
  });
  firebase.database().ref('cashiernumber').set({
    cashierNnumber: number
  });
}
var cashiernumber1 = firebase.database().ref('cashiernumber1/');
var cashiernumber2 = firebase.database().ref('cashiernumber2/');
var cashiernumber3 = firebase.database().ref('cashiernumber3/');
cashiernumber1.on('child_changed', function(data) {
  // setCommentValues(postElement, data.key, data.val().text, data.val().author);
  showCashierNumber1.innerHTML = data.val();
});
cashiernumber2.on('child_changed', function(data) {
  // setCommentValues(postElement, data.key, data.val().text, data.val().author);
  showCashierNumber2.innerHTML = data.val();
});
cashiernumber3.on('child_changed', function(data) {
  // setCommentValues(postElement, data.key, data.val().text, data.val().author);
  showCashierNumber3.innerHTML = data.val();
});
function getCashierNumber1(){
  return firebase.database().ref('cashiernumber1/cashierNnumber').once('value').then(function(data) {
      showCashierNumber1.innerHTML = data.val();
  });
}
function getCashierNumber2(){
  return firebase.database().ref('cashiernumber2/cashierNnumber').once('value').then(function(data) {
      showCashierNumber2.innerHTML = data.val();
  });
}
function getCashierNumber3(){
  return firebase.database().ref('cashiernumber3/cashierNnumber').once('value').then(function(data) {
      showCashierNumber3.innerHTML = data.val();
  });
}
function putValueTourentQueueNumber(){
  return firebase.database().ref('cashiernumber/cashierNnumber').once('value').then(function(data) {
    currentQueueNumber.innerHTML = data.val();
    setStudentNumber(data.val());
    setStudentTotalTransaction(data.val());
  });
}
getCashierNumber1();
getCashierNumber2();
getCashierNumber3();
putValueTourentQueueNumber();

function addCashsierNumber(){
  return firebase.database().ref('cashiernumber/cashierNnumber').once('value').then(function(data) {
      var getData= data.val()+1;
      writeCashierNumber(getData,localStorage.cashiernumber);
        putValueTourentQueueNumber();

  });
}
function addCashsierNumber1(){
  return firebase.database().ref('cashiernumber/cashierNnumber').once('value').then(function(data) {
      var getData= data.val()+1;
      writeCashierNumber(getData,localStorage.cashiernumber);

  });
}
function resetCashiernumber(){
  writeCashierNumber(0,1);
    writeCashierNumber(0,2);
      writeCashierNumber(0,3);
}



document.addEventListener("keydown", function(event) {
  if (event.which==13) {
    addCashsierNumber();

  }
  else if (event.which==49) {
      addCashsierNumber();
  }
});

function getCurrentDate(){
  var d = new Date();
 return ("0" + (d.getMonth() + 1)).slice(-2)+""+("0" + (d.getDate())).slice(-2)+""+d.getFullYear();
}
console.log(getCurrentDate());

function setStudentNumber(que){
  firebase.database().ref('transactions/'+getCurrentDate()+"/"+que+"/"+"studentNumber")
                  .on("value", function(snapshot) {
      console.log(snapshot.val());
      currentStudentNumber.innerHTML = snapshot.val();
      setStudentName(snapshot.val());

      // snapshot.forEach(function(data) {
      //     console.log(data.val());
      // });
  });

}
firebase.database().ref('transactions/'+getCurrentDate()+"/"+"5"+"/"+"studentNumber")
                .on("value", function(snapshot) {
    console.log(snapshot.val());
    currentStudentNumber.innerHTML = snapshot.val();

    // snapshot.forEach(function(data) {
    //     console.log(data.val());
    // });
});

function setStudentName(studentNumber){
  firebase.database().ref('students/'+studentNumber+"/"+"studentName")
                  .on("value", function(snapshot) {
      console.log(snapshot.val());
      currentStudentName.innerHTML = snapshot.val();

      // snapshot.forEach(function(data) {
      //     console.log(data.val());
      // });
  });
}
function setStudentTotalTransaction(que){
  firebase.database().ref('transactions/'+getCurrentDate()+"/"+que+"/"+"totalCost")
                  .on("value", function(snapshot) {
      console.log(snapshot.val());
      currentTotalTransactionCost.innerHTML = snapshot.val();

      // snapshot.forEach(function(data) {
      //     console.log(data.val());
      // });
  });

}
