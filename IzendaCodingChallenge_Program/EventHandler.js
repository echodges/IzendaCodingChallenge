var patientsArray; //array to hold all patient data from server
var lastItemClicked = null; //object signifying the last item clicked. When a radio button is clicked, this is reset
var state = 0; //state of radio button/viewport. 0: view patient info. 1: Update Patient. 2: Remove Patient 3: Add Patient

$(document).ready(function() {
    //Onload, load patientsArray
    $.ajax({

         type: "GET",
         url: "https://izenda.herokuapp.com/patients",
         dataType: "json",
         
         success: function (data, status, jqXHR) {
         	//copy data into our patients array. This allows us to access the data even after it has rendered.	
         	patientsArray = data;
         	   
         	refreshPageContent();
         },

         error: function (jqXHR, status) {
             // error handler
              alert("Error loading database. " + status);
         }
    })

    //highligt a table element in our patient table. Deselect last selected element.
    $('ul').on( 'click', 'tr', function () {
    	if(state < 3){ //state 3 (add data) and greater will be functions not requiring a table selection
    		//highlight row, deselect last
    	    $(this).toggleClass("highlight");
   	     	if(lastItemClicked != null && this != lastItemClicked){
        	 $(lastItemClicked).toggleClass("reset");
        	}

        	//Send data to other pane to show selected pattient info accordingly
    	    var patID = -1;

	        if(this == lastItemClicked){ //reclicked same item. Unhighlight. 
        		lastItemClicked = null;
    	    }
	        else{//grab info for patient selection
	    		lastItemClicked = this;
		    	patID = parseInt($(this).find(".idCell").html());
			}

	    	rowSelectionAction(patID);
		}
    } );

	//refresh page content if radio buttons are pressed
    $('#selectCRUDOperation').on('change', function(){ 
    	refreshPageContent();
    } );

    //delete button logic
    $(document).on('click', '#deleteButton', function() {
    	if(lastItemClicked != null){
    		patID = parseInt($(lastItemClicked).find(".idCell").html());
    		removePatient(patID, 0);
    		refreshPageContent();
    	}
    });

    //new form submission logic
   	$(document).on('submit','#newForm',function(e){
   		e.preventDefault();
   		
   		var value = $("[name='id']").val();
   		value = parseInt(value);
   		
   		if(isNaN(value) || value < 1){ //check if id is valid
   			alert("Invalid ID Input. Input a positive integer.")
   		} else{
   			var x = findIndex(value);
			if(x > -1){ //check if id already exists
				alert("ID already found in database. Try a different ID or Update Existing Patient Info.");
			}
   			else{ //add new entry to our array
   				var b = $('#newForm').serializeObject();
   				
   				patientsArray.push(b);
   				patientsArray.sort(sortByProperty('id'));
   				alert("New Patient Added to the database.");
   				
   				refreshPageContent();
   			}
   		}

   	});

   	//update form submission logic
   	$(document).on('submit','#updateForm',function(e){
   		e.preventDefault();
   		$("[name='id']").attr("disabled", null);
   		var value = $("[name='id']").val();
   		value = parseInt(value);
   		
   		if(isNaN(value) || value < 1){ //check if id is valid
   			alert("Invalid ID Input. Please try again." + value);
   		} else{
   			var x = findIndex(value);
			if(x < 0){ //check if it exists... if it doesn't something went wrong
				alert("Something went wrong while updating your data. Please try again.");
			}
   			else{ //remove old entry from array, add new entry to our array
   				removePatient(value, 1);
   				var b = $('#updateForm').serializeObject();
   				
   				patientsArray.push(b);
   				patientsArray.sort(sortByProperty('id'));
   				alert("Patient updated in the database.");
   				
   				refreshPageContent();
   			}
   		}

   	});
});



//refreshPageContent: A change to the working set/working state has changed. Reset the page accordingly.
function refreshPageContent(){
	state = parseInt($('input[name=CRUDselector]:checked', '#selectCRUDOperation').val());
	//refresh patient table
	generateHTMLTable();

	//refresh highlight and selected patient info pane
	
	$(lastItemClicked).toggleClass("reset");
	lastItemClicked = null;
	generateSelectedPatientInfo(-1);

	if(state == 3){ //Adding a new entry.
		createNewPatientForm();
	}
}

//createNewPatientForum: Generate A form to create a new patient.
function createNewPatientForm(){
	//note: all of tihs could be one line but it's hard to read. 
	//process could be placed in a foreach loop but I wanted to leave the form open for future versatility
	var form = "<form id = \'newForm\' action = \'\' >";
	form = form + "<label>Desired ID: </label>" + "<input type=\'text\' name=\'id\' value=\'1\'><br>";
	form = form + "<label>First Name: </label>" + "<input type=\'text\' name=\'first_name\' value=\'Mickey\'><br>";
	form = form + "<label>Last Name: </label>" + "<input type=\'text\' name=\'last_name\' value=\'Mouse\'><br>";
	form = form + "<label>Email: </label>" + "<input type=\'text\' name=\'email\' value=\'mouse@gmail.com\'><br>";
	form = form + "<label>Gender: </label>" + "<input type=\'text\' name=\'gender\' value=\'Male\'><br>";
	form = form + "<label>Street Address: </label>" + "<input type=\'text\' name=\'street_address\' value=\'123 No Way\'><br>";
	form = form + "<label>State: </label>" + "<input type=\'text\' name=\'state\' value=\'GA\'><br>";
	form = form + "<label>Drugs: </label>" + "<input type=\'text\' name=\'drug\' value=\'Happiness\'><br>";
	form = form + "<input type=\'submit\' value = \'Submit\'>";
	form = form + "<input type=\'reset\' id = \'clearFormButton\'>";
	form = form + "</form>";
	
	$("#selectedPatient").html(form);
}

//generateHTMLTable: Generate an html table with all of the json elements listed at the given url
function generateHTMLTable(){
	var temp = "<table> ";

    for(var x = 0; x < patientsArray.length; x++){
    	temp = temp + "<tr id=\'clickRow\'> " + "<td class = \'idCell\'> " + patientsArray[x].id + " </td>" + "<td> " + patientsArray[x].last_name + " </td>" + "<td> " + patientsArray[x].first_name + " </td>" + "<td> " + patientsArray[x].gender + " </td>" + "<td> " + patientsArray[x].state + " </td>" + "<td> " + patientsArray[x].street_address + " </td>" + " </tr>";
    }

  	temp = temp + "</table>";

   	$("#pT").html("" + temp);
}

//findIndex: Find the index of a given patientID. Return -1 otherwise.
function findIndex(patientID){
	for(var x = 0; x < patientsArray.length; x++){ //find the index of the patient id
		if(patientsArray[x].id == patientID){
			return x;
		}
	}
	return -1;
}

//generateEditablePatientInfo: Generate a form autofilled with selected row's info.
//parameter: patientID
function generateEditablePatientInfo(patientID){

	var y = findIndex(patientID);

	if(y < patientsArray.length && y > -1){ //check if id is valid

		//note: all of tihs could be one line but it's hard to read. 
		//process could be placed in a foreach loop but I wanted to leave the form open for future versatility
        var form = "<form id = \'updateForm\' action = \'\' >";

	
		form = form + "<label>Desired ID: </label>" + "<input type=\'text\' name=\'id\' value=\'" + patientsArray[y].id + "\'><br>";
		form = form + "<label>First Name: </label>" + "<input type=\'text\' name=\'first_name\' value=\'" + patientsArray[y].first_name + "\'><br>";
		form = form + "<label>Last Name: </label>" + "<input type=\'text\' name=\'last_name\' value=\'" + patientsArray[y].last_name + "\'><br>";
		form = form + "<label>Email: </label>" + "<input type=\'text\' name=\'email\' value=\'" + patientsArray[y].email + "\'><br>";
		form = form + "<label>Gender: </label>" + "<input type=\'text\' name=\'gender\' value=\'" + patientsArray[y].gender + "\'><br>";
		form = form + "<label>Street Address: </label>" + "<input type=\'text\' name=\'street_address\' value=\'" + patientsArray[y].street_address + "\'><br>";
		form = form + "<label>State: </label>" + "<input type=\'text\' name=\'state\' value=\'" + patientsArray[y].state + "\'><br>";
		form = form + "<label>Drugs: </label>" + "<input type=\'text\' name=\'drug\' value=\'" + patientsArray[y].drug + "\'><br>";
		form = form + "<input type=\'submit\' value = \'Submit\'>";
		form = form + "<input type=\'reset\' id = \'clearFormButton\'>";
		form = form + "</form>";

		$("#selectedPatient").html(form);
		$("[name='id']").attr("disabled", "disabled");
	} else{
		 $("#selectedPatient").html("No Patient Selected!");
	}

}

//generateSelectedPatientInfo: Generate Info for the selected patient. 
//Parameter: (int)patientID 
function generateSelectedPatientInfo(patientID){
	var y = findIndex(patientID);

	if(y < patientsArray.length && y > -1){
		var temp = "ID Number: " + patientsArray[y].id + "<br>" +"Name: " + patientsArray[y].first_name + "," + patientsArray[y].last_name + "<br>" + "Email: " + patientsArray[y].email + "<br>" + "Gender: " + patientsArray[y].gender + "<br>";
    	temp = temp + "Address: " + patientsArray[y].street_address + "," + patientsArray[y].state + "<br>" + "Drug(s): " + patientsArray[y].drug + "<br>";
        $("#selectedPatient").html("" + temp);
	} else{
		 $("#selectedPatient").html("No Patient Selected!");
	}

}

//rowSelectionAction: handle all cases when a row is selected. 
// Parameter: (int)patientID 
//state 0: generate patient info. state 2: generate patient info, generate buttons to delete entry
function rowSelectionAction(patientID){
	generateSelectedPatientInfo(patientID);

	//Generate a button to delete selection, reload table if delete occurs
	if(state == 2){
		 var currentValue = $("#selectedPatient").html();
		  $("#selectedPatient").html(currentValue +  "<button type=\'button\' class =\'button\' id = \'deleteButton\'>Delete Record</button>");
	}

	if(state == 1){ //allow the original text generator to run just in case this process fails.
		generateEditablePatientInfo(patientID);
	}
}



//removePatient: Removes patient from local copy of the dataset.
//parameters: patientID, usageFlag-- 0: default usage. Used for the Delete functionality. 1: modified usage: used for the Update functionality. Removes added dialogue
function removePatient(patientID, usageFlag){
	var y = findIndex(patientID);
	if(y > -1){
		if(usageFlag == 0){
			var nameTag = patientsArray[y].first_name + " " + patientsArray[y].last_name + " (Patient" + patientsArray[y].id + ").";
			alert("Removing " + nameTag);
		}
		patientsArray.splice(y, 1);
	}
}

//Serializes object into json format. Adapted from http://jsfiddle.net/akhildave/sxGtM/5002/
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//Sorts Our JSON Array By a particular property
function sortByProperty(property) {
    'use strict';
    return function (a, b) {
        var sortStatus = 0;
        if (a[property] < b[property]) {
            sortStatus = -1;
        } else if (a[property] > b[property]) {
            sortStatus = 1;
        }
 
        return sortStatus;
    };
}