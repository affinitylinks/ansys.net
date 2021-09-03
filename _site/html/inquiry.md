---
title: Inquiry Functions
author: 'John Crawford'
description: 'Inquiry functions are similar to *GET functions, used to retreive information about the current database. These can be used in macros to automate procedures and obtain information in a simple manner'
tags:
  - html
  - undocumented
  - inquiry
---

## Introduction to Inquiry Functions

### _{{author}}_

[Inquiry Function Matrix](https://github.com/affinitylinks/ansys.net/blob/main/1/Inquiry_Matrix_Sheet_2005_10_11.pdf)

```md
Here is just about everything I know about inquiry functions. They are similar to \*GET functions in usage, and have two input arguments. Here's an example.

a=ndinqr(33,1)

In this case, "a" will be assigned a value of -1 if node 33 is unselected, 0 if it is undefined, and 1 if it is selected. This is an example of using an inquiry function to obtain information about a specific entity, in this case node 33.

An alternative use of an inquiry function is to find more generic data about a certain kind of entities. The following example illustrates this.

a=ndinqr(0,14)

This will assign to parameter "a" the highest node number defined in the model. Notice that the first argument is zero, and the second argument is 14.

Here are the inquiry functions I am aware of.

ndinqr(node,key) node number or zero, and key number
elmiqr(elem,key)
kpinqr(keypoint,key)
lsinqr(line,key)
arinqr(area,key)
vlinqr(volume,key)
rlinqr(real,key)
gapiqr(gap element,key)
masiqr(master DOF,key)
ceinqr(constraint equation,key)
cpinqr(coupled set,key)
csyiqr(coord system,key)
etyiqr(element type,key)
foriqr(nodal force,key)

All of these work pretty much the same, with the first argument used as either an entity ID number (for data about a specific node, element, etc.) or a zero if the information is about a class of element (number of selected nodes, etc.)

The key numbers are defined as follows.

key=1 return select status (for a specific entity)
key=12 return number of defined entities (KP's, nodes, etc.)
key=13 return number of selected entities
key=14 return the highest ID number in use

There a few other inquiry functions which have a slightly different format.

mpinqr(mat,prop,key) material property table number, property number, key additional key=3 for number of temps used in a specific property

dget(node,idof,kcmplx) node number, displacement pointer, complex key displacement pointers are...
1=ux, 2=uy, 3=uz, 4=rotx, 5=roty, 6=rotz, 7=ax, 8=ay 9=az, 10=vx, 11=vy, 12=vz, 19=pres, 20=temp, 21=volt, 22=mag, 23=enke, 24=ends, 25=emf, 26=curr
complex key=0 for real, 1 for imaginary

fget(node,idof,kcomplx) same definition as dget, but for forces this time.
Posted by John Crawford on 10.28.1997

Inquiry Functions for Sections
I have looked at the code and can confirm Tyllinen Juha's observation. It will work in 5.5, 5.6, and not likely to change.

"Quick testing seems to indicate that Section number would be available with sn = elmiqr(n,-4), where n is the element number. At least that is the way it worked in 5.5.1 with Beam188 and Beam189."

Other possibilites for element characteristics
-1, material number
-2, element type
-3, real constant number
-4, Element Section ID number
-5, coordinate system number
Posted by Grama Bhashyam on 10.29.1999

Useful Inquiry Functions

Nodes ndinqr(node,key)
node - node number, should be 0 for key = 12, 13, 14
key - information needed
= 1, return select status:
= 12, return number of defined nodes
= 13, return number of selected nodes
= 14, return highest node number defined
= -2, superelement flag
= -3, master degrees of freedom bit pattern
= -4, active degrees of freedom bit pattern
= -5, solid model attachment
= -6, pack nodal line parametric value
output arguments:
for key = 1
= 0, node is undefined.
= -1, node is unselected.
= 1, node is selected.

Element elmiqr(ielem,key)
ielem - element number, should be zero for key = 12, 13, or 14
key - information flag
= 1, return select status
= 12, return number of defined elements
= 13, return number of selected elements
= 14, return maximum element number used
= -1, material number
= -2, type.
= -3, real.
= -4, element section ID number
= -5, coordinate system number
= -7, solid model reference
output arguments:
for key = 1
= 0, element is undefined
= -1, element is unselected
= 1, element is selected

Keypoints kpinqr(kpid,key)
kpid - keypoint may be 0 for key = 12, 13, 14
key - information flag.
= 1, select
= 12, number of defined
= 13, number of selected
= 14, highest number defined
= -1, material number
= -2, type
= -3, real number
= -4, node number, if meshed
= -7, element number, if meshed
output arguments:
for key = 1
= -1, unselected
= 0, undefined
= 1, selected

Lines lsinqr(lsid,key)
lsid - line segment for inquire may be 0 for key = 12, 13, 14
key - item to be returned
= 1, select status
= 2, length (in model units)
= 12 number of defined
= 13, number of selected
= 14, highest number defined
= -1, material number
= -2, type
= -3, real number
= -4, number of nodes
= -5, esys number
= -6, number of elements
= -8, number of element divs in existing mesh
= -9, keypoint 1
= -10, keypoint 2
= -15, section id
= -16, number of element divs for next mesh
= -17, 0 = hard / 1 = soft NDIV
= -18, 0 = hard / 1 = soft SPACE

Area arinqr(areaid,key)
areaid - area for inquiry, may be 0 for key = 12, 13, 14
key - key to information needed about the areaid
= 1, return select status
= 12, return number of defined
= 13, return number of selected
= 14, return highest number defined
= -1, return material
= -2, return type
= -3, return real
= -4, return number of nodes
= -6, return number of elements
= -7, return pointer to area in foreign db
= -8, return element shape
= -9, return mid-node element key
= -10, return element coordinate system
= -11, return area constraint information
output arguments:
for key = 1
= 0, areaid is undefined
= -1, areaid is unselected
= 1, areaid is selected
for key = - 11
= 0, no constraint on this area
= 1, symmetry constraint
= 2, anti-symmetry
= 3, both symmetry and anti-symmetry

Volumes vlinqr(vnmi,key)
vnmi - volume for inquiry, may be 0 for key = 12, 13, 14
key - information flag
= 1, return select status
= 12, return number of defined
= 13, return number of selected
= 14, return highest number defined
= -1, material
= -2, type
= -3, real
= -4, number of nodes
= -6, number of elements
= -8, element shape
= -9, mid-node element key
= -10, element coordinate system
output arguments:
for key = 1
= 0, node is undefined
= -1, node is unselected
= 1, node is selected

= 0, real constant table is undefined.
= -1, real constant table is unselected.
= 1, real constant table is selected

Element Type etyiqr(itype,key)
itype - element type number, should be 0 for key = 12 and 14
key - item to be returned
= 1, return select status:
= 12, return number of defined element types
= 14, return highest element type number defined
output arguments:
for key = 1
= 0, element type is undefined
= -1, element type is unselected
= 1, element type is selected

Real Constants rlinqr(nreal,key)
nreal - real constant table number, should be 0 for key = 12, 13, 14
key - information flag
= 1, select status
= 12, number of defined real constant tables
= 13, number of selected real constant tables
= 14, highest real constant table defined
output arguments:
for key = 1
= 0, real constant table is undefined.
= -1, real constant table is unselected.
= 1, real constant table is selected

Section Table sectinqr(nsect,key)
nsect - section id table number, should be 0 for key = 12, 13, 14
key - information flag
= 1, select status
= 12, return number of defined section id tables
= 13, return number of selected section id tables
= 14, return highest section id table defined
output arguments:
for key = 1
= 0, section id table is undefined.
= -1, section id table is unselected.
= 1, section id table is selected

Materials mpinqr(mat,iprop,key)
mat - material number, should be 0 for key = 12 and 14
iprop - property reference number
iprop = 0, test for existence of any material property with this material number (with key = 1)
key - key as to the information needed about material property
= 1, return select status:
= 12, number of defined material properties
= 14, highest material property number defined
output arguments:
for key = 1, iprop = 0 (test for existence of any material property with this material number)
EX = 1, EY = 2, EZ = 3, NUXY = 4, NUYZ = 5, NUXZ = 6, GXY = 7, GYZ = 8, GXZ = 9, ALPX = 10, ALPY = 11, ALPZ = 12, DENS = 13, MU =14, DAMP = 15, KXX = 16, KYY = 17, KZZ = 18, RSVX = 19, RSVY = 20, RSVZ = 21, C = 22, HF =23, VISC = 24, EMIS = 25, ENTH = 26, LSST = 27, PRXY = 28, PRYZ = 29, PRXZ = 30, MURX = 31, MURY = 32, MURZ = 33, PERX = 34, PERY = 35, PERZ = 36, MGXX = 37, MGYY = 38, MGZZ = 39, EGXX = 40, EGYY = 41, EGZZ = 42, TGXX = 43, TGYY = 44, TGZZ = 45, SONC = 46, SLIM = 47, ELIM = 48, ORTH = 54, CABL = 55, RIGI = 56, HGLS = 57, BM = 58, QRAT = 59, REFT = 60, PLAS = 61, CREE = 62, FAIL = 63, BH = 64, PIEZ = 65, SWEL = 66, WATE = 67, CONC = 68, PFLO = 69, ANEL = 70, ACOU = 71, EVIS = 72, USER = 73, NL = 74, HYPE = 75, NNEW = 76, MOON = 77, OGDE = 78, SUTH = 79, WIND = 80
for key = 1 (otherwise)
= 0, material prop is undefined
= 1, material prop is selected

Constraint Equations ceinqr(ceid,key)
ceid - constraint equation number
key - inquiry key, should be zero for key = 12, 13, 14
= 1, return select status
= 1, equation is selected
= 0, equation is undefined
= -1, equation is unselected
= 12, return number of defined constraint equations
= 13, return number of selected constraint equations
= 14, return number of highest numbered constraint equation defined
= -1, return master degrees of freedom for this equation

Couples cpinqr(cpid,key)
cpid - coupled set number
key - inquiry key, should be zero for key = 12, 13, 14
= 1, return select status
= 12, return number of defined coupled sets
= 13, return number of selected coupled sets
= 14, return the number of the highest numbered coupled set
output arguments:
for key = 1
= 1, coupled set is selected
= 0, coupled set in undefined
= -1, coupled set in unseleted

Coordinate System csyiqr(csysid,key)
csysid - coordinate system reference number, should be zero for key = 12 or 14
key - information flag.
= 1, return status:
= 12, number of defined coordinate systems
= 14, maximum coordinate system reference number used.
output arguments:
for key = 1
= 0, coordinate system is not defined
= -1, coordinate system is not selected
= 1, coordinate system is selected

Warning and Error Messages erinqr(key)
key - item to be returned
= 3, total number of notes displayed
= 4, total number of warnings displayed
= 5, total number of errors displayed
= 6, total number of fatals displayed
Posted by John Crawford on 10.10.2000

Inquiry Function for Next Available Number
I've discovered that **inqr(0,16) or \***iqr(0,16) returns the next available number. For example, if areas 1, 2, and 3 exist in the model, then arinqr(0,16) returns a value of 4. However, if only areas 2 and 3 exist in the model, then arinqr(0,16) returns a value of 1.
Posted by Jeff Strain on 11.23.2004

Scratch Memory Inquiry
meminqr(-3007) gets scratch memory in use (in bytes).
Posted by Sheldon Imaoka on 12.06.2004

Inquiry Function Matrix
See also handy, printable Inquiry Function Matrix
Posted by Sheldon Imaoka on 02.03.2005

Additional Line Inquiry Functions
Lines:

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
loopid – loop number
key – 1 for number of loops when loopid is zero, or 2 for number of lines in loopid
e.g.: arliqr(53,0,1) = number of loops in area 53
arliqr(53,1,2) = number of lines in loop 1 of area 53
arliqr(53,2,2) = number of lines in loop 2 of area 53
arliqr(53,3,2) = number of lines in loop 3 of area 53
```
