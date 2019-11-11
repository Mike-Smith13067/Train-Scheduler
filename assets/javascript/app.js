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
var destination = 0;
var trainFrequency = 0;

//Add new trains to schedule

$("#newTrainSubmit").on("click", function (event) {
    event.preventDefault();
    newTrainName = $("#newTrainName").val().trim();
    destination = $("#destination").val().trim();
    startDate = $("#startDate").val().trim();
    monthlyRate = $("#monthlyRate").val().trim();

    database.ref().push({
        newTrainName: newTrainName,
        destination: destinaion,
        startDate: startDate,
        monthlyRate: monthlyRate,
    })
})

database.ref().on("child_added", function (childSnapShot) {
    newTrainName = childSnapShot.val().newTrainName;
    destination = childSnapShot.val().destination;
    // startDate = childSnapShot.val().startDate;
    // monthlyRate = childSnapShot.val().monthlyRate;
    // monthsWorked = startDate.moment().format("MM/DD/YYYY");
    // convertedDate = moment(startDate, "MM/DD/YYYY");

    var newRow = $("<tr>");
    newRow.append($("<td>").text(newTrainName));
    newRow.append($("<td>").text(destination));
    // newRow.append($("<td>").text(startDate));
    // newRow.append($("<td>").text(monthsWorked));
    // newRow.append($("<td>").text(monthlyRate));
    // newRow.append($("<td>").text(totalBilledValue));
    // Moment js
    // var randomDate = "2/23/199";
    // var randomFormat = "MM/DD/YYYY";
    // var convertDate = moment(randomDate, randomFormat);
});