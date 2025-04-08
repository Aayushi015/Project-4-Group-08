var viz;
var workbook;
var activeSheet;

$(document).ready(function() {
    // Wait for the script to load before initializing Tableau
    if (typeof tableau !== 'undefined') {
        initializeViz();
    } else {
        console.error("Tableau API not loaded correctly.");
    }

    // Function to initialize Tableau visualization
    function initializeViz() {
        var placeholderDiv = document.getElementById("tableauViz");
        //var url = "https://public.tableau.com/views/Project4Tableau2_17440948653560/Story1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"; 
        var url = "https://public.tableau.com/shared/BH4WQ3YFQ?:display_count=n&:origin=viz_share_link";
        var options = {
            width: placeholderDiv.offsetWidth,
            height: placeholderDiv.offsetHeight,
            hideTabs: true,
            hideToolbar: true,
            onFirstInteractive: function() {
                workbook = viz.getWorkbook();
                activeSheet = workbook.getActiveSheet();
            }
        };
        viz = new tableau.Viz(placeholderDiv, url, options);
    }
});
