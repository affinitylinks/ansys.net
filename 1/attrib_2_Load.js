/*
 * This script will apply a force load (magnitude 1000) on each entity that is flagged with an 
 * attribute beginning with DSA in the first assembly.  There are two mechanisms by which this
 * is done; one via the part manager the other via the DS tree.
 */

//ConvertAttributeToLoadTree();
ConvertAttributeToLoadPM();

function ConvertAttributeToLoadTree()
{
	var partCt = DS.Tree.Branches(1).Project.Models(1).PrototypeGroup.Assembly.Parts.Count;
	WBScript.Out ("Num of parts = " + partCt, true);
  
	for(j = 1; j <= partCt; j++)
	{
		var part = DS.Tree.Branches(1).Project.Models(1).PrototypeGroup.Assembly.Parts(j);

		var attribs = part.AttributesByName("DSA*");
		var attrCt = attribs.Count;
		WBScript.Out ("Num of attributes for " + part.Name + " = " + attrCt, true);
		
		if(attrCt == 0)
			WBScript.Out ("No attributes on " + part.Name, true);
	
		for(k = 1; k <= attrCt; k++)
		{
			var topoId = attribs(k).TopoId;
			if(topoId == 0)
				WBScript.Out("Attribute " + attribs(k).Name + " is not associated with any entity", true);
			else
			{
				SM.ForceSelect(part.ID, topoId);
				var pres = DS.Tree.Branches(1).Environment.AddLoad(SM, 500);
				pres.Magnitude = 1000;
				WBScript.Out ("Added Force to topoId " + topoId, true);
				SM.Clear();
			}
		}		
	}
	DS.Graphics.Redraw(1);

	return 0;
}

function ConvertAttributeToLoadPM()
{
	var NumAsms = PM.Assemblies.Count;
	if(NumAsms == 0)
		WBScript.Out("No assemblies found", true);

	var parts = PM.Assemblies(1).Parts;
	var partCt = parts.Count;

	for(j = 1; j <= partCt; j++)
	{
		var part = parts(j);

		var attribs = part.AttributesByName("DSA*");
		var attrCt = attribs.Count;
		WBScript.Out ("Num of attributes for " + part.Name + " = " + attrCt, true);

		if(attrCt == 0)
			WBScript.Out ("No attributes on " + part.Name, true);
	
		for(k = 1; k <= attrCt; k++)
		{
			var topoId = attribs(k).TopoId;
			if(topoId == 0)
				WBScript.Out("Attribute " + attribs(k).Name + " is not associated with any entity", true);
			else
			{
				SM.ForceSelect(part.ID, topoId);
				var pres = DS.Tree.Branches(1).Environment.AddLoad(SM, 500);
				pres.Magnitude = 1000;
				WBScript.Out ("Added Force to topoId " + attribs(k).TopoId, true);
				SM.Clear();
			}
		}		
	}
	DS.Graphics.Redraw(1);
}
