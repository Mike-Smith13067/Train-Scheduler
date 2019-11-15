// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAC91NBsOo3TzsDDiPiIX_MohyaeFec41Y",
    authDomain: "train-scheduler-bda3d.firebaseapp.com",
    databaseURL: "https://train-scheduler-bda3d.firebaseio.com",
    projectId: "train-scheduler-bda3d",
    storageBucket: "train-scheduler-bda3d.appspot.com",
    messagingSenderId: "994567774480",
    appId: "1:994567774480:web:7f090c491b988154e58595"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var newTrainName = 0;

//Add new trains to schedule

//Collect user input

$("#newTrainSubmit").on("click", function (event) {
    event.preventDefault();
    newTrainName = $("#newTrainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    trainFreq = $("#trainFreq").val().trim();
    console.log(newTrainName);
    console.log(destination);
    console.log(trainFreq);
    var newTrain = {
        name: newTrainName,
        destination: destination,
        trainFreq: trainFreq,
        firstTrain: firstTrain,
    }
    console.log(newTrain);

    //Push user data to database

    database.ref().push({
        newTrainName: newTrainName,
        destination: destination,
        trainFreq: trainFreq,
        firstTrain: firstTrain,
    })

    database.ref().on("child_added", function (childSnapShot) {
        newTrainName = childSnapShot.val().newTrainName;
        destination = childSnapShot.val().destination;
        trainFreq = childSnapShot.val().trainFreq;
        firstTrain = childSnapShot.val().firstTrain;
        firstTime = moment(firstTrain, "HH:mm");
        var trainInterval = moment().diff(moment(firstTime), "minutes");
        var trainRemain = trainInterval % trainFreq;
        var arrivalMin = trainFreq - trainRemain;
        var nextTrain = moment().add(arrivalMin, "m").format("hh:mm A");
        console.log(trainInterval);
        console.log(trainRemain);
        console.log(arrivalMin);
        console.log(nextTrain);
// Display new train information
        var newRow = $("<tr>").append(
            $("<td>").text(newTrainName),
            $("<td>").text(destination),
            $("<td>").text(trainFreq),
            $("<td>").text(nextTrain),
            $("<td>").text(arrivalMin),

        )

        $("table > tbody").append(newRow)
    });

    //reset
// function reset() {(
//     $("#newTrainName").clear(),
//     $("#destination").clear(),
//     $("#firstTrain").clear(),
//     $("#trainFreq").clear(),
//     {);

});