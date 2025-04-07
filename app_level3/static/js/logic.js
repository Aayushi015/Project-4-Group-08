$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        // alert("button clicked!");
        makePredictions();
    });
});

function drawEmptyDonut() {
    let data = [{
      values: [1],
      labels: ['Awaiting Prediction'],
      hole: .5,
      marker: {
        colors: ['#e0e0e0']
      },
      textinfo: "label",
      type: 'pie'
    }];
  
    let layout = {
      annotations: [{
        font: { size: 22 },
        showarrow: false,
        text: 'No Prediction Yet',
        x: 0.5,
        y: 0.5
      }],
      height: 600,
      width: 600,
      showlegend: false
    };
  
    Plotly.newPlot('donut', data, layout);
  }
  
  $(document).ready(function () {
    drawEmptyDonut(); // Before user does any input
    $("#filter").click(function () {
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
            // Log when the prediction is complete
            console.log("Prediction Complete!")
            console.log(returnedData);

            let prob = parseFloat(returnedData["prediction"]);
            
            // JS receives the response from modelHelper/ We extract and parse the response to show the user the below outcome.
            $("#output").show();
            
            if (prob > 0.5) {
                $("#output").removeClass().addClass("custom-legal").text(`Source is likely LEGAL with probability ${prob.toFixed(2)}`);
            } else {
                $("#output").removeClass().addClass("custom-illegal").text(`Source is likely ILLEGAL with probability ${(1 - prob).toFixed(2)}`);
            }            

            // Call buildDonut function
            buildDonut(prob);
        },
        

    });

}
function error(XMLHttpRequest, textStatus, errorThrown) {
          console.error("Error: ", errorThrown);
          console.error("Status: ", textStatus);
          console.error("Response Text: ", XMLHttpRequest.responseText);
          alert("Error occurred. Please check the console for details.");
       }


function buildDonut(prob) {
    // Data
    let legal = prob;
    let illegal = 1-prob;

    let data = [{
        values: [legal, illegal],
        labels: ['Legal', 'Illegal'],
        hole: 0.5,
        marker: {
          colors: ['#1D3557', '#E63946'],
          line: {
            color: '#fff',
            width: 2
          }
        },
        textinfo: "label+percent",
        hoverinfo: "label+percent",
        type: 'pie'
      }];
      

    let resultText = prob > 0.5
        ? `LEGAL (${(prob * 100).toFixed(1)}%)`
        : `ILLEGAL (${((1 - prob) * 100).toFixed(1)}%)`;

    let layout = {
        annotations: [{
            font: {size: 22},
            showarrow: false,
            text: resultText,
            x: 0.5,
            y: 0.5
        }],
        height: 600,
        width: 600,
        showlegend: false
    };

    Plotly.newPlot('donut', data, layout);

}
