/**** This file determines which contacts are associated with each part in a selected model.  
A comment is added to the "model" node of each active branch in the tree which lists the 
parts and the contacts associated with it.  This macro will only work if the model has 
more than one part in it.  ****/


//get the active branches in the tree
var branches = DS.Tree.ActiveBranches;
var numBranches = branches.Count;

var date = new Date();

//loop over the branches
if(branches)
{
	for(i=1; i<=numBranches; i++)
	{
		var message = "";

		//get the branch
		var branch = branches(i);
		if(branch)
		{
			if(branch.Prototypes && branch.ContactRegions)
			{
				//get the number of prototypes and contacts and create an array for the prototype ids
				var protoIds = getProtoIds(branch.Prototypes);
				var numProtos = protoIds.length;
				var numContacts = branch.ContactRegions.Count;
				var protos = branch.Prototypes;
			
				//the check for contacts only needs to be done if there is more than one part
				if(numProtos > 1)
				{
					//determine whether each prototype has any contacts associated with it		
					for(j=0; j<numProtos; j++)
					{
						var curProto = scriptcode.findItem(protoIds[j]);
						
						//if the prototype is suppressed, there is no need to check for contacts
						if(true == curProto.Tag.Suppressed)
							continue;
									
						var idList = getContactIdListForProto(protoIds[j], branch.ContactRegions);
						var partNum = j+1;
						//if there are items in the list get the item's name and create the message
						if(idList.length > 0)
						{
							contact = scriptcode.findItem(idList[0]);
							//add the date and the first contact name to the message
							if(message == "")
								message = message + date + "<br><br>";
							message = message + curProto.Text + " (Part " + partNum + ")" + " has the following contacts: " + contact.Text;
							//if there more than one contacts for the current part, add the names
							//of the rest to the comment also.
							for(var c=1; c<idList.length; c++)
							{
								contact = scriptcode.findItem(idList[c]);
								message = message+", " + contact.Text;
							}
							message  = message + "<br>";
						}
						else
						{
							if(message == "")
								message = message + date + "<br><br>";
							message = message + curProto.Text + " (Part " + partNum + ")" + "  is free standing" + "<br>";
						}
					}
					
					var model = branch.Model;
					
					//if the message is empty, display a new message, give a message 
					//that there are no contacts to report
					if(message == "")
					{
						message = date + "<br><br>";
						message = message + "No unsuppressed parts have active contacts."
					}
						
					//insert the comment in the solution branch		
					if(model)
					{
						var comment = model.AddComment();
						comment.Name = "Part/Contact List";
						comment.Text = message;
						scriptcode.fillTree();
						var selectComment = scriptcode.findItem(comment.ID);
						TreeView.SelectedItem = selectComment;
					}
				}
			}
		}	//end if(branch)
	}	//end for(branches)
}	//end if(branches)

function getProtoIds(prototypes)
{	
	var numProtos = prototypes.Count;
	var Ids = new Array(numProtos);
	for(j=0; j<numProtos; j++)
		Ids[j] = branch.Prototypes(j+1).ID;
				
	return Ids;
}

function getContactIdListForProto(prototype, contactList)
{
	var contactIds = new Array();
	var numContacts = contactList.Count;
	var index = 0;
	var i, j;
	
	for(i=1; i<= numContacts; i++)
	{
		var curContact = contactList(i);
		
		//if a contact is suppressed, don't include it in the list
		if (curContact.Suppressed)
			continue;
			
		if(curContact.Prototypes)
		{
			var numProtos = curContact.Prototypes.Count;
			
			for(j=1; j<=numProtos; j++)
			{
				if(prototype == curContact.Prototypes(j).ID)
				{
					//if the ids match, add the id to thelist and increment the index
					contactIds[index] = curContact.ID;
					index++;
				}
			}
		}
	}
	return contactIds;
}
