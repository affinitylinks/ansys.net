/******************************************************************
* Name: DS_MESCO_ContaFrictVsTemp_APDL
*         macro adds APDL code ad set up contact with temperature dependent friction coefficient 
		  the data can be modified to obtain frictrion dependence i.e. from slide or pressure
* ANSYS : ANSYS Structural v.12
* Data	: 14.12.2010r.
* Ver   : 1.4.0
* Autor	: Przemyslaw Siedlaczek MESco psiedlaczek@mesco.com.pl
* Uwagi	: 
/******************************************************************/

// Initialize
// Check where we are in the tree
var selObj = TreeView.FirstSelectedItem.Tag;
var branchObj = DS.Tree.FirstActiveBranch;

// Set up standard things
var project = branchObj.Project;
var model = branchObj.Model;
var environment = branchObj.Environment;
var results = branchObj.AnswerSet; // Not needed in this macro
var project = branchObj.Project;            // Projekt 
var contact = branchObj.ContactRegions;  // kontakty
                
var IleContacts = contact.count;

var ts = "\n\n";
ts += "!/****************************************************************** \t\n ";
ts += "!* Nazwa: Temperature dependent friction model \t\n ";
ts += "!* Wersja: ANSYS Structural v.12 \t\n ";
ts += "!* Data	: 14.12.2010r. \t\n ";
ts += "!* Wersja: 1.4.0 \t\n ";
ts += "!* Autor: psiedlaczek@mesco.com.pl  \t\n ";
ts += "!* Uwagi:  \t\n ";
ts += "!/******************************************************************/ \t\n ";
ts += " \t\n ";
ts += " \t\n ";
ts += " NTEMP=3       \t\n ";
ts += " TB,FRIC,CID,,NTEMP,ISO \t\n ";
ts += " \t\n ";
ts += " TBFIELD,TEMP,0 \t\n ";
ts += " TBFIELD,SLDIV,0.1\t\n ";
ts += " TBDATA,1,0.3\t\n ";
ts += " \t\n ";
ts += " TBFIELD,TEMP,200\t\n ";
ts += " TBFIELD,SLDIV,0.5\t\n ";
ts += " TBDATA,1,0.7\t\n ";
ts += " \t\n ";
ts += " TBFIELD,TEMP,200\t\n ";
ts += " TBFIELD,SLDIV,0.7\t\n ";
ts += " TBDATA,1,0.9\t\n ";
ts += "! /solu \t\n ";

//=============================================================
// example: Create command object on environment level.
// command = environment.AddCommandEditor();
// command.Name = "Conta_Fric_VS_Temp"

for (i=1; i <= IleContacts; i++) {
     nazwa = contact(i).Name;
     stan = contact(i).ContactType;
	 selected =contact(i).Selected; // ?? 
     // var msg = "selected: "+selected +"\nstan: "+stan+"\nnazwa: "+nazwa;
     // var choose = DS.Script.wbYesNoCancel(msg,"is selected",choose);    
     //       switch(selected ){
     //           case 0:{ contact(i).Name= i+" Selected   " + "::" + nazwa; break;}
     //           case 1:{ contact(i).Name= i+" Unselected    " + "::" + nazwa; break;}             
	command = contact(i).AddCommandEditor();
	command.Name = i+"_Conta_Fric_VS_Temp"
	command.Text = ts;
            
     }
     


//=============================================================
//// example Create command object on result level.
// command2 = results.AddCommandEditor();
// command2.Name = "Submodel - zapisz (1)"
// command2.Text = ts;
// command2.InputArgument1 = "1"; // step
// command2.InputArgument2 = "5"; // substep
//=====================================================

// Always end with:
DS.Script.fillTree();
