<!DOCTYPE html>
<html>
    <head>
        <title>Patient Records</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="EventHandler.js"></script>
        <link rel="stylesheet" type="text/css" href="mystyle.css">
    </head>

    <body>
        <h2> Select an operation: </h2>
        <form id = "selectCRUDOperation">

            <input type="radio" name = "CRUDselector" value="0" checked> View Patient Info       
            <input type="radio" name = "CRUDselector" value="1"> Update Existing Patient       
            <input type="radio" name = "CRUDselector" value="2"> Remove Existing Patient
            <input type="radio" name = "CRUDselector" value="3"> Add New Patient
        </form>


        <ul id = patentTableListElement>
            <h2> Select a patient from the table: </h2>
            <div id = "patientTable">
                <p id="pT"> Patient Table Loads Here. </p>
             </div>
        </ul>

        <ul>
            <h2> Patient Information: </h2>
            <p id = "selectedPatient"> No Patient Selected! </p>
        </ul>
    </body>
</html>