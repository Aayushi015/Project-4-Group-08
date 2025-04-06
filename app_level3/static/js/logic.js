$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        // alert("button clicked!");
        makePredictions();
    });
});


    // call Flask API endpoint (Use JavaScripts to reate makePredictions function.)
    // Note: This grab the values from html for all options in our form, make those variables into a payload dictionary below. 
    // Then call an Ajax POST request to send that payload to backend (app.py)
    // App.py receives the payload, then extract and parse and fix the data types of values to payload
function makePredictions() {
    let amount_usd = $("#amount_usd").val();
    let transaction_type = $("#transaction_type").val();
    let industry = $("#industry").val();
    let reported_by_authority = $("#reported_by_authority").val();
    let risk_score = $("#risk_score").val();
    let shell_co_involved = $("#shell_co_involved").val();

    // check if inputs are valid (can add more validation here)
    if (!amount_usd || !transaction_type || !industry || !reported_by_authority || !risk_score || !shell_co_involved) {
        alert("Please fill in all fields before submitting!");
        return;
    }


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
            // JS receives the response from modelHelper/ We extract and parse the response to show the user the below outcome.
            let prob = parseFloat(returnedData["prediction"]);

            if (prob > 0.5) {
                $("#output").text(`Source of money is legal with probability ${prob}!`);
            } else {
                $("#output").text(`Source of money is illegal with probability ${prob}. :(`);
            }

            // Call buildDonut function
            buildDonut(prob)
        },


        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.error("Error: ", errorThrown);
            console.error("Status: ", textStatus);
            console.error("Response Text: ", XMLHttpRequest.responseText);
            alert("Error occurred. Please check the console for details.");
        }

    });

}

function buildDonut(prob) {
    // Data
    let legal = prob
    let illegal = 1-prob;

    let data = [{
        values: [legal, illegal],
        labels: ['Legal', 'illegal']
        hole: .5,
        marker: {
            colors: ['blue', 'red']
        },
        textinfo:"label+percent",
        type: 'pie'
    }],

    let layout = {
        annotation: [{
            font: {size: 30},
            showarrow: false
            text: 'Legal',
            x: 0.5,
            y: 0.5
        }],
        height: 800,
        width: 1200,
        showlegend: false
    };

    Plotly.newPlot('donut', data,layout);

};
