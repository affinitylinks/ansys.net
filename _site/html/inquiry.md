---
title: Inquiry Functions
url: '/html/inquiry'
description: 'list of some undocumented inquiry functions'
tags:
  - html
  - undocumented
  - inquiry
---

# Introduction to Inquiry Functions

Here is just about everything I know about inquiry functions. They are
similar to \*GET functions in usage, and have two input arguments.
Here's an example.

a=ndinqr(33,1)

In this case, "a" will be assigned a value of -1 if node 33 is unselected,
0 if it is undefined, and 1 if it is selected. This is an example of
using an inquiry function to obtain information about a specific entity,
in this case node 33.

An alternative use of an inquiry function is to find more generic data
about a certain kind of entities. The following example illustrates
this.

a=ndinqr(0,14)

This will assign to parameter "a" the highest node number defined in the
model. Notice that the first argument is zero, and the second argument
is 14.

Here are the inquiry functions I am aware of.

- ndinqr(node,key) node number or zero, and key number
- elmiqr(elem,key)
- kpinqr(keypoint,key)
- lsinqr(line,key)
- arinqr(area,key)
- vlinqr(volume,key)
- rlinqr(real,key)
- gapiqr(gap element,key)
- masiqr(master DOF,key)
- ceinqr(constraint equation,key)
- cpinqr(coupled set,key)
- csyiqr(coord system,key)
- etyiqr(element type,key)
- foriqr(nodal force,key)

All of these work pretty much the same, with the first argument used as
either an entity ID number (for data about a specific node, element,
etc.) or a zero if the information is about a class of element (number
of selected nodes, etc.)

The key numbers are defined as follows.

- key=1 return select status (for a specific entity)
- key=12 return number of defined entities (KP's, nodes, etc.)
- key=13 return number of selected entities
- key=14 return the highest ID number in use

There a few other inquiry functions which have a slightly different format.

mpinqr(mat,prop,key) material property table number, property number, key

additional key=3 for number of temps used in a specific property

dget(node,idof,kcmplx) node number, displacement pointer, complex key

displacement pointers are...

1=ux, 2=uy, 3=uz, 4=rotx, 5=roty, 6=rotz, 7=ax, 8=ay

9=az, 10=vx, 11=vy, 12=vz, 19=pres, 20=temp, 21=volt,

22=mag, 23=enke, 24=ends, 25=emf, 26=curr

complex key=0 for real, 1 for imaginary

fget(node,idof,kcomplx) same definition as dget, but for forces this time.

        Posted by John Crawford on 10.28.1997

        Inquiry Functions for Sections

I have looked at the code and can confirm Tyllinen Juha's observation. It will work in 5.5, 5.6, and not likely to change

"Quick testing seems to indicate that Section number would be available with sn = elmiqr(n,-4), where n is the element number. At least that is the way it worked in 5.5.1 with Beam188 and Beam189.

Other possibilites for element characteristics

- -1, material number
- -2, element type
- -3, real constant number
- -4, Element Section ID number
- -5, coordinate system number

      </td>

    </tr>
    <tr>
      <td width="5%">&nbsp;</td>
      <td class="commentfooter" align="right">
        Posted by Grama Bhashyam on 10.29.1999
      </td>
    </tr>
    <tr><td colspan="2">&nbsp;</td></tr>
    <tr>
      <td class="maintitle" colspan="2">
        <a name="225">Useful Inquiry Functions</a>
      </td>
    </tr>
    <tr>
      <td width="5%">&nbsp;</td>
      <td class="mainbody">
        <table cellspacing="0" cellpadding="3" border="0">

<tbody><tr valign="top">
<td align="left"><b>Nodes</b></td>
<td colspan="2" align="left"><i>ndinqr(node,key) </i></td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">node - node number, should be 0 for key = 12, 13, 14</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">key - information needed</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, return select status: </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 12, return number of defined nodes </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 13, return number of selected nodes </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 14, return highest node number defined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -2, superelement flag </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -3, master degrees of freedom bit pattern </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -4, active degrees of freedom bit pattern </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -5, solid model attachment </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -6, pack nodal line parametric value</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">output arguments:</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="left">for&nbsp;key&nbsp;=&nbsp;1</td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 0, node is undefined. </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="left">                             </td>
<td align="left">= -1, node is unselected. </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="left">                             </td>
<td align="left">= 1, node is selected. </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="left"><b>Element</b></td>
<td colspan="2" align="left"><i>elmiqr(ielem,key) </i></td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">ielem - element number, should be zero for key = 12, 13, or 14 </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">key - information flag</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, return select status</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="left"> </td>
<td align="left">= 12, return number of defined elements </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 13, return number of selected elements</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 14, return maximum element number used </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, material number</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -2, type. </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="left"> </td>
<td align="left">= -3, real. </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -4, element section ID number</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -5, coordinate system number</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -7, solid model reference</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">output arguments:</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">for key = 1</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 0, element is undefined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, element is unselected </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, element is selected</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="left"><b>Keypoints</b></td>
<td colspan="2" align="left"><i>kpinqr(kpid,key)</i></td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">kpid - keypoint may be 0 for key = 12, 13, 14 </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">key - information flag. </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, select </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 12, number of defined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 13, number of selected </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 14, highest number defined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, material number </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -2, type </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -3, real number </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -4, node number, if meshed </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -7, element number, if meshed</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">output arguments:</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">for key = 1</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, unselected </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">=  0, undefined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">=  1, selected </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="left"><b>Lines</b></td>
<td colspan="2" align="left"><i>lsinqr(lsid,key)                                    </i></td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">lsid - line segment for inquire may be 0 for key = 12, 13, 14 </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">key - item to be returned</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, select status</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 2, length (in model units)</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 12 number of defined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 13, number of selected </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 14, highest number defined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, material number </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -2, type </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -3, real number </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -4, number of nodes </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -5, esys number </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -6, number of elements </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -8, number of element divs in existing mesh </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -9, keypoint 1 </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -10, keypoint 2 </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -15, section id </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -16, number of element divs for next mesh </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -17, 0 = hard / 1 = soft NDIV </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -18, 0 = hard / 1 = soft SPACE </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="left"><b>Area</b></td>
<td colspan="2" align="left"><i>arinqr(areaid,key)</i></td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">areaid - area for inquiry, may be 0 for key = 12, 13, 14</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">key - key to information needed about the areaid</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, return select status</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 12, return number of defined</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 13, return number of selected</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 14, return highest number defined</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, return material</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -2, return type</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -3, return real</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -4, return number of nodes</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -6, return number of elements</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -7, return pointer to area in foreign db </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -8, return element shape</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -9, return mid-node element key</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -10, return element coordinate system</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -11, return area constraint information</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">output arguments: </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">for key = 1   </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 0, areaid is undefined</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, areaid is unselected</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, areaid is selected</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">for key = - 11  </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 0, no constraint on this area</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, symmetry constraint</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 2, anti-symmetry </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 3, both symmetry and anti-symmetry</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="left"><b>Volumes</b></td>
<td colspan="2" align="left"><i>vlinqr(vnmi,key) </i></td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">vnmi - volume for inquiry, may be 0 for key = 12, 13, 14</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">key - information flag</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, return select status</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 12, return number of defined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 13, return number of selected </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 14, return highest number defined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, material </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -2, type</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -3, real</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -4, number of nodes</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -6, number of elements</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -8, element shape</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -9, mid-node element key</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -10, element coordinate system </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">output arguments:</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">for key = 1</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 0, node is undefined</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, node is unselected</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, node is selected</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 0, real constant table is undefined. </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, real constant table is unselected. </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, real constant table is selected </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="left"><b>Element Type</b></td>
<td colspan="2" align="left"><i>etyiqr(itype,key) </i></td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">itype - element type number, should be 0 for key = 12 and 14 </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">key - item to be returned</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, return select status: </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 12, return number of defined element types </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 14, return highest element type number defined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">output arguments:</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">for key = 1</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 0, element type is undefined</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, element type is unselected</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, element type is selected</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="left"><b>Real Constants</b></td>
<td colspan="2" align="left"><i>rlinqr(nreal,key) </i></td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">nreal - real constant table number, should be 0 for key = 12,  13, 14 </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">key - information flag </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, select status </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 12, number of defined real constant tables </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 13, number of selected real constant tables </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 14, highest real constant table defined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">output arguments:</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">for key = 1</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 0, real constant table is undefined. </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, real constant table is unselected. </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, real constant table is selected </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="left"><b>Section Table</b></td>
<td colspan="2" align="left"><i>sectinqr(nsect,key) </i></td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">nsect - section id table number, should be 0 for key = 12, 13, 14 </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">key - information flag            </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, select status </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 12, return number of defined section id tables </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 13, return number of selected section id tables </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 14, return highest section id table defined</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">output arguments:</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">for key = 1</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 0, section id table is undefined. </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, section id table is unselected. </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, section id table is selected </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="left"><b>Materials</b></td>
<td colspan="2" align="left"><i>mpinqr(mat,iprop,key) </i></td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">mat - material number, should be 0 for key = 12 and 14 </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">iprop - property reference number</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">iprop = 0, test for existence of any material property with this material number (with key = 1) </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">key - key as to the information needed about material property</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, return select status: </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 12, number of defined material properties</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 14, highest material property number defined</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">output arguments:</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">for key = 1, iprop = 0 (test for existence of any material property with this material number)</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">EX = 1, EY = 2, EZ = 3, NUXY = 4, NUYZ = 5, NUXZ = 6,
GXY = 7, GYZ = 8, GXZ = 9, ALPX = 10, ALPY = 11, ALPZ = 12, DENS = 13,
MU =14, DAMP = 15, KXX = 16, KYY = 17, KZZ = 18, RSVX = 19, RSVY = 20,
RSVZ = 21, C = 22, HF =23, VISC = 24, EMIS = 25, ENTH = 26, LSST = 27,
PRXY = 28, PRYZ = 29, PRXZ = 30, MURX = 31, MURY = 32, MURZ = 33, PERX =
 34, PERY = 35, PERZ = 36, MGXX = 37, MGYY = 38, MGZZ = 39, EGXX = 40,
EGYY = 41, EGZZ = 42, TGXX = 43, TGYY = 44, TGZZ = 45, SONC = 46, SLIM =
 47, ELIM = 48, ORTH = 54, CABL = 55, RIGI = 56, HGLS = 57, BM = 58,
QRAT = 59, REFT = 60, PLAS = 61, CREE = 62, FAIL = 63, BH = 64, PIEZ =
65, SWEL = 66, WATE = 67, CONC = 68, PFLO = 69, ANEL = 70, ACOU = 71,
EVIS = 72, USER = 73, NL = 74, HYPE = 75, NNEW = 76, MOON = 77, OGDE =
78, SUTH = 79, WIND = 80</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">for key = 1 (otherwise)</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 0, material prop is undefined</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, material prop is selected</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="left"><b>Constraint Equations</b></td>
<td colspan="2" align="left"><i>ceinqr(ceid,key) </i></td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">ceid - constraint equation number </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">key - inquiry key, should be zero for key = 12, 13, 14 </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="left">            </td>
<td align="left">= 1, return select status </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, equation is selected </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 0, equation is undefined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, equation is unselected </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 12, return number of defined constraint equations </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 13, return number of selected constraint equations </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 14, return number of highest numbered constraint equation defined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, return master degrees of freedom for this equation </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="left"> </td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="left"><b>Couples</b></td>
<td colspan="2" align="left"><i>cpinqr(cpid,key) </i></td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">cpid - coupled set number</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">key - inquiry key, should be zero for key = 12, 13, 14 </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, return select status </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 12, return number of defined coupled sets </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="left">                </td>
<td align="left">= 13, return number of selected coupled sets </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="left">                </td>
<td align="left">= 14, return the number of the highest numbered coupled set </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">output arguments:</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">for key = 1</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, coupled set is selected </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 0, coupled set in undefined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, coupled set in unseleted </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="left"><b>Coordinate System</b></td>
<td colspan="2" align="left"><i>csyiqr(csysid,key) </i></td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">csysid - coordinate system reference number, should be zero for key = 12 or 14</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">key - information flag. </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, return status: </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="left"> </td>
<td align="left">= 12, number of defined coordinate systems </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 14, maximum coordinate system reference number used.</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">output arguments:</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">for key = 1</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 0, coordinate system is not defined </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= -1, coordinate system is not selected </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 1, coordinate system is selected</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr valign="top">
<td align="left"><b>Warning and Error Messages</b></td>
<td colspan="2" align="left"><i>erinqr(key)</i></td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td colspan="2" align="left">key - item to be returned </td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 3, total number of notes displayed</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 4, total number of warnings displayed</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 5, total number of errors displayed</td>
</tr>
<tr valign="top">
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="left">= 6, total number of fatals displayed</td>
</tr>
</tbody></table>

Posted by John Crawford on 10.10.2000

Inquiry Function for Next Available Number

I've discovered that **inqr(0,16) or \***iqr(0,16) returns the next available number. For example, if areas 1, 2, and 3 exist in the model, then arinqr(0,16) returns a value of 4. However, if only areas 2 and 3 exist in the model, then arinqr(0,16) returns a value of 1.

Posted by Jeff Strain on 11.23.2004

Scratch Memory Inquiry

meminqr(-3007) gets scratch memory in use (in bytes).

Posted by Sheldon Imaoka on 12.06.2004

Inquiry Function Matrix

Posted by Sheldon Imaoka on 02.03.2005

Additional Line Inquiry Functions

Lines

lsinqr(lsid,key)

lsid - line segment for inquire may be 0 for key = 12, 13, 14

key - item to be returned

= -13, orientation keypoint KPB

= -14, orientation keypoint KPE

Posted by Bram Weisman on 08.30.2008

Real constant inquiry function

RLINQR(NREAL,5) would return the REAL set width (number of fields).

Posted by Bram Weisman on 09.10.2008

Number of line loops in area

Area Line Loops

arliqr(areaid,loopid,key)

areaid - area for inquiry

loopid - loop number

key - 1 for number of loops when loopid is zero, or 2 for number of lines in loopid

e.g.: arliqr(53,0,1) = number of loops in area 53

arliqr(53,1,2) = number of lines in loop 1 of area 53

arliqr(53,2,2) = number of lines in loop 2 of area 53

arliqr(53,3,2) = number of lines in loop 3 of area 53

Posted by Bram Weisman on 04.13.2015

ANSYS, ANSYS Workbench, Ansoft, AUTODYN, CFX, EKM, Engineering
Knowledge Manager, FLUENT, HFSS and any and all ANSYS, Inc. brand,
product, service and feature names, logos and slogans are trademarks or
registered trademarks of ANSYS, Inc. or its subsidiaries located in the
United States or other countries. ICEM CFD is a trademark used by ANSYS,
Inc. under license. CFX is a trademark of Sony Corporation in Japan.
All other brand, product, service and feature names or trademarks are
the property of their respective owners.
