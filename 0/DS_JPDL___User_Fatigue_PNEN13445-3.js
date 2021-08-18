/******************************************************************
* Name	: DS_JPDL_UserFatigue_PNEN13445-3
*         Macro solves fatigue according to pressure vessel code PN EN 13445-3
* ANSYS : ANSYS Professional v13.0
* Date	: 05.04.2011r.
* Ver   : 1.2.0
* Autor	: psiedlaczek@mesco.com.pl 
* Notes	: 
*		You need edit the Rm and fu for your design inside macro code
*		Material Rm = 390 
*		fu = 0.67
/******************************************************************/
 
	var sm = DS.SelectionManager;
	var branch = DS.Tree.FirstActiveBranch;
	var curModel = branch.Model;
	var answerset = curModel.Environments(1).AnswerSet

// curModel.Environments(1).AnswerSet.UpdateFEData();
// var result = answerset.AddResult(sm, ds.script.id_CustomResult);
	
// s1_1: 
	result = answerset.AddCustomResult(sm);		
	result.Expression = "s1";
	result.Name = "JPDL_S1_1";
	result.Identifier = "s1_1";
	result.ResultAveraging = 0;
	result.DisplayTime = 1;

// s1_2: 
	result = answerset.AddCustomResult(sm);		
	result.Expression = "s1";
	result.Name = "JPDL_S1_2";
	result.Identifier = "s1_2";
	result.ResultAveraging = 0;
	result.DisplayTime = 2;
	
// s2_1: 
	result = answerset.AddCustomResult(sm);		
	result.Expression = "s2";
	result.Name = "JPDL_S2_1";
	result.Identifier = "s2_1";
	result.ResultAveraging = 0;
	result.DisplayTime = 1;
	
// s2_2: 
	result = answerset.AddCustomResult(sm);		
	result.Expression = "s2";
	result.Name = "JPDL_S2_2";
	result.Identifier = "s2_2";
	result.ResultAveraging = 0;
	result.DisplayTime = 2;

// s3_1: 
	result = answerset.AddCustomResult(sm);		
	result.Expression = "s3";
	result.Name = "JPDL_S3_1";
	result.Identifier = "s3_1";
	result.ResultAveraging = 0;
	result.DisplayTime = 1;

// s3_2: 
	result = answerset.AddCustomResult(sm);		
	result.Expression = "s3";
	result.Name = "JPDL_s3_2";
	result.Identifier = "s3_2";
	result.ResultAveraging = 0;
	result.DisplayTime = 2;

// TRESCA RANGE 1 2: 
	result = answerset.AddCustomResult(sm);		
	result.Expression = "max(abs((s1_1-s1_2)-(s2_1-s2_2)),abs((s2_1-s2_2)-(s3_1-s3_2)),abs((s3_1-s3_2)-(s1_1-s1_2)))";
	result.Name = "JPDL_tresca_range";
	result.Identifier = "_DSeqR";
	result.ResultAveraging = 0;
	
// TRESCA: 
	result = answerset.AddCustomResult(sm);	
	result.Expression = "max(abs(s1-s2),abs(s2-s3),abs(s3-s1))";
	result.Name = "JPDL_tresca";
	result.Identifier = "_DSeq";
	result.ResultAveraging = 0;
	result.DisplayTime = 1;
	
// I: 
	result = answerset.AddCustomResult(sm);
	result.Expression = "seqv/seqv";
	result.Name = "JPDL_I";
	result.Identifier = "I";
	result.ResultAveraging = 0;

// LIFE: 
	result = answerset.AddCustomResult(sm);
	// "         LIFE EN:13445= (46000*I/(_DSeq/fu-0.63*Rm+11.5))^2
	// result.Expression = "min((46000*I/((max(_DSeq,70*I)/(0.67))-0.63*157+11.5))^2,2E6*I)";
	result.Expression = "min((46000*I/(max(_Seq,150*I)/(0.67*I)-0.63*390+11.5))^2,1E7*I)";
	
	// Material Rm = 390 
    // fu = 0.67
	
	result.Name = "JPDL_LIFE";
	result.Identifier = "LIFE";
	result.ResultAveraging = 0;
	result = answerset.AddCustomResult(sm);
// LIFE: 
	// "         LIFE EN:13445= (46000*I/(_DSeq/fu-0.63*Rm+11.5))^2
	// result.Expression = "min((46000*I/((max(_DSeqR,70*I)/(0.67))-0.63*157+11.5))^2,2E6*I)";
	result.Expression = "min((46000*I/(max(_Seq,150*I)/(0.67*I)-0.63*390+11.5))^2,1E7*I)";
	result.Name = "JPDL_LIFE_R";
	result.Identifier = "LIFER";
	result.ResultAveraging = 0;
		
DS.Script.fillTree();