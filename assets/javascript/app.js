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
    console.log(firstTrain);
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
        console.log("firstTime", firstTime._i);
        var currentTime = moment().format("HH:mm");
        console.log("current time", currentTime);
        // // manipulate firstTrain back 1 year to calculate future train times
        // var modifiedTrainTime = moment(firstTime, "HH:mm").subtract(1, "years");
        // console.log ("modifiedTime", modifiedTrainTime._i);
        // calculate time difference
        var timeDiffInit = moment(firstTime).diff(moment(), "minutes");
        console.log("timeDiff", timeDiffInit);
        console.log("trainFreq", trainFreq);
        var timeDiff = Math.abs(timeDiffInit);
        console.log(timeDiff);
        var waitTime = timeDiff % trainFreq;
        console.log("wait time", waitTime);

        // calculate "minutes away"
        var arrivalMin = trainFreq - waitTime;
        console.log("arrival", arrivalMin)
        //caculate trian arrival
        var nextTrainTimeArr = moment().add(arrivalMin, "minutes");

        function nextTrain() {
            if (nextTrainTimeArr < moment()) {
                nextTrainTime = firstTime;
                console.log("Next train time", nextTrainTimeArr);
                // Display new train information
                var newRow = $("<tr>").append(
                    $("<td>").text(newTrainName),
                    $("<td>").text(destination),
                    $("<td>").text(trainFreq),
                    $("<td>").text(nextTrainTime._d),
                    $("<td>").text(arrivalMin)

                )

                $("table > tbody").append(newRow)
            }
            else {
                var nextTrainTime = moment().add(arrivalMin, "minutes");
                console.log("next train time", nextTrainTime._d);
                // Display new train information
                var newRow = $("<tr>").append(
                    $("<td>").text(newTrainName),
                    $("<td>").text(destination),
                    $("<td>").text(trainFreq),
                    $("<td>").text(nextTrainTime._d),
                    $("<td>").text(arrivalMin)

                )

                $("table > tbody").append(newRow)
            }
        };
        nextTrain();

        // var nextTrainTime = moment(nextTrainTime, "HH:mm");
        // // var trainRemain = trainInterval % trainFreq;       

        var nextTrain = firstTrain;

        // // Display new train information
        // var newRow = $("<tr>").append(
        //     $("<td>").text(newTrainName),
        //     $("<td>").text(destination),
        //     $("<td>").text(trainFreq),
        //     $("<td>").text(nextTrainTime._d),
        //     $("<td>").text(arrivalMin)

        // )

        // $("table > tbody").append(newRow)

    });

    //reset
    // function reset() {(
    //     $("#newTrainName").clear(),
    //     $("#destination").clear(),
    //     $("#firstTrain").clear(),
    //     $("#trainFreq").clear(),
    //     {);

});