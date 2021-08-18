// setLegend.js
//
// Set the min/max on the legend for the selected result
// and display new contours. Note this macro only works if
// the selected object in the tree is a result.
//

var prefs = DS.Graphics.ResultPrefs;

if (prefs)
{
prefs.min = 300000; // put in your min here
prefs.max = 8.0e6; // put in you max here

prefs.Update();

DS.Graphics.Redraw(1);
}
