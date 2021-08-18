/* 
	attributePrefix is intended to be the prefix of the attribute used
	in the CAD to represent mesh-sizing.  
*/


var attributePrefix = "ELEMENT_SIZE"

convertAttributesToMeshSizing();

function convertAttributesToMeshSizing()
{
	var branch = null;
	branch = DS.Tree.FirstActiveBranch;
	if( !branch ) return;

	var asm = branch.PrototypeGroup.Assembly;

	var meshGroup = branch.MeshControlGroup;
	if( !meshGroup ) return;

	var Parts = asm.Parts;
	var partCt = Parts.Count;
  
	for(j = 1; j <= partCt; j++)
	{
		var part = Parts(j);

		var attribs = part.AttributesByName(attributePrefix + "*");
		var attrCt = attribs.Count;
//		WBScript.Out ("Num of attributes for " + part.Name + " = " + attrCt, true);
		
		if(attrCt == 0)
		{
			//WBScript.Out ("No attributes on " + part.Name, true);
			continue;
		}
	
		SM.Clear();
		
		for(k = 1; k <= attrCt; k++)
		{
			var attrib = attribs(k);
			var TopoId = attrib.TopoId;
			if(TopoId == 0)
			{
				WBScript.Out("Attribute " + attrib.Name + " is not associated with any entity", true);
				continue;
			}
			else
			{
				var EntityDimension = DetermineEntityDimension(TopoId);
				// sizing only appropriate on body, face or edge
				if(EntityDimension < 1)
				{
					WBScript.Out("Attribute " + attrib.Name + " has a bad reference.", true)
					continue;
				}
				SM.ForceSelect(part.ID, TopoId);

				var sizeControl = meshGroup.AddMeshControl(SM, DS.Script.id_Size);
				if( !sizeControl ) return;

				var meshGroupNode = DS.Script.GetNode (meshGroup.ID)
				DS.Script.addNodeAndChildren(sizeControl, meshGroupNode);

				sizeControl.ESize = 0.05;
				//sizeControl.ESize = attrib.Value;

				SM.Clear();
				DS.Script.updateOneNodeState( meshGroup.ID );

			}
		}
	}
}

function DetermineEntityDimension(TopoId)
{
	if(TopoId < 1)
		return -1;
	else if(TopoId < 1073741825)
		LoadVal = 0;
	else if(TopoId < 2147483649)
		return 1;
	else if(TopoId < 3221225473)
		return 2;
	else
		return 3;		
}