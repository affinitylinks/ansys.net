/******************************************************************
* Nazwa	: DS_MESCO_ContactName_NrTypeAdd
* 		  Macro sets contact name adding sequence number and type ending with two ::
*         Nr contact_type::orginal_contact_name
* Wersja: ANSYS DesignSpace v.11
* Data	: 23.07.2007r.
* Autor	: psiedlaczekmesco.com.pl
* Uwagi	: 
/******************************************************************/

    // Initialize

    var selObj = TreeView.FirstSelectedItem.Tag;
    var branchObj = DS.Tree.FirstActiveBranch;
    var project = branchObj.Project;            // Projekt 
    var contact = branchObj.ContactRegions;  // kontakty
                
    var IleContacts = contact.count;
    
    var msg = "Do you want to extend contact names by number and type?\nYes:\tAdd number and type string to contact \nNo:\tDelete number and name up to first ::\nCancel:\tDo nothing";
    
    var choose = DS.Script.wbYesNoCancel(msg,"Adding part numbers",choose);    
    //DS.Script.wbInfoMsgBox(choose + "::: " + IleContacts ," Numeracja Partow",true);    

    switch(choose){
    case 1:{
        for (i=1; i <= IleContacts; i++) {
            nazwa = contact(i).Name;
            stan = contact(i).ContactType;
			
            switch(stan){
                case 0:{ contact(i).Name= i+" Undefined   " + "::" + nazwa; break;}
                case 1:{ contact(i).Name= i+" Bonded      " + "::" + nazwa; break;}
                case 2:{ contact(i).Name= i+" Frictionless" + "::" + nazwa; break;}
                case 3:{ contact(i).Name= i+" Frictional  " + "::" + nazwa; break;}
                case 4:{ contact(i).Name= i+" Rough       " + "::" + nazwa; break;}
                case 5:{ contact(i).Name= i+" NoSeparation" + "::" + nazwa; break;}
            }
        }
        DS.Script.fillTree();           // Refresh Tree
        break;
    }
    case 0:{
        for (i=1; i <= IleContacts; i++) {
            nazwa = contact(i).Name; 
            gdzieKoniec= nazwa.lenght;
            gdziePoczatek = nazwa.indexOf("::");
            if (gdziePoczatek != -1){
                nazwa = nazwa.slice(gdziePoczatek+2,gdzieKoniec);
            contact(i).Name = nazwa;
        
            }
        }
        DS.Script.fillTree();           // Refresh Tree
        break;       
    }
    default:{ break; }
}

//*/