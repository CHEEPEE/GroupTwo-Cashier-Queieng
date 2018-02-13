
  var config = {
    apiKey: "AIzaSyAQX3GCptmzzfukbDcXXCw81lXjvtEHVp4",
    authDomain: "cashier-queing-system.firebaseapp.com",
    databaseURL: "https://cashier-queing-system.firebaseio.com",
    projectId: "cashier-queing-system",
    storageBucket: "cashier-queing-system.appspot.com",
    messagingSenderId: "654094023765"
  };
  firebase.initializeApp(config);
var showCashierNumber1 = document.getElementById('cashier-number1');
var showCashierNumber2 = document.getElementById('cashier-number2');
var showCashierNumber3 = document.getElementById('cashier-number3');
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
getCashierNumber1();
getCashierNumber2();
getCashierNumber3();

function addCashsierNumber(){
  return firebase.database().ref('cashiernumber/cashierNnumber').once('value').then(function(data) {
      var getData= data.val()+1;
      writeCashierNumber(getData);

  });
}
function addCashsierNumber1(){
  return firebase.database().ref('cashiernumber/cashierNnumber').once('value').then(function(data) {
      var getData= data.val()+1;
      writeCashierNumber(getData,1);

  });
}
function addCashsierNumber2(){
  return firebase.database().ref('cashiernumber/cashierNnumber').once('value').then(function(data) {
      var getData= data.val()+1;
      writeCashierNumber(getData,2);

  });
}
function addCashsierNumber3(){
  return firebase.database().ref('cashiernumber/cashierNnumber').once('value').then(function(data) {
      var getData= data.val()+1;
      writeCashierNumber(getData,3);

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
      addCashsierNumber1();
  }
  else if (event.which==50) {
      addCashsierNumber2();
  }
  else if (event.which==51) {
      addCashsierNumber3();
  }
  else if (event.which==48) {
    resetCashiernumber();
  }


});
