/*
 * This script will apply load and boundary conditions based on attributes that exist
 * on the model.  They are filtered by an attribute prefix and divided by parts by a 
 * seperator.
 */

// These values determine the nature of the processing of attributes.
var attributePrefix = "FEA"
var attributeDelimiter = '_'


var branch = DS.Tree.FirstActiveBranch;
var geomObj = branch.PrototypeGroup;
var asm = geomObj.Assembly;
var nodeID = DS.Tree.FirstActiveObject.ID;
var branchEnv = branch.Environment;

ConvertAttributeToLoadTree();

function ConvertAttributeToLoadTree()
{
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
			var TopoId = attribs(k).TopoId;
			var attrib = attribs(k);
			if(TopoId == 0)
			{
				WBScript.Out("Attribute " + attrib.Name + " is not associated with any entity", true);
				continue;
			}
			else
			{
				var EntityDimension = DetermineEntityDimension(TopoId);
				if(EntityDimension < 0)
				{
					WBScript.Out("Attribute " + attrib.Name + " has a bad reference.", true)
					continue;
				}
				SM.ForceSelect(part.ID, TopoId);

			    var a = attrib.Name.split(attributeDelimiter);
			    var numNameSplits = a.length;

				if(numNameSplits > 1)
				{
					var substrPtr = a[1].toUpperCase().indexOf("PRESSURE");
					if(substrPtr != -1)
					{
						var LoadVal = 0;
						if(EntityDimension == 2)
							LoadVal = 500;
						else
						{
							WBScript.Out("RE: Attribute " + attrib.Name + "\n Pressures must be applied to a face.", true);
							continue;
						}

						load = branchEnv.AddLoad(SM, LoadVal);
						
						var loadMag = 50;      // default value for load
						if(numNameSplits > 2)
						{
							var tempString = new String();
							tempString = a[2];
							loadMag = tempString.valueOf();
						}
						load.Magnitude = loadMag;
						SM.Clear();
						continue;
					}

					substrPtr = a[1].toUpperCase().indexOf("FORCE");
					if(substrPtr != -1)
					{
						var LoadVal = 0;
						if(EntityDimension == 0)
							LoadVal = 503;
						else if(EntityDimension == 1)
							LoadVal = 502;
						else if(EntityDimension == 2)
							LoadVal = 501;
						else
						{
							WBScript.Out("RE: Attribute " + attrib.Name + "\n Bad entity selected for force application.", true);
							continue;
						}

						load = branchEnv.AddLoad(SM, LoadVal);
						var loadMag = 100;      // default value for load
						if(numNameSplits > 2)
						{
							var tempString = new String();
							tempString = a[2];
							loadMag = tempString.valueOf();
						}

						load.Magnitude = loadMag;
						SM.Clear();
						continue;
					}

					substrPtr = a[1].toUpperCase().indexOf("FIXEDSUPPORT");
					if(substrPtr != -1)
					{
						var LoadVal = 0;
						if(EntityDimension == 0)
							LoadVal = 512;
						else if(EntityDimension == 1)
							LoadVal = 511;
						else if(EntityDimension == 2)
							LoadVal = 510;
						else
						{
							WBScript.Out("RE: Attribute " + attrib.Name + "\n Bad entity selected for fixed support application.", true);
							continue;
						}

						load = branchEnv.AddLoad(SM, LoadVal);
						SM.Clear();
						continue;
					}
					substrPtr = a[1].toUpperCase().indexOf("FRICTIONLESS");
					if(substrPtr != -1)
					{
						var LoadVal = 0;
						if(EntityDimension == 2)
							LoadVal = 518;
						else
						{
							WBScript.Out("RE: Attribute " + attrib.Name + "\n Frictionless supports must be applied to a face.", true);
							continue;
						}

						load = branchEnv.AddLoad(SM, LoadVal);												
						SM.Clear();
						continue;
					}				
				}
			}
	    }        
    }
	SM.Clear();

	DS.Script.refreshTree();
    DS.Script.changeActiveObject(branchEnv.ID);
    return 0;
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