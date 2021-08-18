// when run from DesignSpace, this script writes out a JScript shortcut file
// that can recreate the active branch contents on demand

// object type constants
//

var id_Project                = 103;
var id_Model                  = 104;
var id_Environment            = 105;
var id_AnswerSet              = 107;
var id_MeshControlGroup       = 127;
var id_Alert                  = 134;
var id_Comment                = 135;
var id_PrototypeGroup         = 136;
var id_ContactGroup           = 137;
var id_EngineeringDataGroup   = 138;
var id_Convection             = 139;
var id_FrequencyGroup         = 140;
var id_Acceleration           = 141;
var id_Rotation               = 142;
var id_Convergence            = 143;
var id_ParameterSet           = 144;
var id_Template               = 145;
var id_TemplateOutput         = 146;
var id_Figure                 = 147;
var id_Prototype              = 400;
var id_Support                = 402;
var id_Load                   = 403;
var id_Material               = 406;
var id_Table                  = 407;
var id_DataCurve              = 408;
var id_MeshControl            = 410;
var id_StressSafetyTool       = 450;
var id_FatigueTool            = 457;
var id_Result                 = 520;
var id_ContactRegion          = 575;
var id_TreeRoot               = 802;
var id_ResultChart            = 522;

// tree object variables
//
var project = null;
var model = null;
var environment = null;
var resKid = null;
var resKids = null;
var childObj = null;
var parentObj = null;
var shortcutDir = null;
var filter = null;
var fileName = null;
var doc = null;
var docObj = null;

var selObj = TreeView.FirstSelectedItem.Tag;
Main();

function Main()
{
	if (selObj.Class != id_AnswerSet)
	{
		WBScript.Out("Please select a Solution object before running this macro", true);
		return;
	}
	    
	else
	{
	    // ask the user where to save the new shortcut
	    //
	    shortcutDir = WB.InstallDir("DSApplet") + "\\Pages\\Shortcuts\\General Simulation";
	    filter = "JScript files (*.js)|*.js";
	    fileName = DS.Script.wbGetFileSelection( "User Defined Branch.js", shortcutDir, filter, true );
	    
	    if (fileName == "")
	    {
			return;
	    }

	    // create the new file
	    //
	    doc = new ActiveXObject("Scripting.FileSystemObject");
	    docObj = doc.CreateTextFile(fileName, true);
	    
	    if (!docObj)
	    {
			WBScript.Out("File could not be created.", true);
			return;
	    }

	    // write some header information into the file
	    //
	    var date = new Date();
	    docObj.WriteLine("// " + fileName);
	    docObj.WriteLine("//     created on " + date);

	    // write out script variables
	    //
	    docObj.WriteLine("");
	    docObj.WriteLine("var selObj = null;");
	    docObj.WriteLine("var branchObj = null;");
	    docObj.WriteLine("var project = null;");
	    docObj.WriteLine("var model = null;");
	    docObj.WriteLine("var environment = null;");
	    docObj.WriteLine("var answerSet = null;");
	    docObj.WriteLine("var result = null;");
	    docObj.WriteLine("var load = null;");
	    docObj.WriteLine("var alert = null;");
	    docObj.WriteLine("var convergence = null;");
	    docObj.WriteLine("var acceleration = null;");
	    docObj.WriteLine("var rotation = null;");
	    docObj.WriteLine("var support = null;");
	    docObj.WriteLine("var frequencyGroup = null;");
	    docObj.WriteLine("var template = null;");
	    docObj.WriteLine("var comment = null;");
	    docObj.WriteLine("var edg = null;");
	    docObj.WriteLine("var figure = null;");
	    docObj.WriteLine("var stressSafetyTool = null;");
	    docObj.WriteLine("var userUnits = DS.UnitSystemID;");
	    docObj.WriteLine("DS.UnitSystemID = " + DS.UnitSystemID + ";");
	    

	    // write out script code to create the branch
	    //
	    docObj.WriteLine("");
	    docObj.WriteLine("selObj = TreeView.FirstSelectedItem.Tag;");
	    docObj.WriteLine("if (selObj.Class == 103)\n{\n    branchObj = DS.Tree.NewEmptyBranch(0);\n}");
	    docObj.WriteLine("else\n{\n    branchObj = DS.Tree.NewEmptyBranch(selObj.ID);\n}");

	    // write out tree variables    
	    //
	    docObj.WriteLine("");
	    docObj.WriteLine("project = branchObj.Project;");
	    docObj.WriteLine("model = branchObj.Model;");
	    docObj.WriteLine("environment = branchObj.Environment;");
	    docObj.WriteLine("answerSet = branchObj.AnswerSet;");
		    
	    var activeBranch = selObj.Branch;
		    
	    project = activeBranch.Project;
	    model = activeBranch.Model;
	    environment = activeBranch.Environment;
	    answerSet = selObj;
		    
	    // Project
		    
	    docObj.WriteLine("project.Name = \"" + project.Name + "\";");
		  
	    var	projKids = project.Children;
	    var numProjKids = projKids.Count;
		    
	    for (var r = 1; r <= numProjKids; r++)
	    {
			var projKid = projKids.Item(r);
				
			if (projKid.Class == id_Comment)
			{
				Comment(projKid, project);
			}
				
			else if (projKid.Class == id_Model)
			{
				Model(projKid);
			}
	    }
		 
		docObj.WriteLine("DS.Script.fillTree();");
	    docObj.WriteLine("DS.UnitSystemID = userUnits;");
	}
}


function Comment(childObj, parentObj)
{
	docObj.WriteLine("//in Comment Function");
	if (parentObj.Class == id_Project)
	{
		docObj.WriteLine("comment = project.AddComment();");
	}
	
	else if (parentObj.Class == id_Model)
	{
		docObj.WriteLine("comment = model.AddComment();");
	}
	
	else if (parentObj.Class == id_Environment)
	{
		docObj.WriteLine("comment = environment.AddComment();");
	}
	
	else if (parentObj.Class == id_Load)
	{
		docObj.WriteLine("comment = load.AddComment();");
	}
	
	else if (parentObj.Class == id_Acceleration)
	{
		docObj.WriteLine("comment = acceleration.AddComment();");
	}
	
	else if (parentObj.Class == id_Rotation)
	{
		docObj.WriteLine("comment = rotation.AddComment();");
	}
	
	else if (parentObj.Class == id_Support)
	{
		docObj.WriteLine("comment = support.AddComment();");
	}
	
	else if (parentObj.Class == id_AnswerSet)
	{
		docObj.WriteLine("comment = answerSet.AddComment();");
	}
	
	else if ((parentObj.Class == id_Result)||(parentObj.Class == id_ResultChart))
	{
		docObj.WriteLine("comment = result.AddComment();");
	}
	
	else if (parentObj.Class == id_StressSafetyTool)
	{
		docObj.WriteLine("comment = stressSafetyTool.AddComment();");
	}
	
	else if (parentObj.Class == id_Alert)
	{
		docObj.WriteLine("comment = alert.AddComment();");
	}
	
	else if (parentObj.Class == id_Convergence)
	{
		docObj.WriteLine("comment = convergence.AddComment();");
	}
	
	else if (parentObj.Class == id_FatigueTool)
	{
		docObj.WriteLine("comment = fatigueTool.AddComment();");
	}
	
	else if (parentObj.Class == id_FrequencyGroup)
	{
		docObj.WriteLine("comment = frequencyGroup.AddComment();");
	}
	
	else if (parentObj.Class == id_Template)
	{
		docObj.WriteLine("comment = template.AddComment();");
	}
	
	else if (parentObj.Class == id_TemplateOutput)
	{
		docObj.WriteLine("comment = output.AddComment();");
	}
	
	docObj.WriteLine("comment.Name = \"" + childObj.Name + "\";");
	docObj.WriteLine("comment.Text = \"" + childObj.Text + "\";");
}


function Figure(childObj, parentObj)
{
	if (parentObj.Class == id_Model)
	{
		docObj.WriteLine("figure = model.AddFigure();");
	}
	
	else if (parentObj.Class == id_Environment)
	{
		docObj.WriteLine("figure = environment.AddFigure();");
	}
	
	else if (parentObj.Class == id_AnswerSet)
	{
		docObj.WriteLine("figure = answerSet.AddFigure();");
	}
	
	else if (parentObj.Class == id_Result)
	{
		docObj.WriteLine("figure = result.AddFigure();");
	}
	
	else if (parentObj.Class == id_Support)
	{
		docObj.WriteLine("figure = support.AddFigure();");
	}
	
	else if (parentObj.Class == id_Load)
	{
		docObj.WriteLine("figure = load.AddFigure();");
	}
	
	else if (parentObj.Class == id_Acceleration)
	{
		docObj.WriteLine("figure = acceleration.AddFigure();");
	}
	
	else if (parentObj.Class == id_Rotation)
	{
		docObj.WriteLine("figure = rotation.AddFigure();");
	}
	
	else if (parentObj.Class == id_StressSafetyTool)
	{
		docObj.WriteLine("figure = stressSafetyTool.AddFigure();");
	}
	
	else if (parentObj.Class == id_FrequencyGroup)
	{
		docObj.WriteLine("figure = frequencyGroup.AddFigure();");
	}
	
	docObj.WriteLine("figure.Name = \"" + childObj.Name + "\";");
	docObj.WriteLine("figure.Text = \"" + childObj.Text + "\";");
}


function Alert(childObj, parentObj)
{
	if (parentObj.Class == id_Result)
	{
		docObj.WriteLine("alert = result.AddAlert(\"" + childObj.Criteria + "\");");
	}
	
	else if (parentObj.Class == id_FrequencyGroup)
	{
		docObj.WriteLine("alert = frequencyGroup.AddAlert(\"" + childObj.Criteria + "\";");
	}
	
	docObj.WriteLine("alert.Name = \"" + childObj.Name + "\";");
	docObj.WriteLine("alert.Criteria = " + childObj.Criteria + ";");
	docObj.WriteLine("alert.AlertValue = " + childObj.AlertValue + ";");
	
	var altKids = childObj.Children;
	var numAltKids = altKids.Count;
	
	for (var x = 1; x <= numAltKids; x++)
	{
		var altKid = altKids.Item(x);
		
		if (altKid.Class == id_Comment)
		{
			Comment(altKid, childObj);
		}
	}
}


function Convergence(childObj, parentObj)
{
	if (parentObj.Class == id_Result)
	{
		docObj.WriteLine("convergence = result.AddConvergence();");
	}
	
	docObj.WriteLine("convergence.Name = \"" + childObj.Name + "\";");
	docObj.WriteLine("convergence.Criteria = \"" + childObj.Criteria + "\";");
	docObj.WriteLine("convergence.TargetChange = " + childObj.TargetChange + ";");
	
	var convKids = childObj.Children;
	var numConvKids = convKids.Count;
	
	for (var y = 1; y <= numConvKids; y++)
	{
		var convKid = convKids.Item(y);
		
		if (convKid.Class == id_Comment)
		{
			Comment(convKid, childObj);
		}
	}
}


function Acceleration(childObj)
{
	docObj.WriteLine("acceleration = environment.AddCondition(141);");
	docObj.WriteLine("acceleration.Name = \"" + childObj.Name + "\";");
	docObj.WriteLine("acceleration.Suppressed = " + childObj.Suppressed + ";");
	docObj.WriteLine("acceleration.ComponentX = " + childObj.ComponentX + ";");
	docObj.WriteLine("acceleration.ComponentY = " + childObj.ComponentY + ";");
	docObj.WriteLine("acceleration.ComponentZ = " + childObj.ComponentZ + ";");
	 
	var accKids = childObj.Children;
	var numAccKids = accKids.Count;
	 
	for (var z = 1; z <= numAccKids; z++)
	{
		var accKid = accKids.Item(z);
		
		if (accKid.Class == id_Comment)
		{
			Comment(accKid, childObj);
		}
		
		else if (accKid.Class == id_Figure)
		{
			Figure(accKid, childObj);
		}
	}
}


function Rotation(childObj)
{
	docObj.WriteLine("rotation = environment.AddCondition(142);");
	docObj.WriteLine("rotation.Name = \"" + childObj.Name + "\";");
	docObj.WriteLine("rotation.Suppressed = " + childObj.Suppressed + ";");
	docObj.WriteLine("rotation.ComponentX = " + childObj.ComponentX + ";");
	docObj.WriteLine("rotation.ComponentY = " + childObj.ComponentY + ";");
	docObj.WriteLine("rotation.ComponentZ = " + childObj.ComponentZ + ";");
	docObj.WriteLine("rotation.LocationX = " + childObj.LocationX + ";");
	docObj.WriteLine("rotation.LocationY = " + childObj.LocationY + ";");
	docObj.WriteLine("rotation.LocationZ = " + childObj.LocationZ + ";");
	
	var rotKids = childObj.Children;
	var numRotKids = rotKids.Count;
	
	for (var a = 1; a <= numRotKids; a++)
	{
		var rotKid = rotKids.Item(a);
		
		if (rotKid.Class == id_Comment)
		{
			Comment(rotKid, childObj);
		}
		
		else if (rotKid.Class == id_Figure)
		{
			Figure(rotKid, childObj);
		}
	}
}


function Load(childObj)
{
	docObj.WriteLine("load = environment.AddLoad(SM, " + childObj.LoadType + ");");
	docObj.WriteLine("load.Name = \"" + childObj.Name + "\";");
	docObj.WriteLine("load.Magnitude = " + childObj.Magnitude + ";");
	docObj.WriteLine("load.TemperatureValue = " + childObj.TemperatureValue + ";");
	docObj.WriteLine("load.CoefficientType = " + childObj.CoefficientType + ";");    
	docObj.WriteLine("load.CoefficientValue = " + childObj.CoefficientValue + ";");

	if (childObj.CoefficientTable)
	{
	  docObj.WriteLine("load.CoefficientTable = " + childObj.CoefficientTable + ";");
	}

	if (childObj.CoefficientEvalType)
	{
	    docObj.WriteLine("load.CoefficientEvalType = " + childObj.CoefficientEvalType + ";");
	}

	if (childObj.ComponentX)
	{
	    docObj.WriteLine("load.ComponentX = " + childObj.ComponentX + ";");
	    docObj.WriteLine("load.ComponentY = " + childObj.ComponentY + ";");
	    docObj.WriteLine("load.ComponentZ = " + childObj.ComponentZ + ";");
	}

	docObj.WriteLine("load.LocationX = " + childObj.LocationX + ";");
	docObj.WriteLine("load.LocationY = " + childObj.LocationY + ";");
	docObj.WriteLine("load.LocationZ = " + childObj.LocationZ + ";");
	docObj.WriteLine("load.Suppressed = " + childObj.Suppressed + ";");
	
	var ldKids = childObj.Children;
	var numLDKids = ldKids.Count;
	
	for (var b = 1; b <= numLDKids; b++)
	{
		var ldKid = ldKids.Item(b);
		
		if (ldKid.Class == id_Comment)
		{
			Comment(ldKid, childObj);
		}
		
		else if (ldKid.Class == id_Figure)
		{
			Figure(ldKid, childObj);
		}
	}
}


function AnswerSet(childObj)
{
	docObj.WriteLine("answerSet.Name = \"" + childObj.Name + "\";");
	
	var asKids = childObj.Children;
	var numASKids = asKids.Count;
	
	for (var c = 1; c <= numASKids; c++)
	{
		var asKid = asKids.Item(c);
		
		if (asKid.Class == id_Result)
		{
			Result(asKid, childObj, c);
		}
		
		else if (asKid.Class == id_Comment)
		{
			Comment(asKid, childObj);
		}
		
		else if (asKid.Class == id_Figure)
		{
			Figure(asKid, childObj);
		}
		
		else if (asKid.Class == id_StressSafetyTool)
		{
			StressTool(asKid);
		}
		
		else if (asKid.Class == id_FrequencyGroup)
		{
			FrequencyGroup(asKid);
		}
		
		else if (asKid.Class == id_Template)
		{
			Template(asKid);
		}
	}
}


function Result(childObj, parentObj, index)
{
	if (parentObj.Class == id_AnswerSet)
	{
		docObj.WriteLine("result = answerSet.AddResult(SM, " + childObj.ResultType + ");");
	}
	
	else if (parentObj.Class == id_StressSafetyTool)
	{
		docObj.WriteLine("result = stressSafetyTool.AddResult(SM, " + childObj.ResultType + ");");
	}
	
	else if (parentObj.Class == id_FrequencyGroup)
	{
		docObj.WriteLine("result = frequencyGroup.Children.Item(" + index + ");");
	}
	
	docObj.WriteLine("result.Name = \"" + childObj.Name + "\";");
	docObj.WriteLine("result.TargetReduction = " + childObj.TargetReduction + ";");
	
	var resKids = childObj.Children;
	var numResKids = resKids.Count;
	
	for (var d = 1; d <= numResKids; d++)
	{
		var resKid = resKids.Item(d);
		
		if (resKid.Class == id_Comment)
		{
			Comment(resKid, childObj);
		}
		
		else if (resKid.Class == id_Figure)
		{
			Figure(resKid, childObj);
		}
		
		else if (resKid.Class == id_Convergence)
		{
			Convergence(resKid, childObj);
		}
		
		else if (resKid.Class == id_Alert)
		{
			Alert(resKid, childObj);
		}
	}
}

function StressTool(childObj)
{
	docObj.WriteLine("stressSafetyTool = answerSet.AddStressSafetyTool(" + childObj.SafetyTheory + ");");
	docObj.WriteLine("stressSafetyTool.Name = \"" + childObj.Name + "\";");
	docObj.WriteLine("stressSafetyTool.SafetyTheory = " + childObj.SafetyTheory + ";");
	docObj.WriteLine("stressSafetyTool.TensileLimitType = " + childObj.TensileLimitType + ";");
	docObj.WriteLine("stressSafetyTool.TensileLimit = " + childObj.TensileLimit + ";");
	docObj.WriteLine("stressSafetyTool.CompressiveLimitType = " + childObj.CompressiveLimitType + ";");
	docObj.WriteLine("stressSafetyTool.CompressiveLimit = " + childObj.CompressiveLimit + ";");
	docObj.WriteLine("stressSafetyTool.LimitFactor = " + childObj.LimitFactor + ";");
	
	var sstKids = childObj.Children;
	var numSSTKids = sstKids.Count;
	
	for (var e = 1; e <= numSSTKids; e++)
	{
		var sstKid = sstKids.Item(e);
		
		if (sstKid.Class == id_Comment)
		{
			Comment(sstKid, childObj);
		}
		
		else if (sstKid.Class == id_Figure)
		{
			Figure(sstKid, childObj);
		}
		
		else if (sstKid.Class == id_Result)
		{
			Result(sstKid, childObj,  e);
		}
	}
}

function FrequencyGroup(childObj)
{
	docObj.WriteLine("frequencyGroup = answerSet.AddFrequencyGroup();");
	docObj.WriteLine("frequencyGroup.Name = \"" + childObj.Name + "\";");
	docObj.WriteLine("frequencyGroup.NumberRequested = " + childObj.NumberRequested + ";");
	docObj.WriteLine("frequencyGroup.RangeLimitOn = " + childObj.RangeLimitOn + ";");
	docObj.WriteLine("frequencyGroup.MinFrequency = " + childObj.MinFrequency + ";");
	docObj.WriteLine("frequencyGroup.MaxFrequency = " + childObj.MaxFrequency + ";");
	
	var fgKids = childObj.Children;
	var numFGKids = fgKids.Count;
	
	for (var f = 1; f <= numFGKids; f++)
	{
		var fgKid = fgKids.Item(f);
		
		if (fgKid.Class == id_Comment)
		{
			Comment(fgKid, childObj);	
		}
		
		else if (fgKid.Class == id_Figure)
		{
			Figure(fgKid, childObj);
		}
		
		else if (fgKid.Class == id_Result)
		{
			Result(fgKid, childObj, f);
		}
	}
}


function FatigueTool(childObj)
{
	docObj.WriteLine("var fatigueTool = answerSet.AddFatigueTool();");
	docObj.WriteLine("fatigueTool.Name = \"" + childObj.Name + "\";");
	docObj.WriteLine("fatigueTool.EnduranceFactor = " + childObj.EnduranceFactor + ";");
	docObj.WriteLine("fatigueTool.LoadingType = " + childObj.LoadingType + ";");
	//docObj.WriteLine("fatigueTool.LoadingHistory = " + childObj.LoadingHistory + ";");
	docObj.WriteLine("fatigueTool.LoadingRatio = " + childObj.LoadingRatio + ";");
	docObj.WriteLine("fatigueTool.AnalysisType = " + childObj.AnalysisType + ";");
	docObj.WriteLine("fatigueTool.TemperatureEffects = " + childObj.TemperatureEffects + ";");
	//docObj.WriteLine("fatigueTool.DefaultTemperature = " + childObj.DefaultTemperature + ";");
	//docObj.WriteLine("fatigueTool.StressComponent = " + childObj.StressComponent + ";");
	
	var ftKids = childObj.Children;
	var numFTKids = ftKids.Count;
	
	for (var g = 1; g <= numFTKids; g++)
	{
		var ftKid = ftKids.Item(g);
		
		if (ftKid.Class == id_Comment)
		{
			Comment(ftKid, childObj);
		}
		
		else if (ftKid.Class == id_Result)
		{
			Result(ftKid, childObj, g);
		}
		
		else if (ftKid.Class == id_ResultChart)
		{
			ResultChart(ftKid);
		}
	}
}

function ResultChart(childObj)
{
	if (ftKid.Name == "Rainflow Matrix")
	{
	    docObj.WriteLine("result = fatigueTool.AddResult(SM, 64);");
	}

	else if (ftKid.Name == "Damage Matrix")
	{
	    docObj.WriteLine("result = fatigueTool.AddResult(SM, 65);");
	}

	else if (ftKid.Name == "Fatigue Sensitivity")
	{
	    docObj.WriteLine("result = fatigueTool.AddResult(SM, 66);");
	}
	
	docObj.WriteLine("result.Name = \"" + childObj.Name + "\";");
	
	var rcKids = childObj.Children;
	var numRCKids = rcKids.Count;
	
	for (var h = 1; h <= numRCKids; h++)
	{
		var rcKid = rcKids.Item(h);
		
		if (rcKid.Class == id_Comment)
		{
			Comment(rcKid, childObj);
		}
	}
}


function Template(childObj)
{
	var filename = childObj.FileName;

	var regExp = /\\/g;
	var newStr = filename.replace( regExp, "\\\\" );

	docObj.WriteLine("template = answerSet.AddTemplate(\"" + newStr + "\");");
	//docObj.WriteLine("template.FileName = \"" + newStr + "\";");
	docObj.WriteLine("template.Name = \"" + childObj.Name + "\";");
	docObj.WriteLine("var output = template.Output;");
	
	var tempKids = childObj.Children;
	var numTempKids = tempKids.Count;
	
	for (var i = 1; i <= numTempKids; i++)
	{
		var tempKid = tempKids.Item(i);
		
		if (tempKid.Class == id_Comment)
		{
			Comment(tempKid, childObj);
		}
		
		else if (tempKid.Class == id_TemplateOutput)
		{
			var outKids = tempKid.Comments;
			var numOutKids = outKids.Count;
			
			for (var j = 1; j <= numOutKids; j++)
			{
				var outKid = outKids.Item(j);
				
				Comment(outKid, tempKid);
			}
		}
	}
}


function Model(childObj)
{
	docObj.WriteLine("model.Name = \"" + childObj.Name + "\";");
	
	var modKids = childObj.Children;
	var numModKids = modKids.Count;
	
	for (var k = 1; k <= numModKids; k++)
	{
		var modKid = modKids.Item(k);
		
		if (modKid.Class == id_Comment)
		{
			Comment(modKid, childObj);
		}
		
		else if (modKid.Class == id_Figure)
		{
			Figure(modKid, childObj);
		}
		
		else if (modKid.Class == id_Environment)
		{
			Environment(modKid);
		}
	}
}


function Environment(childObj)
{
	docObj.WriteLine("environment.Name = \"" + childObj.Name + "\";");
	
	var envKids = childObj.Children;
	var numEnvKids = envKids.Count;
	
	for (var l = 1; l <= numEnvKids; l++)
	{
		var envKid = envKids.Item(l);
		
		if (envKid.Class == id_Comment)
		{
			Comment(envKid, childObj);
		}
		
		else if (envKid.Class == id_Figure)
		{
			Figure(envKid, childObj);
		}
		
		else if (envKid.Class == id_Load)
		{
			Load(envKid);
		}
		
		else if (envKid.Class == id_Support)
		{
			Support(envKid);
		}
		
		else if (envKid.Class == id_Acceleration)
		{
			Acceleration(envKid);
		}
		
		else if (envKid.Class == id_Rotation)
		{
			Rotation(envKid);
		}
		
		else if (envKid.Class == id_AnswerSet)
		{
			AnswerSet(envKid);
		}
	}
}