/******************************************************************
* Name	: DS_MESCO_SelectBodysByMaterial
*         Macro Selects all bodys with thesame material as selected part
* ANSYS : ANSYS DesignSpace v12.0
* Date	: 01.03.2010r.
* Ver   : 1.0.0
* Autor	: psiedlaczek@mesco.com.pl 
* Notes	: based on http://www.xansys.org/forum/viewtopic.php?t=13965&highlight=wbscript
/******************************************************************/

var branch = DS.Tree.FirstActiveBranch;
var geomObj = branch.PrototypeGroup;
var asm = geomObj.Assembly;
var nodeID = DS.Tree.FirstActiveObject.ID;

var firstPartID = 0;
var selectedPart;
var entityRefId = 0;
var entityTopoId = 0;

// user option for scoping selection to all parts or just selected
var useSelectedPartOnly = true;

main1();

function main1()
{
	doBodySelection();
}

function doBodySelection()
{

// Get some global things we need
//
	var branch = DS.Tree.FirstActiveBranch;
	var geomObj = branch.PrototypeGroup;
	var asm = geomObj.Assembly;

	// Get the first selected part name
	//
	var selectedPartName = SM.SelectedPart(1);
	if( selectedPartName=="" )
	{
		WBScript.Out("No entity selected", true);
		return;
	}
	
	// Get the 1st selected part id
	var selectedPartID = SM.SelectedPartID(1);
	
	// Get the actual part from the assembly
	var selectedPart = asm.PartById(selectedPartID);
	
	// ID of the 1st selected body
	var entityTopoId = SM.SelectedEntityTopoID(1);
	
	// Locate the selected body's material in the tree
	var i;
	var selectedBodyMaterial = null;
	var np = geomObj.Prototypes.Count;
	for( i=1; i<=np ;i++ )
		{
		// Get the part corresponding to the tree object
		var proto = geomObj.Prototypes(i);
		var part = proto.Part;
		
		// If the geometric selection corresponds to the tree item
		// get it's material, and exit the loop
		if( selectedPartID ==part.ID && entityTopoId ==	proto.topoID)
		{
			selectedBodyMaterial = proto.MaterialName;
			break;
		}
	}
	
	SM.Clear();	

	var ccc = 0;
	
	// Match against all the bodies in the tree
	for( i=1; i<=np ;i++ )
	{
		var proto = geomObj.Prototypes(i);
		if( selectedBodyMaterial == proto.MaterialName )
		{
			SM.ForceSelect( proto.part.ID, proto.topoID );
			ccc++;
		}
	}
	
	var mInfo = "\n Selected Material     : " + selectedBodyMaterial ;
	mInfo +=    "\n -  Prototype count  : " + np;
	mInfo +=    "\n -  Selected Count  : " + ccc;
	mInfo += "\n\nOk to finish the macro"
		
	WBScript.Out(mInfo , true, " INFOS ");
} 

