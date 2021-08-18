/**** This file determines which parts in a selected model have no contacts associated with it.  
If the part has no contacts associated with it, that part will be selected in the tree.
This macro will only work if the model has more than one part in it.  ****/

/**** This macro should be used at the model level or below.  It is not intended for use 
at the project level or for multiple levels.  ****/


//get the active branches in the tree
var branch = DS.Tree.FirstActiveBranch;

if(branch)
{
	//If the current brach has both a geometry brach and contact regions, continue
	//with the search, otherwise, the next brach will be checked.
	if(branch.Prototypes && branch.ContactRegions)
	{
		//get the number of prototypes and contacts and create an array for the prototype ids
		var protoIds = getProtoIds(branch.Prototypes);
		var numProtos = protoIds.length;
		var numContacts = branch.ContactRegions.Count;
		var protos = branch.Prototypes;
		var firstObj = true;

		//the check for contacts only needs to be done if there is more than one part
		if(numProtos > 1)
		{
			//for each prototype, determine if it has a contact associated with it		
			for(j=0; j<numProtos; j++)
			{
				//find the item for the current id
				var curProto = scriptcode.findItem(protoIds[j]);
						
				//if the prototype is suppressed, there is no need to check for contacts
				if(true == curProto.Tag.Suppressed)
					continue;

				var found = doesProtoHaveContact(protoIds[j], branch.ContactRegions);

				if(false == found)
				{
					//there are no contact regions, so select that part in the tree
					var node = TreeView.Nodes.Item("a" + protoIds[j]);
								
					if(node)
					{
						if(firstObj)
						{
							//if it's the first object to be selected, use 
							//changeActiveObjects to clear all other selected objects first.
							scriptcode.changeActiveObject( protoIds[j] );
							firstObj = false;
						}

						else
						{
							node.Selected = true;
							scriptcode.lvUpdateProps();
						}
					}
				}
			}
		}
	}
}	//end if(branch)


function doesProtoHaveContact(partId, contactList)
{
	var contacts = contactList.Count;
	var contactFound = false;
	for(k=1; k<=contacts; k++)
	{
		var contactRegion = contactList(k);
		
		//if the contact is suppressed, don't check the association with the parts
		if(contactRegion.Suppressed)
			continue;
			
		var numContProtos = contactRegion.Prototypes.Count;
		//loop over the parts and compare the id of the part to the ids of 
		//parts in the current contact.  If they match, the part has a contact.
		for(z=1; z<= numContProtos; z++)
		{
			var contProto = contactRegion.Prototypes(z);
			if(contProto.ID == partId)
				contactFound = true;
			if(true == contactFound)
				break;
		}
		if(true == contactFound)
			break;
	}
	return contactFound;
}

function getProtoIds(prototypes)
{	
	var numProtos = prototypes.Count;
	var Ids = new Array(numProtos);
	for(j=0; j<numProtos; j++)
		Ids[j] = branch.Prototypes(j+1).ID;
				
	return Ids;
}
