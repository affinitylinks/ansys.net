/****  This file determines if the displacement for a total deformation result is greater
than 1/10 of the diagonal of the geometry's bounding box.  If it is greater, a comment is
added to the "solution" node of the tree.  The comment will tell how much greater than the
diagonal of the bounding box the displacement is.    ****/


//get the active branches
var branches = DS.Tree.ActiveBranches;
var numBranches = branches.Count;

var date = new Date;
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
			results = branch.results;
			numResults = results.Count;
			//Determine the diagonal of the bounding box
			var diagonal = GetBoundingBoxDiagonal(branch.PrototypeGroup);
			var found = false;
			//for each result, determine if it's type is total deformation
			for(j=1; j<=numResults; j++)
			{
				curResult = results(j);
				//if the type is not total deformation, continue to the next result
				if(curResult.ResultType != 25)  //25 is the result type value for total def. 
					continue;
				else
				{
					found = true;
					if(curResult.Maximum > (0.1 * diagonal))
					{
						//if the displacement is greater, determine how much and write the message
						var x = curResult.Maximum/diagonal;
						x = parseInt(x*100)/100;  //show only 3 decimal places
						message = message + date + "<br><br>";
						message = message + "Warning: Displacement for " + curResult.Name + " is " + x + " times the diagonal of the bounding box<br>" ;
						message = message + "Possible rigid body motion or large deformation<br>";
					}
				}
			}
			
			if(found == false)
			{
				message = message + date + "<br><br>";
				message = message + "No total deformation results are present";
			}
			if(message == "")
			{
				message = message + date + "<br><br>";
				message = message + "All displacements are normal";
			}
	
			var solution = branch.AnswerSet;	
			//insert the comment					
			if(solution && message != "")
			{
				var comment = solution.AddComment();
				comment.Name = "Engineering Checker";
				comment.Text = message;
				scriptcode.fillTree();
				var selectComment = scriptcode.findItem(comment.ID);
				TreeView.SelectedItem = selectComment;
			}
		}	//end if(branch)
	}	//end for(branches)
}	//end if(branches)

function GetBoundingBoxDiagonal(prototypes)
{
	var x = prototypes.BoundingBoxLengthX;
	var y = prototypes.BoundingBoxLengthY;
	var z = prototypes.BoundingBoxLengthZ;
	
	var bounding = Math.sqrt(x*x + y*y + z*z);
	return bounding;
}