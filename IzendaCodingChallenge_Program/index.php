<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Patient Records</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="EventHandler.js"></script>
        <link rel="stylesheet" type="text/css" href="mystyle.css">
        <link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
    </head>

    <!-- Header -->
    <header class="w3-container w3-blue">
        <img src="http://ma.izenda.com/hs-fs/hub/409433/file-2355406249-png/IzendaNewLogoBlueTR.png?t=1477509148587" alt="Izenda">
         <h1>Coding Challenge 1</h1>
    </header>

    <!-- Content Begins -->
    <body>
        
        <div class = "spacer">    </div>
        <div class="w3-container w3-half">
            <!-- Operation Selector -->
            <div class="w3-card-4" >
                <div id="selectorCard">
                    <h2> Select an operation: </h2>
                    <form id = "selectCRUDOperation">
                       <input type="radio" class = "w3-radio" name = "CRUDselector" value="0" checked> View Patient Info

                       <input type="radio" class = "w3-radio" name = "CRUDselector" value="1"> Update Existing Patient       
                       <input type="radio" class = "w3-radio" name = "CRUDselector" value="2"> Remove Existing Patient
                       <input type="radio" class = "w3-radio" name = "CRUDselector" value="3"> Add New Patient
                       <br>
                    </form>
                </div>
            </div>

            <!-- Patient List -->
            <ul id = "patentTableListElement">
                <h2> Select a patient from the table: </h2>
                
                <div id = "patientTable">
                    <p id="pT"> Patient Table Loads Here. </p>
                </div>
                <input type="checkbox" class = "w3-check" id = "InfScrolling" checked> Use Infinite Scrolling
                <div class = "smallSpacer">    </div>
                <br><input type='button' class='w3-btn w3-green' value = 'Commit To Database (Coming Soon)' id = 'commit' disabled="diabled">
                <input type='button' class='w3-btn w3-red' id = 'refetch' value = 'Refetch Data (Lose Unsaved Changes)'>
            </ul>
            <div class = "spacer">    </div>

        </div>
        <!-- Patient Information -->
        <div class="w3-container w3-half w3-blue">
        <ul>
            <h2> Patient Information: </h2>
            <p id = "selectedPatient"> No Patient Selected! </p>
            </ul>

        </div>
        <div class = "spacer">    </div>
  
    </body>
    <!-- Content Ends -->

    <!-- Footer -->
   
    <footer class="w3-container w3-blue">
        
         <h3>Chris Hodges 2016</h3>
    </footer>

</html>