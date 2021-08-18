/**** This file determines which parts in a selected model have no contacts associated with it.  
If the part has no contacts associated with it, a check is also done to see if any 
supports are associated with that part.  A comment is added to the "model" node of each 
selected branch in the tree.  The comment will contain the names of the parts with no contacts 
and it will also show an error if those parts have no supports.  This macro will only
work if the model has more than one part in it.  ****/


//get the active branches in the tree
var branches = DS.Tree.ActiveBranches;
var numBranches = branches.Count;

//create the array of support types
var supportTypes = getSupportTypes();

var date = new Date();

//loop over the selected branches
if(branches)
{
	for(i=1; i<=numBranches; i++)
	{
		var message = "";
		
		//get the branch
		var branch = branches(i);
		if(branch)
		{
			//If the current branch has both a geometry branch and contact regions, continue
			//with the search, otherwise, the next branch will be checked.
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
							//there are no contact regions, so write the warning to the message
							var partNum = j+1;
							
							//if the message is blank, first add the date
							if(message == "")
								message = date + "<br><br>";
							message = message + "Warning: " + curProto.Text + " (Part " + partNum + ")" +" has no contact pairs" + "<br>";
							
							//Check to see if there are any supports for the prototype with no contact pairs
							var hasSupport = false;
							var loads = branch.Loads
							if(loads)
							{
								hasSupport = doesProtoHaveSupport(curProto, loads);
								//if there are no supports, write an error to the message
								if(false == hasSupport)
									message = message + "Error: " + curProto.Text + " (Part " + partNum + ")" +" has no supports" + "<br>";
							}
						}
					}
					
					//if the message is blank, there were no parts without contacts found
					if("" == message)
					{
						message = message + date + "<br><br>";
						message = message + "There are no warnings or errors" + "<br>";	
					}
					
					//insert the comment
					var model = branch.Model;
					
					if(model)
					{
						var comment = model.AddComment();
						comment.Name = "Parts with no Contacts";
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

function isLoadSupport(load, supportTypes)
{
	var numSupportTypes = supportTypes.length;
	var loadIsSupport = false;
	for(p=0; p<numSupportTypes; p++)
	{
		//check to see if the load's Id matches an ID in the supportTypes array
		if(load.loadType == supportTypes[p])
		{
			loadIsSupport = true;
			break;
		}
	}
	return loadIsSupport
}

function doesProtoHaveSupport(part, loads)
{
	var numLoads = loads.Count;			
	var partHasSupport = false;																			
	for(y=1; y<=numLoads; y++)
	{
		var curLoad = loads(y);
		
		//if the load is suppressed, don't check the association with the parts
		if(curLoad.Suppressed)
			continue;
			
		var isSupport = isLoadSupport(curLoad, supportTypes);
		if(curLoad.Prototypes && isSupport)
		{
			//see if the current prototype's id is associated with the support
			var numLoadProtos = curLoad.Prototypes.Count;
			for(x=1; x<=numLoadProtos; x++)
			{
				if(curLoad.Prototypes(x).ID == part.Tag.ID)
				{
					//the prototype has a support
					partHasSupport = true;
					break;
				}
				if(partHasSupport)
					break;
			}	
		}
		if(partHasSupport)
			break;
	}
	return partHasSupport
}

function getProtoIds(prototypes)
{	
	var numProtos = prototypes.Count;
	var Ids = new Array(numProtos);
	for(j=0; j<numProtos; j++)
		Ids[j] = branch.Prototypes(j+1).ID;
				
	return Ids;
}

function getSupportTypes()
{
	var supTypes = new Array(10);
	supTypes[0] = scriptcode.id_SurfaceSupport;
	supTypes[1] = scriptcode.id_FixedEdgeSupport;
	supTypes[2] = scriptcode.id_FixedVertexSupport;
	supTypes[3] = scriptcode.id_CylinderRadialSupport;
	supTypes[4] = scriptcode.id_CylinderRadialAndAxialSupport;
	supTypes[5] = scriptcode.id_SurfaceFrictionlessSupport;
	supTypes[6] = scriptcode.id_CylinderFixedSupport;
	supTypes[7] = scriptcode.id_CylinderPinnedSupport;
	supTypes[8] = scriptcode.id_SimpleEdgeSupport;
	supTypes[9] = scriptcode.id_SimpleVertexSupport;
	return supTypes;
}