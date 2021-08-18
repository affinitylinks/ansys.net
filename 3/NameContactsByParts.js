main();

function main( )
{
    var branch = DS.Tree.FirstActiveBranch;
	if( !branch ) return;

	var contactRegions = branch.ContactRegions;
	var count = contactRegions.Count;
	var activeId = DS.Tree.FirstActiveObject.ID;

	for( var i=1; i<=count; i++)
	{
		var currentRegion = contactRegions(i);
		var newNameString = "";
		var sourceString = currentRegion.SourceName;
		var targetString = currentRegion.TargetName;
		newNameString = sourceString + " To " + targetString;
		currentRegion.Name = newNameString;
	}

	DS.Script.refreshTree();
	DS.Script.changeActiveObject( activeId );

}
