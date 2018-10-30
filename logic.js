
var config = {
    apiKey: "AIzaSyCbTLhmna9w4FPPOsJCkWLwxgowKbXRHoQ",
    authDomain: "train-scheduler-2f373.firebaseapp.com",
    databaseURL: "https://train-scheduler-2f373.firebaseio.com",
    projectId: "train-scheduler-2f373",
    storageBucket: "",
    messagingSenderId: "558903949737"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database

  var dataRef = firebase.database();

//Show and update current time. Use setInterval method to update time.

function displayRealTime() {
  setInterval(function(){
      $('#current-time').html(moment().format('hh:mm A'))
    }, 1000);
  }
  displayRealTime();
//   Initial Values

var trainName = "";
var destination = "";
var trainTime = 0;
var frequency = 0;




// Capture Button Click
$("#add-train").on("click", function(event){
// Code in the logic for storing and retrieving the most recent user.
 event.preventDefault();
 trainName = $("#trainName-input").val().trim();
 destination= $("#destination-input").val().trim();
 frequency= $("#frequency-input").val().trim();
 trainTime = $("#trainTime-input").val().trim();
   
 dataRef.ref().push({
    trainName: trainName,
    destination: destination,
    trainTime:trainTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

 });
// Firebase watcher + initial loader HINT: .on("value")
 
dataRef.ref().on("child_added", function(childSnapshot) {

// Log everything that's coming out of snapshot
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().trainTime);
$("#full-train-list").append("<tr class='full-train-list'><th class='trainName-list'> " +
childSnapshot.val().trainName + 
"</th><td class='distination-list'> " + childSnapshot.val().destination +
"</td><td class='frequency-list'> " + childSnapshot.val().frequency +
"</td><td class='trainTime-list'> " + childSnapshot.val().trainTime +
"</td></th>");

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

    // <tbody id="full-train-list">
  //   <tr>
  //   <th class="trainName-list" scope="row"></th>
  //   <td class="distination-list" ></td>
  //   <td class="trainTime-list"></td>
  //   <td class="frequency-list"></td>
  //   <td></td>
  //   <td></td>
  // </tr>
    
// Change the HTML to reflect
dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
$("#trainName-display").text(snapshot.val().trainName);
$("#distination-display").text(snapshot.val().destination);
$("#frequency-display").text(snapshot.val().frequency);
$("#trainTime-display").text(snapshot.val().trainTime);

});
      
    