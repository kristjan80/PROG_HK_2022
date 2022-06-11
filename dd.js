function rollDices() {
    // clear result fields
    document.getElementById("rollTotal").innerHTML = "";
    document.getElementById("rollResults").innerHTML = "";

    // Get input field data with dices key, remove whitespaces and split the string using "+" as separator
    const data = getDataFromForm().get("dices").replaceAll(' ', '').split("+");
    let rollTotal = 0;
    let allResults = new Array();

    const diceElement = document.getElementById("diceAnimation");

    data.forEach(element => {
        // Split each diceroll to number of dices and the dice type based on "d" value. first is number of rolls, the second max value per roll
        var dice = element.split("d")
        // Simulate the roll and output the data
        for (i = 0; i < dice[0]; i++) {
            // generate random number based on dice numerical value
            var rollResult = Math.floor(Math.random() * dice[1]) + 1;
            allResults.push(rollResult);
            // if d20 is rolled and we get 1 or 20 as a result, add extra message to the output
            criticalMessage = "";
            if (dice[1] == 20 && rollResult == 1) {
                criticalMessage = " (critical miss)"
            }
            else if (dice[1] == 20 && rollResult == 20) {
                criticalMessage = " (critical hit)";
            }
            document.getElementById("rollResults").innerHTML += "<p>d" + dice[1] + ": " + rollResult + criticalMessage + "</p>";
        }

    });

    // Display all roll results and the sum of rolls. Iterate through rollResult array
    document.getElementById("rollTotal").innerHTML += "<p>KOKKU: ";
    var isFirstElement = true;

    allResults.forEach(element => {
        rollTotal += element;
        // For output formating. First element comes only as value. Later add "+" symbol and then the element value
        if (isFirstElement) {
            document.getElementById("rollTotal").innerHTML += element;
            isFirstElement = false;
        }
        else {
            document.getElementById("rollTotal").innerHTML += " + " + element;
        }

    });

    document.getElementById("rollTotal").innerHTML += " = " + rollTotal;
}

/*
    Clear all result from corresponding HTML div-s
*/
function clearRolls() {
    document.getElementById("rollResults").innerHTML = "";
    document.getElementById("rollTotal").innerHTML = "";
}

/*
    Function gets data from HTML from when "VEERETA" button is clicked
*/
function getDataFromForm() {
    // Get data from form
    let form = document.getElementById("formdd");
    return new FormData(form);

}