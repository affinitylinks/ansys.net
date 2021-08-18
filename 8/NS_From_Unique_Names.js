// This value determines the nature of the processing of attributes for named selections.
var attributePrefix = "NS"

var branch = DS.Tree.FirstActiveBranch;
var asm = branch.PrototypeGroup.Assembly;
var NSCollection = new Array;

ConvertAttributesToNamedSelection();

function ConvertAttributesToNamedSelection()
{
	var Parts = asm.Parts;
	var partCt = Parts.Count;
	for(j = 1; j <= partCt; j++)
	{
		var part = Parts(j);
		var partID = part.ID;

		var attribs = part.AttributesByName(attributePrefix + "*");
		var attrCt = attribs.Count;
//		WBScript.Out ("Num of attributes for " + part.Name + " = " + attrCt, true);
		
		if(attrCt == 0)
		{
			//WBScript.Out ("No attributes on " + part.Name, true);
			continue;
		}
			
		for(k = 1; k <= attrCt; k++)
		{
			var TopoId = attribs(k).TopoId;
			var attrib = attribs(k);
			if(TopoId == 0)
			{
				WBScript.Out("Attribute " + attrib.Name + " is not associated with any entity", true);
				continue;
			}
			else
			{
				var attrName = attrib.Name;
				//WBScript.Out("Attribute Name before = " + attrName, true);

				var idx = attrName.lastIndexOf("_");
				var trimmedString = attrName.substring(0, idx);				
				//WBScript.Out("Attribute Name after " + idx  + " is removed = " + trimmedString, true);

				var NS = GetNamedSelection(trimmedString);
				var currentLen = NS.length;
				NS[currentLen] = partID;
				NS[currentLen + 1] = TopoId;
			}
		}
	}

	CreatedNamedSelectionsInDS();
}

function GetNamedSelection(NSName)
{
	var numExistingNSs = NSCollection.length;
	//WBScript.Out("Number of NS = " + numExistingNSs, true);
	for(var nsIdx = 0; nsIdx < numExistingNSs; nsIdx++)
	{
		if(NSName == NSCollection[nsIdx][0])
			return NSCollection[nsIdx];
	}

	var newNS = new Array;
	newNS[0] = NSName;
	NSCollection[nsIdx] = newNS;
	return NSCollection[nsIdx];
}

function CreatedNamedSelectionsInDS()
{
	var numExistingNSs = NSCollection.length;
	for(var nsIdx = 0; nsIdx < numExistingNSs; nsIdx++)
	{
		SM.Clear();
		var SingleNS = NSCollection[nsIdx];
		var NSName = SingleNS[0];
		var lenOfNSArray = SingleNS.length;
		// going from 1 to len -1 since name is first entity
		for(var nsSels = 1; nsSels < lenOfNSArray;)
		{
			var partId = SingleNS[nsSels++];
			var topoId = SingleNS[nsSels++];
			SM.ForceSelect(partId, topoId);
		}
	var componentNode = DS.Script.addNamedSelection(false, NSName);
	}	
	SM.Clear();
	DS.Script.fillTree();
}