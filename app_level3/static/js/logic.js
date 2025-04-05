$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        // alert("button clicked!");
        makePredictions();
    });
});


    // call Flask API endpoint
function makePredictions() {
    let amount_usd = $("#amount_usd").val();
    let transaction_type = $("transaction_type").val();
    let industry = $("industry").val();
    let reported_by_authority = $("reported_by_authority").val();
    let risk_score = $("risk_score").val();
    let shell_co_involved = $("shell_co_involved").val();


    // check if inputs are valid

    // create the payload
    let payload = {
        "amount_usd": amount_usd,
        "transaction_type": transaction_type,
        "industry": industry,
        "reported_by_authority": reported_by_authority,
        "risk_score": risk_score,
        "shell_co_involved": shell_co_involved
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/makePredictions",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);
            let prob = parseFloat(returnedData["prediction"]);

            if (prob > 0.5) {
                $("#output").text(`Source of money is legal with probability ${prob}!`);
            } else {
                $("#output").text(`YSource of money is illegal with probability ${prob}. :(`);
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}
