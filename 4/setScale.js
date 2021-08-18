// setScale.js
//
// Simple js to set the scaling
//
// Undeformed = 0
// Actual = 1
// Auto = -1
// 0.5:1 Auto = -0.5
// 2:1 Auto = -2
// ...hopefully you get the idea...

var prefs = DS.Graphics.ResultPrefs;

if (prefs) {
  // -3 = auto scaling of 3
  prefs.deformedScale = -3.;

  prefs.Update();

  DS.Graphics.Redraw(1);
}
