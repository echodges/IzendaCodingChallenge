<!DOCTYPE html>
<html>
    <head>
        <title>Patient Records</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="EventHandler.js"></script>
        <link rel="stylesheet" type="text/css" href="mystyle.css">
        <link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
    </head>

    <!-- Header -->
    <header class="w3-container w3-blue">
         <h1>Izenda Coding Challenge 1</h1>
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
                    </form>
                </div>
            </div>

            <!-- Patient List -->
            <ul id = "patentTableListElement">
                <h2> Select a patient from the table: </h2>
                <div id = "patientTable">
                    <p id="pT"> Patient Table Loads Here. </p>
                </div>
            </ul>
            <div class = "spacer">    </div>
        </div>
        <div class="w3-container w3-half w3-blue">
        <ul>
            <h2> Patient Information: </h2>
            <p id = "selectedPatient"> No Patient Selected! </p>
            </ul>
        </div>

  
    </body>
    <!-- Content Ends -->

    <!-- Footer -->
   
    <footer class="w3-container w3-blue">
        <div id = "footerSpacer"> </div>
         <h3>Chris Hodges 2016</h3>
    </footer>

</html>