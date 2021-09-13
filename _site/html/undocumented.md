---
title: Undocumented Features
author: 'ansys.net'
description: 'Undocumented commands & features'
tags:
  - html
  - undocumented
---

## {{ title }}

### _({{ author }})_

Undocumented commands & features are not guaranteed or supported by ANSYS or the ASDs (they also do not have error reports associated with them), but they are sometimes quite useful. Please use at your own risk. Undocumented commands are collected from ASD websites, ANSYS, Inc., and XANSYS mailing List (esp. John Crawford and John Swanson's contributions), and the author's own findings.

Some of these commands are present in later versions of ANSYS (e.g., ANSYS 5.6, 5.7). Others are "old" legacy commands which became undocumented in subsequent versions of ANSYS. Additional reasons why commands are undocumented: (a) The feature is either untested or insufficiently tested due to time constraints, (b) The feature has been tested but did not pass sufficiently to warrant release, (c) KEYOPTs, program options, etc. that are requested by specific users but are not deemed useful to the general user community are sometimes included without general release, (d) Features that are "unsupportable" and minimally tested, (e) Options risky to the user (CNVR,,,,,,,-1 for example), (f) Partially completed items that are still "buggy" but of use in a limited sense for experimental Beta testing by select customers. [Taken from ANSYS, Inc.]

Notes are added to indicate revisions which were verified by the author or others, but this does not necessarily mean that the command is only applicable to a particular revision unless stated as such.

## APDL Commands

### \_BUTTON

```txt
Hidden parameter _Button can be used to test whether the user chose OK or Cancel within a MULTIPRO box, but its usefulness probably does not extend to testing actions with other boxes. This is because there are cases where OK can return a 1, the same as cancel.

For example, suppose you want to prompt the end-user to pick some areas, so you write:
ASEL,R,P
*IF,_BUTTON,EQ,0,THEN
...
The problem with this technique is if the user is inclined to use the Apply button (or MMB), and then follow with OK to close the picking dialog, then _BUTTON will equal 1.

As a point of trivia, _BUTTON equals 2 after Apply is pressed, but this cannot be tested in an APDL macro, since the test will not be executed until the dialog is closed with OK, Cancel or Pick All. The Reset button does not appear to modify _BUTTON
```

### \*DEL

```txt
*del,array,,NOPR
Silently deletes an array using undocumented "NOPR" argument.
```

### \*DOWHILE

```txt
*DOWHILE,parm
*DOWHILE is similar to *DO and performs the commands bracketed by *ENDDO. *DOWHILE,Parm command loops repeatedly through the next *ENDDO command as long as Parm is true (greater than zero).
[STI: This is for 6.0]
```

### \*GET,,COMMON

```txt
*get,parm,COMMON,,d3com2,,int,31
Gets the status of /UIS,MSGPOP. When writing macros you sometimes don't want those pesky warning messages to pop up all the time, so you use /uis,msgpop,3 to suppress them and put them back on with /uis,msgpop,0. The problem is if your macro is called by a macro that changed the msgpop status, then you kind of mess stuff up. The answer is to get the msgpop status before you change it then set it back.

Example usage:
*get,_oldMPS,COMMON,,d3com2,,int,31
/uis,msgpop,3
! Do my stuff
! ...
! ...
! ...
! Done with the stuff I want to suppress messages on
/uis,msgpop,_oldMPS
```

### \*GET,,PARM

```txt
*GET,Parm,PARM,ARnn,ARTYPE
At 5.6.1, this returns the type of the ARxx parameter, not the type of the variable which ARnn is pointing to.
```

### \*MOPER

```txt
*MOPER,ResVal(1,1),ResXYZ(1,1),MAP,InVal(1,1),InXYZ(1,1),kDim
kDim = 2, 2d (shell) 3, 3d (solid)
ANSYS 5.7 has a MAP option which will:
Given: A set of points InXYZ(nPt,3) and a value(s) InVal(nPt,nVal) at each point
A second Set of points ResXYZ(nOut,3), contained within the geometry of the first set of points.
Determine the value(s) ResVal(nOut,nVal) at each point in the second set.

*MOPER,ResVal(1,1),ResXYZ(1,1),MAP,InVal(1,1),InXYZ(1,1),kDim,Ratio,kOut
Ratio = MaxElSize/MaxGridDim of input data (auto default) (was 0.10 default)
kOut = 0, use closest point values 1, zero if ouside
"Here is the propose new description of the MAP option on *MOPER. The changes are:
Ratio will have an automatic default as recommended, based on the number of points. Field 8 is the Ration field (field 1 is the \*MOPER command).
kOut is a proposed new option. The kOut setting points outside the field to zero should allow you to use the absolute value of the results as a mask vector. (0.0 will be false, non-zero (absolute value) will be true."
"For those of you who are using this command, I have found that the default value of 0.10 in field 8 is much too high for large problems. I suggest you supply a value in this field. A good value is:
Value = 1.0 / (sqrt(nIn)), where nin is the number of nodes in the input (known) set. (for kDim = 2)
Value = 1.0 / (cuberoot(nin)), where nin is the number of nodes in the input set (for kDim = 3)
```

### \*MOPER (2)

```txt
*MOPER,Eloc(1,1),XYZ(1,1),INTP,Elem(1)
where:
*dim,XYZ,array,nPts,3
*dim,Elem,array,nPts
\*dim,Eloc,array,nPts,3

This command finds the element containing the XYZ point, rather than the element with the closest centroid. The Eloc array is the element coordinates of the point.
Compare this, for example, with the \*MOPER,,,ENEAR option.
```

### \*MOPER (3)

```txt
*MOPER,sval(n),eloc(n,3),SGET,elem(n),label,comp
Finds stresses at certain points. This requires use of the \*MOPER,,,INTP undocumented command prior to executing this command.
sval(n): output array containing stresses at the points of interest
eloc(n,3): input array containing relative locations inside the elements (output from INTP)
elem(n): input array containing element numbers related to the relative locations of "eloc" (output from INTP)
label,comp: stress component of interest (see PLNSOL,S for examples)
```

### \*RETURN

```txt
*RETURN,value
Break reading from an input file
Where value=0 returns to the top level, -n returns n levels, n returns to level n
Useful when breaking *DO loops or *IF conditional statements, for example.
[STI: Implemented at 5.7?]
```

### \*STATUS

```txt
*STATUS,_PRM
\*STATUS,PRM_
Shows parameters which begin or end with an underscore.
[STI: Documented at 5.6]
```

### \*VFUN

```txt
*VFUN,array(1,1),DIRECT,array2(1,1)
Gets the direction cosines of a vector. For example:
*DIM,STRESS,array,nNodes,6
*vget sx,sy,sz, sxy,etc into STRESS(1,1), STRESS(1,2), etc
*DIM,DIR,array,nNodes,9
*VFUN,DIR(1,1),DIRECT,STRESS(1,1)
DIRECT will contain the 3 x 3 matrix of direction cosines
[STI: Works for 5.6.2]
```

### \*VFUN (2)

```txt
*VFUN,uv(1,1),ACORD,xyz(1,1),areanum
Gets (u,v) 'natural' coordinates of a point lying on an area areanum when the global coordinates (x,y,z) are known.
uv is dimensioned (npoints,2)
xyz is dimensioned (npoints,3)
areanum is area number

\*VFUN,xyz(1,1),GCORD,uv(1,1),areanum
The GCORD option is the inverse of the ACORD option.
```

### \*VOPER

```txt
*VOPER, ParR, Par1, Oper, Par2, CON1, CON2
For \*VOPER, the Oper argument can take the form of and, or, or xor. This is for binary comparison of arrays. Hence, the values in the arrays Par1 and Par2 are taken such that negative numbers or zero is "0" and positive numbers are "1" for comparison.
For example, when Oper = and, both values in Par1(i) and Par2(i) need to match to return ParR(i)=1.
When Oper = or, if either value in Par1(i) and Par2(i) is "1", then ParR(i)=1.
When Oper = xor, both values in Par1(i) and Par2(i) need to be different to return ParR(i)=1.
Recall from above that when the comparisons are made, positive numbers are assumed to be "1" and negative (and zero) numbers are assumed to be "0". Hence, for XOR case, "3" and "4" will return "0" since "3->1" and "4->1", they are the same, so XOR returns "0" (false).
```

### \*VPUT

```txt
*VPUT, ParR, Entity, ENTNUM, Item1, IT1NUM, Item2, IT2NUM, KLOOP
To change selection status of entities, use a format similar to *VGET.
Use for Entity = node, elem, kp, line, area, or volu, ENTNUM = 1, and Item1 = nsel, esel, ksel, lsel, asel, or vsel. The array ParR would be similar to the *VGET array, where
-1 = unselected
0 = undefined
1 = selected
It is recommended to select all entities with nsel,all (or related command) prior to using \*VPUT.
```

### \*VREAD

```txt
*VREAD,array(1,1),filename,ext,dir,ncol,row,column,plane,start_line
Undocumented fields are: row, column, plane to allow reading in matrix by row, column, or plane. start_line is the line of the file to start reading from. [STI: documented from 5.7 onwards.]
```

### \*VSCFUN

```txt
*VSCFUN,LocPar,POS,myarray(1),compare,myvalue,tolerance
Determines position in array of value "myvalue" in array "myarray" and returns in LocPar. "compare" can be any comparison operator, such as GE, GT, LE, and LT. The first occurrence will be returned. "1" will be returned for no match. "tolerance" (default 1e-6) sets the tolerance for a match. [Note that EQ comparison is valid for 5.7 and 6.0 but was removed in 6.1 because it returns only first match.]

Example:
*dim,a,,5
a(1)=1,2,3,4,5
*vscfun,b,POS,a(1),ge,3
Returns "3" for third index/position.
```

### /CONFIG

```txt
/CONFIG,RESUPRES,0
or
RESUPREC=0 in config145.ans

In ANSYS 14.5, stresses, strains, and other element quantities are written in the result file (.rst) as single precision to save space (DOF solution and reaction forces are still written as double-precision). This command, when invoked before solving, will store all results in double-precision.
```

### /DIRGET

```txt
/dirget,parm,filename,fileext
Gets the list of files with the file extension "filename" or "fileext"
For example:
/dirget,\_str,all,tif
Gets all filenames with extension "TIF"
[STI: Note: This may only work on UNIX at 5.6.1, not on NT. I keep getting bombed out of ANSYS using this command on NT. Also, for 5.7 and above, look at the /INQUIRE command and strings for same functionality.]
```

### /ENCRYPT

```txt
/ENCRYPT,Encryption_key,File_name,File_ext,Directory_Path/
The commands /ENCRYPT and /DECRYPT allow one to encrypt macros. See APDL Programmer's Guide for more details.
```

### /HOLD

```txt
/HOLD,filename,timeint,timeout
Read a command from file "filename" if it exists. If it doesn't exist, wait "timeint" seconds, then keep trying again until "timeout" seconds.
```

### /INQUIRE

```txt
/INQUIRE,strarray,DIRECTORY
This gets the working directory ANSYS was launched from.
```

```txt
/INQUIRE,strarray,JOBNAME
This gets the ANSYS jobname and puts it into a string array called "strarray".

/INQUIRE
/INQUIRE,strarray,TITLE,n
This gets the ANSYS title starting from character "n".
```

### /RMTMP

```txt
Removes/closes the file specified in /INPUT after it is read. /RMTMP should be the last command in the input file.

```

### Arrays

```txt
Passing arrays as arguments to macros
Example from John Swanson:
/batch,list
*create,macro,mac
a = arg1(1)
b = arg1(2)
c = arg1(3)
*stat
\*end

\*dim,xx1,,3
xx1(1) = 10
xx1(2) = 20
xx1(3) = 30
macro,'xx1'
/exit,nosave

```

### CMWRITE

```txt
CMWRITE,Fname,Fext,Fdir,ipos,[_ | BLOCK | UNBLOCK]
Write component information to file, where ipos = 0,write at beginning of file, 1, write at end of file
For 7.0 and later.

```

### dynprompt57.ans

```txt
At 5.7, the dynamic input file prompting was introduced, where the command format was displayed as you typed a command.

Modify "dynprompt57.ans" to add your own macro argument format, so when you type your own macros, the proper arguments are also displayed.
[STI: at 6.0, this file is called "dynprompt60.ans", where the last two numbers indicate the version number.]

```

### KEYW

```txt
KEYW,PR_SGVOF,1
When redefining arrays in an interactive session, the user is prompted if they really want to redefine an existing array. The above command disables this prompt in ANSYS 15.0 and above, so if an existing array is redefined with the \*DIM command, it will do so silently.

See also \*DEL,,NOPR.

```

### RPnnn

```txt
RPnnn, vinc1, vinc2, ...
The RPnnn command works similar to *REPEAT,nnn. For example, instead of using *REPEAT,3 to repeat the previous commands a total of 3 times, one can use RP3 instead. The second argument (value increment) of RPnnn is the same as the third argument of \*REPEAT.

```

### Strings

```txt
*DIM,StrPar,STRING,nChar,[nString,{nPages]]
Defines strings (5.6)
strcat(Param1(1,1),Param2(1,1))
Concatenation of strings
Example:
*DIM,Param1,STRING,128
*DIM,Param2,STRING,128
*DIM,Param3,STRING,128
Param1(1,1) = 'THIS IS STRING 1'
Param2(1,1)=' THIS IS STRING 2'
Param3(1,1) = strcat(Param1(1,1),Param2(1,1))
This gives:
THIS IS STRING 1THIS IS STRING 2

strsub(Param1(1,1),location,numchr)
Gets substring of numchr long starting from location

strfill(Param1(1,1),Param2(1,1),location)
Fills in Param2 to Param1 starting from location

strleng(Param1(1,1))
Returns length of Param1 as a scalar number

strpos(Param1(1,1),Param2(1,1))
Returns location of Param2 substring in Param1 string as a scalar number

An example macro can be downloaded which illustrates some of the above points through examples.
[STI: Strings will be documented at 5.7]

```

### \_RETURN

```txt
Parameter returns number of geometry entity just created (5.3 does not support _return for the L command)
[STI: Please see Ch. 4.7 "Using the _STATUS and _RETURN Parameters in Macros" in the ANSYS APDL Guide for more information]
```

### \*STATUS

```txt
*STATUS,_PRM
\*STATUS,PRM_
Shows parameters which begin or end with an underscore.
[STI: Documented at 5.6]
```

### ARVL

```txt
Selects all areas associated with currently active volumes.
```

### ASLE

```txt
ASLE,s,1
Selects areas based on elements. Second argument is selection method (s, r, u). Third argument is to select areas if any of its elements are selected (0) or only if all of its areas are selected (1). This command behaves similar to other "select based on" commands like NSLL.
[STI: Works with 5.7 and above]
```

### ASLN

```txt
ASLN,s,1
Selects areas based on nodes. See ASLE undocumented command (or NSLL documented command) for usage.
```

### CEWRITE

```txt
write out constraint equations (jobname.ce)
```

### CLIST

```txt
CLIST,csys,Nstart,Nend,Ninc
Displays coordinates for nodes in given "csys" coordinate system without using DSYS. Use of DSYS is cumbersome since it affects displays as well as listings, so this is a better alternative.
```

### CMWRITE

```txt
CMWRITE,Fname,Fext,Fdir,ipos,[_ | BLOCK | UNBLOCK]
Write component information to file, where ipos = 0,write at beginning of file, 1, write at end of file
For 7.0 and later.
```

### CPWRITE

```txt
write out coupled sets (jobname.cp)
```

### ENODE

```txt
ENODE,var
Selects all elements attached to (var=0) any currently active nodes or (var=1) all currently active nodes.
```

### ESEL

```txt
ESEL,,LAYER,MAT,matno
Selection by presence of non-zero thickness layer with material m. Use "ESEL,,LAYER,,layerno" to select elements with non-zero thickness of layer "layerno".
```

### ETWRITE

```txt
Write out element types (jobname.etyp)
```

### KLIST

```txt
KLIST,all,,,xyz
Shows more significant digits for keypoint listings.
```

### KSLE

```txt
KSLE,s,1
Selects keypoints based on selected elements. See ASLE undocumented command (or NSLL documented command) for usage.
```

### LSAR

```txt
LSAR
Selects all lines associated with currently active areas.
```

### LSLE

```txt
LSLE,s,1
Selects lines based on selected elements. See ASLE undocumented command (or NSLL documented command) for usage.
```

### LSLN

```txt
LSLN,s,1
Selects lines based on nodes. See ASLE undocumented command (or NSLL documented command) for usage.
```

### NELEM

```txt
NELEM
Selects the nodes attached to the currently active elements.
```

### NLIST

```txt
NLIST,all,,,xyz
Shows more significant digits for node listings.
```

### RWRITE

```txt
Write out real constant tables (jobname.real)
```

### SELTOL

```txt
SELTOL,value
Sets selection tolerance to value prior to xSEL commands.
SELTOL,1e-2
NSEL,S,LOC,X,1000
SELTOL
Above example selects nodes at x=1000+/-1e-2, then resets selection tolerance to 0.005xVMIN
```

### VSLE

```txt
VSLE,s,1
Selects volumes based on selected elements. See ASLE undocumented command (or NSLL documented command) for usage.
```

### VSLN

```txt
VSLN,s,1
Selects volumes based on nodes. See ASLE undocumented command (or NSLL documented command) for usage.
```

### \_RETURN

```txt
Parameter returns number of geometry entity just created (5.3 does not support _return for the L command)
[STI: Please see Ch. 4.7 "Using the _STATUS and _RETURN Parameters in Macros" in the ANSYS APDL Guide for more information]
```

### \*GET,,CDSY

```txt
*GET,Parm,CDSY, ,NUM,MAX
Gets the max local coord. system number
You can also use the inquiry function MAXCSYS = csyiqr(0,14)
```

### \*GET,,CE

```txt
*GET,Parm,CE,CeNum, TERM, num, [COEF | NODE | DOF]
Gets the node number, DOF, or coefficient in CE #CeNum, #num term.
The DOF key is as follows: 1=ux, 2=uy, 3=uz, 4=rotx, 5=roty, 6=rotz, 7=ax, 8=ay 9=az, 10=vx, 11=vy, 12=vz, 19=pres, 20=temp, 21=volt, 22=mag, 23=enke, 24=ends, 25=emf, 26=curr
```

### \*GET,,CE

```txt
*GET,Parm,CE,CeNum, [NTERM | CONST]
Gets the total number of terms or the constant for CE
```

### \*GET,,CE

```txt
*GET,Parm,CE,0,[MAX | NUM]
Gets the total #num number of CEs defined or the #max number of CEs.
```

### \*GET,,COMMON

```txt
*GET,parm,COMMON,,BOLCMD,,REAL,16
Gets the current boolean tolerance value (value assigned to the BTOL command).
```

### \*GET,,CP

```txt
*GET,Parm,CP,CpNum,TERM,num,NODE
Gets the node number in CP #CpNum, #num term.
```

### \*GET,,CP

```txt
*GET,Parm,CP,CpNum,[DOF | NTERM]
Gets the DOF of the CP #CpNum or total number of terms. The DOF key is as follows: 1=ux, 2=uy, 3=uz, 4=rotx, 5=roty, 6=rotz, 7=ax, 8=ay 9=az, 10=vx, 11=vy, 12=vz, 19=pres, 20=temp, 21=volt, 22=mag, 23=enke, 24=ends, 25=emf, 26=curr
```

### \*GET, , CP

```txt
*GET,Parm,CP,0,[MAX | NUM]
Gets the total #num number of CPs defined or the #max number of CPs.
```

### \*GET,,ETYP

```txt
*GET,Parm,ETYP, ,NUM,MAX
Gets the max element type number You can also use the inquiry function MAXETYP = etyiqr(0,14)
```

### \*GET,,NODE

```txt
*GET,par,NODE,n,NTEMP
Gets nodal structural temperatures applied on the model.
```

### \*VGET,parm(1),125,1,12,1,,,2

```txt
*VGETs nodal structural temperatures into an array.
```

### \*GET,,PLAB

```txt
*GET,Parm,PLAB,mat,TEMP,Tvalue
Gets material value at given temperature.
For example:
\*GET,EX1,EX,1,TEMP,70.0
Gets EX for material #1 at TEMP=70 and puts into parameter EX1.
```

### \*GET,,RCON

```txt
*GET,Parm,RCON, ,NUM,MAX
Gets the max REAL set number
You can also use the inquiry function MAXREAL = rlinqr(0,14)
```

### \*OGDEN

```txt
*OGDEN,strain,stress,ltype,const,calc,sortsn,sortss,fname,ext
Ogden Hyperelastic Material
similar to *MOONEY for Ogden constitutive law for HYPER56, 58, & 74.
strain = name of array parameter vector containing experimental engineering strain values
stress = name of array parameter vector containing experimental engineering stress values
ltype = 1 simple tension, 2 equibiaxial tension or compression, 3 shear (using simple tension equations), 4 shear (using equibiaxial tension equations)
const = name of array containing ogden constants
calc = name of array containing calculated stress values
sortsn = sorted strain data to be used for *vplot command
sortss = sorted stress data to be used for \*vplot command
fname = tb output filename (8 characters maximum).
ext = tb output file extension (8 characters maximum).
[STI: Ogden material is available for 18x family of elements at 5.7, so it is strongly recommended to use those elements instead.]
```

### /DFLAB

```txt
/DFLAB,dofnum,dlabel,flabel
Changes DOF #dofnum to "dlabel" (D) and Force to "flabel" (F). DOF numbers range from 1-32. For example, DOF number 1 is UX, 2 is UY, etc.
This should be the first command issued upon entering ANSYS.
/DFLAB,19,PRESSURE changes PRES label (#19) to PRESSURE
```

### ABTOANS

```txt
From 8.0 onwards, an undocumented macro ABTOANS allows user to convert an ABAQUS input file to ANSYS.
```

### ALLP

```txt
ALLP,num_loop
Creates areas with holes in them. It supports up to 4 internal loops and one external loop. Listing of lines can be random within each loop, but each loop must be grouped together. "allp,3,1,3,4,7,11,14,6,8,9" where 3=number of total loops (one external, two internal, and the other numbers are line numbers in random order. This means that loop one would be lines 1,3,4, loop two would be 4,7,11, and loop 3 would be 14,16,8,9.
```

### AMER

```txt
AMER,area1,area2,etc.
"Glues" areas together. Same command as AGLUE. See AGLUE for details on the usage of this command.
```

### ASBL

```txt
ASBL,NA,NL,SEPO,KEEPA,KEEPL
The SEPO undocumented argument is similar to ASBA command. For ASBL, the divided areas will share lines by default but will have separate lines if SEPO is the value in the 3rd field.
The reason why this argument is undocumented is that, in some cases, separate, coincident keypoints may not be generated.
```

### ASBW

```txt
ASBW,area,,,,,,,MESH
This divides a meshed area. (Warning - this may cause a corrupt database - use at your own risk! - STI)
```

### BSPLINE

```txt
BSPLINE,ALL,First,[Next],[OPEN | CLOSED],,sx1,sy1,sz1,sx2,sy2,sz2
Use more keypoints for BSPLINE to have an open or closed loop.
[STI: At 5.6.2, CLOSED option didn't seem to work for arbitrary sets of keypoints...]
```

### CBDOF, BFINT

```txt
CBDOF/BFINT,,,,,,,,,,TOLOUT,MOVETOL
Vary distance for projecting results.
The TOLOUT parameter is the fraction of the size of the nearest element by which a point can be outside the element. (Default is 0.5)
The MOVETOL parameter is the max motion of a node outside the body to reach the surface of the body (value > 1). This allows nodes to be moved to the surface by a specified amount prior to interpolation/extrapolation.
```

### CECHECK

```txt
CECHECK,Item,Tolerance,Flag
Checks constriant equations for non-zero rigid reactions.
Item is "All (default), CE, or CP"
Flag is "RIGID (default) | ALL | Dof" where DOF can be individual UX, UY, TEMP (THERM?), etc.
```

### CESGEN

```txt
CESGEN,2,\_ntot,all
Generates/copies constraint equations (CEs).
```

### CLIST

```txt
CLIST,csys,Nstart,Nend,Ninc
Displays coordinates for nodes in given "csys" coordinate system without using DSYS. Use of DSYS is cumbersome since it affects displays as well as listings, so this is a better alternative.
```

### COPLOT

```txt
COPLOT,secnum
Plots a beam cross section secnum as MESH200 elements on the screen. Useful to see graphically where the 'section nodes' are if you run this in a blank database.
Sample input below:

finish
/clear

/prep7
sect,1,beam,I
secd,1,1.5,1,0.1,0.1,0.1

/pnum,node,1
/efacet,2
coplot,1

See CUPLOT for related command
```

### CPMERGE

```txt
CPMERGE,lab
Merges different couple sets with duplicate degrees of freedom into one couple set.
"Lab" can be any valid DOF label (e.g., 'UX')
Similar to NUMMRG,CP
```

### CPSGEN

```txt
CPSGEN,2,\_ntot,all
Generates/copies coupled sets (CPs).
```

### CUPLOT

```txt
CUPLOT,filename
Plots a user-defined beam cross section stored in filename as MESH200 elements on the screen. Useful to see graphically where the 'section nodes' are if you run this in a blank database.

See COPLOT for related command
```

### CWZDELE

```txt
CWZDELE,real_no,type_flag
Deletes a 17x contact pair, based on the real constant real_no. If type_flag is set to "1", this command not only deletes the contact elements, but it removes the real constant and element types associated with that contact pair.

For example, CWZDELE,3,1 deletes the 17x contact elements associated with real constant 3 (EDELE) and removes the real constant and element types (RDELE, ETDELE).
```

### DGEN

```txt
DGEN, 2,\_ntot,1,\_ntot
Generates/copies DOF constraints.
```

### ELSIZE

```txt
ELSIZE, Size, Ndiv, Kshape, Kstr
Provides same functionality of two 'newer' commands: ESIZE, Size, Ndiv and ESHAPE, Kshape, Kstr
```

### EMID

```txt
EMID,STRAIGHTEN
Straightens elements with midside nodes to force midnode to lie exactly in-between corner nodes.
```

### EORIENT

```txt
EROIENT to reorient SOLID46 is documented at 5.6 but is undocumented at 5.5.
[STI: I haven't had much success with it at 5.5, though.]
```

### EPGEN

```txt
EPGEN ,inum,numincr,estart,eend,eincr,face
Generates/copies pressures.
inum is number of times to perform (>1)
numincr is element number increment
estart,eend,eincr is range of element numbers starting from estart to eend incremented by eincr (can use "all" for estart)
face is element face number
```

### ESPLIT

```txt
ESPLIT,iel1,iel2,incr
ESPLIT,ALL
Splits all selected (or specified via iel1 and iel2) quad elements to tris.
In previous versions of ANSYS the newly created tri's are not recognized by graphical picking, but you can list them. In order for the database to be correct you have to either (a) issue NMODIF,ALL or (b)CDWRITE and CDREAD the model into a new database. This undocumented command may not be the best solution for every situation but definitely one to know about.
In later versions of ANSYS (5.5 or later), MOPT,SPLIT can be used instead prior to meshing.
```

### FGEN

```txt
FGEN, 2,\_ntot,1,\_ntot
Generates/copies nodal forces.
```

### GCGEN

```txt
GCGEN, Ccomp, Tcomp, NUMC, RADC, Tlab, Shape
```

### Ccomp

```txt
Name of the component containing nodes on the contact surface [CM]. Assemblies are not permitted.
```

### Tcomp

```txt
Name of the component containing nodes on the target surface. Assemblies are not permitted.
```

### NUMC

```txt
Generate NUMC contact elements whose contact node is closest to the centroid of each target element face. If Shape = TRI, the program will generate 2\*NUMC CONTAC49 elements for each quadrilateral target element face. (That is, each triangular contact element base will be connected to NUMC contact nodes.) Defaults to an unlimited number of contact elements generated per target face.
```

### RADC

```txt
Generate contact elements whose contact node is within a radius of RADC measured from the centroid of each target element face. Defaults to no limit on the radius.
```

### Tlab

```txt
Label to identify the target surface of line or shell elements. The top surface will be used unless Tlab = BOT. Tlab is ignored if the target elements are solids.
```

### Shape

```txt
Label that controls the shape of CONTAC49 element bases. Using the TRI feature can sometimes improve contact performance if the target elements have warped quadrilateral faces:
(blank) --
The contact element bases will have the same shape (triangular or quadrilateral) as the corresponding target element faces (default).
TRI --
The contact element bases will always be triangular.

Notes:
Generates 2-D contact (CONTAC48) or 3-D contact (CONTAC49) elements. Each contact element connects nodes on a target element face to a contact node. The "target" end of a contact element is called the contact element base. A target element face is defined as a face on a selected element whose nodes belong to the target component. If the selected element is a solid then the target face must also be external to the model, while for a line or shell element all nodes of the element will belong to the target face. The active element type attribute (TYPE) must be a contact element (CONTAC48 or CONTAC49) and must match the dimensionality of the target element. The other active attributes (MAT, TYPE, REAL, ESYS) will be used for the generated elements. The target elements must be defined before using this command. Midside nodes on target element faces are ignored.

It is highly recommended to use newer CONTA171-175 elements instead of CONTAC48-49.
```

### KLIST

```txt
KLIST,all,,,xyz
Shows more significant digits for keypoint listings.
```

### KROT

```txt
Similar to NROTA but rotates keypoints. Can be viewed with /PSYM,NDIR,1 and is supported by CDREAD and CDWRITE
```

### LMER

```txt
LMER,line1,line2,etc.
"Glues" lines together. Same command as LGLUE. See LGLUE for details on the usage of this command.
```

### LSPA

```txt
LSPA,line,area
Project a line onto an area. It appears that the line must be directly over the area, and the area needs to be flat.
```

### LSTR

```txt
LSTR,p1,p2,ndiv,space
LSTR is documented, NDIV and SPACE are not. Analogous to the L command, you can put number of divisions and spacing ratio.
```

### LSx()

```txt
LSx(line number, unit distance)
\*GET functions for the slope of a line for LSX, LSY, LSZ where unit distance is between 0 and 1 (0 is slope at keypoint 1, 1 is slope at keypoint 2)
```

### MOPT

```txt
MOPT,STAT,ALL
Shows ALL meshing controls available to user
```

### MOPT

```txt
MOPT,TSMO,OFF
Turns off smoothing if errors cause mesh smoothing failure [5.3]
```

### MOPT

```txt
MOPT,LSMO,ON
Turns on line smoothing option [off by default at 5.3]. Causes locations of nodes on the boundary to be optimized as part of the smoothing option.
```

### MOPT

```txt
MOPT,VSSM,OFF
Below describes an option for controlling "node relaxation" when using the VSWEEP command. This is needed when using VSWEEP with volumes that are axisymmetric, where you might have previously used VROT. The purpose of this option is to ensure that the nodes on opposite sides of the volume are positioned with identical radial and axial coordinates. When you create couples for cyclic symmetry, your nodes will match up precisely.
By default node relaxation is turned on. If you see that the source and target area are identical, you can issue the command.
If you have it turned off and you try to sweep a volume that changes in cross section, then you'll probably get bad quality elements. [command available in 5.5.1 and above]
```

### NBETWEEN

```txt
NBETWEEN,n1,n2,nnew,type,value
identical to KBETWEEN - generates a node between two other nodes
```

### NLIST

```txt
NLIST,all,,,xyz
Shows more significant digits for node listings.
```

### NUMCMP

```txt
NUMCMP,NODE,EORD
NUMCMP,ELEM,ELEM
These commands will cause the nodes and elements to be renumbered, after compression, to match the sequence in which they will be processed by the solver. This should be done after the WAVE command to (a) put the nodes in the element order and (b) put the elements in the new order.
```

### P

```txt
P,node1,node2,value,,,,node3,node4
Applies pressure of "value" to element face defined by node1-node4. An alternative to SF command since this command does not require selection of nodes and element faces prior.
```

### SMDT

```txt
SMDT,option,value
Change tolernace for solid modeling conditions. Affects all solid modeling operations, so be careful when using these values.
List of options:
1 - Tolerance for tesselation
2 - Tolerance for line on line
3 - Approx. tolerance
4 - Tolerance for point coincidence (default 1e-5 or 1e-4 -- e.g., can make tighter to very small dimensions)
5 - Tolerance for NURBS knot coincidence (default 1e-7, may be difficult to use)
6 - Tolerance for angle (default 1e-6, may be difficult to use)
7 - Machine precision tolerance
...up to 17...
```

### SPLOT

```txt
SPLOT,area_min,area_max,area_inc,mesh
where 'area_min' is beginning area number, 'mesh' is the amount of lines to put on the surface (like a wireframe tesselation). I think this 'mesh' argument is what J. Crawford referred to as 'contour lines'. (That's a better description, actually) [6.0]

By default, if you just issue SPLOT with no arguments, it plots all surfaces with a 'surface mesh density' (wireframe tessellation density) of 4, I think.

Plot surfaces ANSYS uses for basis for geometric areas (similar to surface/face analogy in CADfix); works in 5.4 but will cause 5.5-5.7.0 to crash. Reintroduced at 5.7.1 and 6.0.

With the improvements to the solid modeling capabilities in ANSYS 6.0, the SPLOT command became more relevant in detecting potential problems with geometry.
```

### TB,OGDEN

```txt
TB,OGDEN
Ogden Hyperelastic Material
similar to \*MOONEY for Ogden constitutive law for HYPER56, 58, & 74.
[STI: Ogden material is available for 18x family of elements at 5.7, so it is strongly recommended to use those elements instead.]
```

### TB,PRONY

```txt
For TB,PRONY, up to 10 pairs of constants can be input. [The documentation mentions only up to 6 pairs of constants for TB,PRONY.]
[STI: At 10.0, up to 100 pairs can be used and is documented.]
```

### TCHG

```txt
TCHG, ELEM1, ELEM2, ETYPE2
Converts 20-node degenerate tets (e.g., SOLID95) to 10-node degenerate tets (e.g., SOLID92).
TCHG is documented in 5.5 and 5.6. It is undocumented but available at 5.4.
```

### TEGEN

```txt
TEGEN,inum,numincr,estart,eend,eincr
Generates/copies element temperatures.
inum is number of times to perform (>1)
numincr is element number increment
estart,eend,eincr is range of element numbers starting from estart to eend incremented by eincr (can use "all" for estart)
```

### TGEN

```txt
TGEN,inum,numincr,nstart,nend,nincr
Generates/copies nodal temperatures.
inum is number of times to perform (>1)
numincr is node number increment
nstart,nend,nincr is range of node numbers starting from nstart to nend incremented by nincr (can use "all" for nstart)
```

### VEXT

```txt
VEXT,NA1,NA2,NINC,DX,DY,DZ,RX,RY,RZ,spacing_ratio
Specifies spacing ratio in volume extrusion direction with "spacing_ratio" value. Specify number of divisions in extrusion direction with ESIZE,,ndiv.
```

### VMER

```txt
VMER,volu1,volu2,etc.
"Glues" volumes together. Same command as VGLUE. See VGLUE for details on the usage of this command.
```

### MODIFY (/AUX3 commands (Edit Results File))

```txt
MODIFY, SET, LSTEP, ITER, CUMIT, TIME, Ktitle
Fields LSTEP, ITER, CUMIT, and TIME accept the value of "-1" to retain current values.
Fields LSTEP, ITER, and CUMIT also accept the value of "0" to retain current values, although TIME does not.

```

### /FACET

```txt
/FACET,FINE,n
Changes tesselation where n is from 0 (coarsest, default) to 10 (finest). For XOX Shapes geometry only (IGES default importing or Connection Kit "Allow defeature" importing) Functionality replaced by GMFACE command (see below). [5.5 Beta]
```

### ANF File Format

```txt
The ANF File format is used by CADfix and the Connection Kit products to define ANSYS geometry, especially in the context of translating CAD geometries into ANSYS. This document covers the commands used in the ANF files.
```

### GMFACE

```txt
GMFACE,FINE,n
Same function as /FACET,FINE,n above, controls tesselation of area where n is from 0 (coarsest, default) to 10 (finest). For XOX Shapes geometry only (IGES default importing or Connection Kit "Allow defeature" importing) [5.5, documented in 5.6 in Errata]
The GMFACE command can be issued before the default IGES import, or after import in TOPO REPAIR. In TOPO REPAIR, you can issue the command repeatedly (with APLOTs in between) until the desired level of refinement has been achieved. Once you end TOPO REPAIR (by pressing FINISH or issuing GAPFINISH), the GMFACE command has no effect.
```

### IOPTN

```txt
IOPTN,FILTER,value
Filters IGES entities, including construction, infinite, blank, and lower-order entities (entities not used for BREP construction).
IOPTN,FILTER,ALL (ON) - Default behavior to filter all undesirables
IOPTN,FILTER,NONE - Turn off filtering and get everything
IOPTN,FILTER,BLANK - Filter only the blank entities (not to be displayed)
IOPTN,FILTER,LOWER - Filter the lower order entities and keep everything else
```

### SPLOT

```txt
SPLOT,area_min,area_max,area_inc,mesh
where 'area_min' is beginning area number, 'mesh' is the amount of lines to put on the surface (like a wireframe tesselation). I think this 'mesh' argument is what J. Crawford referred to as 'contour lines'. (That's a better description, actually) [6.0]

By default, if you just issue SPLOT with no arguments, it plots all surfaces with a 'surface mesh density' (wireframe tessellation density) of 4, I think.

Plot surfaces ANSYS uses for basis for geometric areas (similar to surface/face analogy in CADfix); works in 5.4 but will cause 5.5-5.7.0 to crash. Reintroduced at 5.7.1 and 6.0.

With the improvements to the solid modeling capabilities in ANSYS 6.0, the SPLOT command became more relevant in detecting potential problems with geometry.
```

### \*GET,,ACTIVE

```txt
*GET,Parm,ACTIVE,0,SOLU,CNVG
You can also \*GET the convergence indicator, where 0=not converged; 1=converged.
```

### \*GET, ,COMMON

```txt
*GET,parm,common,,stepcm,,int,1
Newton-Raphson option key
```

### \*GET,,COMMON

```txt
*GET,parm,common,,stepcm,,int,69
Adaptive descent key
```

### \*GET,,COMMON

```txt
*GET,parm,common,,soptcm,,int,39
Equation solver values:
FRONT = 0, SPARSE=8, JCG=7, JCGOUT=2, ICCG=5, PCG=3, PCGOUT=3, ITER=0, etc.
```

### \*GET,,COMMON

```txt
*GET,parm,common,,soptcm,,int,66
Auto Solve Method
```

### \*GET,,COMMON

```txt
PCG common blocks:
```

### \*GET,parm,common,,stepcm,,int,138

```txt
PCG out-of-core key
```

### \*GET,parm,common,,stepcm,,int,105

```txt
PCG Single precision key
```

### \*GET,parm,common,,stepcm,,int,134

```txt
PCG Elem by Elem key
```

### \*GET,,COMMON

```txt
*get,parm,comm,,stepcm,,int,30
Number of nodal diameters:
```

### \*GET,,COMMON

```txt
Time & time step values

\*get,TIME_END,common,,stepcm,,real,2
Get time at end of solve (TIME command)

\*get,DT_INIT,common,,stepcm,,real,23
Get initial time step (DELTIM command)

\*get,DT_MIN,common,,stepcm,,real,24
Get minimum time step (DELTIM command)

\*get,DT_MAX,common,,stepcm,,real,25
Get maximum time step (DELTIM command)
```

### \*GET,,COMMON

```txt
Convergence values (CNVTOL):

\*GET,param1,common,,stepcm,,real,28+i
Reference value of Lab

\*GET,param2,common,,stepcm,,real,48+i
Tolerance about VALUE

\*GET,param3,common,,stepcm,,int,34+i
Convergence norm

\*GET,param4,common,,stepcm,,real,132+i
Minimum reference value

The parameter "i" to use is based on which criteria you are looking for:
I = 1 for F convergence
I = 2 for M convergence
I = 3 for U convergence
and there are more...

I tested some of these out on a model, and they work if you entered a value that is not the default. If you use the default value for any of these items, the \*get returns a zero.
```

### \*GET,,COMMON

```txt
*GET,OMEGAX,common,,acelcm,,real,31
*GET,OMEGAY,common,,acelcm,,real,32
*GET,OMEGAZ,common,,acelcm,,real,33
*GET,DOMEGAX,common,,acelcm,,real,34
*GET,DOMEGAY,common,,acelcm,,real,35
\*GET,DOMEGAZ,common,,acelcm,,real,36
Gets OMEGA and DOMEGA values for x, y, and z at the end of the load step.
```

### \*GET,,COMMON

```txt
*get,trf,common,,bfcom,,real,8
Get defined TREF value.

\*get,tunf,common,,bfcom,,real,10
Get defined TUNIF value.
```

### \*GET,,COMMON

```txt
*get,parm,common,,stepcm,,real,10
Get the DMPRAT value for constant damping ratio.
```

### /CLEAR

```txt
/CLEAR,SOLU
Clears the database of the current solution in memory while keeping the database intact. This nifty options allows you to dump the solution without exiting the program.
Note that in 5.7, you can choose to SAVE only the geometry & loads with a new argument to that command. Then, a user can (/CLEAR and) RESUME the database, leaving only geometry in memory.
A related command is LCZERO, although this does not dump the solution but zeroes it out instead.
```

### /CONFIG

```txt
/CONFIG,NOELDBW,num
Controls writing of results info
1=do not write results to _.db but only _.rst
2=do not write results to _.rst, only _.db
3=do not write to either _.rst or _.db)
[STI: I use /CONFIG,NOELDB,1 to give max memory during solution rather than filling up database space -db with results. Please see CSI's Tip of the Week on memory management for more details. This was documented from 5.7 onwards, I believe.]
```

### /GST

```txt
/GST,Lab,Lab2
In batch mode, /GST,ON will write convergence data to file.gst using the ANSYS Graphics format (use Display utility to plot file).
On the other hand, /GST,ON,ON will write convergence data to file.gst using an XML format (use the Results Tracker utility from the ANSYS Product Launcher, Tools menu to plot file).
```

### /PNUM

```txt
/PNUM,DOMAIN,1
Shows domains generated for domain decomposition solver (DDS). Beta at 5.6, 5.7, but it is documented at 6.0.
```

### ASSOPTION

```txt
ASSOPTION,,FRONTAL
Resets element assembly option to frontal assembly rather than symbolic assembly for the sparse solver at 6.0.

ASSOPTION,,,,0.0
Do not drop non-zero terms from global matrix.

ASSOPTION,,,,,sing
For DANSYS, uses single core to assemble.

ASSOPTION,,pcg
Use symbolic assembly (default behavior from 6.0).
```

### BCSOPTION

```txt
BCSOPTION,ropt,mopt,msiz,io_opt,dump_opt,dbg
Controls sparse solver options.
ROPT can be changed to mmd, metis, sgi, or wave (equation reordering method)
MOPT can be changed to forc or limit and MSIZ is size in MB (up to 2 GB) to force or limit sparse solver memory to a certain amount. (At 7.0, MOPT can also be set to default, incore, optimal, or minimum with MSIZ left blank to use default, in-core, optimal out-of-core, or minimum out-of-core solutions)
IO_OPT can be set to -1 to override default I/O saves. This keeps the solver memory in-core to avoid backing up the workspace (LN22). It prevents the solver from releasing/reallocating memory by keeping the solver memory permanently allocated during solution.
DUMP_OPT can be changed to asc or bin to dump input matrices to disk in ASCII or Binary format
DBG can be set to -5 which prints performance stats. (At 7.0 and above, this is same as setting to performance value)
[STI: Works only for 5.7 and above. See EQSLV,sparse,,-5 for 5.6 and prior. Documented at 7.0 and above]
```

### CELIST

```txt
CELIST,,,,option
For the 17x contact elements which support MPC formulation, one can list the internally-generated MPC equations (CE)
CELIST,,,,ALL: list all constraint equations
CELIST,,,,INTE: list only internally-generated constraint equations associated with MPC-based contact
CELIS,,,,CONV: convert internal CEs to real CEs
All of the above options must be done in /SOLU after a SOLVE.
[STI: undocumented at 8.0]
```

### CNTR

```txt
CNTR,PRINT,nlevel
CNTR,print,0 (default) - only print the troubleshooting when solution diverges in the end
CNTR,print,1 - above + print the troubleshooting when bi-section occurs
CNTR,print,2 - above + print the message for each load step
CNTR,print,3 - above + print the message for each sub-step
CNTR,print,4 - above + print the message for each iteration and much more
```

### CUTCONTROL

```txt
CUTCONTROL,NOSHAPE,1
Tells ANSYS to not do any element shape-checking during the course of a nonlinear analysis.
```

### CUTCONTROL

```txt
CUTCONTROL,PIVSTOP,psvalue
When a negative pivot is encountered, ANSYS usually continues with the analysis.
Setting psvalue to 1 will cause ANSYS to bisect as soon as a negative pivot is encountered.
Setting psvalue to 2 will cause ANSYS to stop the solution as soon as a negative pivot is encountered.
This can be useful, for example, in a nonlinear buckling analysis as a means of determining when a limit load may be reached.
```

### CUTCONTROL

```txt
CUTCONTROL,CUTBACKFACTOR,cutvalue
For automatic time-stepping, this controls the bisection factor. By default, cutvalue is 0.5 (hence the term "bisection"), so ANSYS cuts the timestep in half and resolves if convergence is not achived in that timestep. This can control the cutback factor. (see related undocumented OPNCONTROL,OPENUPFACTOR command.)
[STI: now documented in latest ANSYS releases.]
```

### DDS

```txt
For info on the Distributed Domain Solver, which is beta at 5.6 (released at 5.7), contact your ASD.
[STI: DDS needs to be compiled by the user at 5.6 beta; it is not a trivial task, so it may be better to use 5.7 production release of PDS]
```

### DIRECT

```txt
DIRECT,on
Use of direct assembly of equations. This is automatically done for PLANE2, PLANE42, SOLID45, SOLID92, SOLID95, and thermal analyses.
[STI: Direct assembly of equations is available in ANSYS 5.7 for structural static, transient, modal, and full harmonic; thermal static and transient; electrostatics.]
```

### EQSLV

```txt
EQSLV,AMG,toler
Algebraic MultiGrid Solver
Beta at 5.6, released at 5.7.
[STI: Uses CG methods but better scalability for SMP parallel processing]
```

### EQSLV

```txt
EQSLV,DOMAIN,toler
Distributed Domain solver
Beta at 5.6, released at 5.7. At 5.7, this is renamed EQSLV,DDS
```

### EQSLV

```txt
EQSLV,JCGX,toler
Special JCG solver which uses the previous solution as a starting vector for the new solution. Creates a \*.full file. Used with THOPT fast thermal solution method.
```

### EQSLV

```txt
EQSLV,SPARSE,,-5
Provides much more detailed information (performance stats, debug info) related to the sparse solver at 5.5 & 5.6. In versions 5.7 and above, this has been changed to the BCSOPTION command

EQSLV,SPARSE,pvttol,-1
The PVTTOL value is the pivot tolerance value. Diagonal terms of the stiffness matrix are compared to the largest value (MAX) such that if the term is < MAX \* PVTTOL, pivoting for that row is delayed. PVTTOL defaults to 0.0 and should be less than 0.1.

MKL_NPROCS environment variable
The MKL_NPROCS environment variable can be set to the number of processors for parallelization of the sparse solver at 5.6.2 and 5.7 on Windows NT only. (Other platforms do not need this environment variable)
[STI: This is NOT needed at 5.7.1 and above on Windows. Standard use of /config,nproc or the config57.ans file should be used, and this environment variable should be removed.]
```

### FCENT

```txt
FCENT,OFF
For harmonic response analyses using OMEGA or CMOMEGA with CORIOLIS command, one would want Coriolis effects without the load vector. FCENT,OFF turns off the centrifugal forces associated with OMEGA or CMOMEGA. This will be the actual behavior at ANSYS 12.0, so it will not be needed beyond ANSYS 11.0.
```

### FCENTRIF

```txt
FCENTRIF,OFF
Turns off centrifugal force effects. In a stationary frame of reference, centrifugal force is not in the equations of motion; however, it may be included in harmonic analysis at 11.0, so this command will turn that effect off.
```

### FLDATA

```txt
FLDA,C2TA,MOME,0.0
FLDA,C2TA,PRES,0.0
Zero out damping term in momentum and pressure equations for a Flotran run.
[STI: I think C2TA is referring to the perturbation term in Eqn 7.2-10 in the Theory Manual -- the command minimizes diffusive term in transport equation (?)]
```

### HROPT

```txt
HROPT, Method, MAXMODE, MINMODE, MCout
The MCout argument is undocumented, where it can take the values of "yes" or "no" (default). It writes out modal coordinates in an external text file called "jobname.mcf" for mode-superposition method.
[STI: from release 7.0 and above]
```

### jobname.solc

```txt
Regarding the undocumented jobname.solc feature:

    Open up a text editor and place and /solu commands you want (not /SOLU itself). Main use I've seen of jobname.solc is really to change CNVTOL or NSUBST, although I think other options are available.
    Save file as jobname.solc in working directory.

If I recall correctly, jobname.solc will be deleted when it is read from, similar to jobname.abt. Also, I think it works on the next substep.
```

### KEYMOD

```txt
KEYMOD,itype,knum,value
Allows changing element keyoptions during solution. Use it instead of KEYOPT in /SOLU to change keyoptions between load steps, such as for contact elements.
```

### KEYW

```txt
KEYW,PR_SGUI,1
Supresses "Solution is done" message [5.5.3 and above]

Setting this keyword will not have an adverse effect on the menus, but to be safe, use the above setting for the SOLVE command only, then reset PR_SGUI to zero after SOLVE.
```

### KEYW

```txt
KEYW,SIMPLOFF,1
At 5.6, the "Abridged Menu" with the Solution Control Wizard is the default. I find that since the abridged menu or Solution Control wizard doesn't support all nonlinear or dynamics options, this confuses customers. If you put this in your start56.ans file, this will always show the unabridged menu (similar to 5.5 and prior versions). (STI)
```

### LSSOLVE

```txt
LSSOLVE,lsmin,lsmax,lsinc,,,,,,1
The ninth argument, when set to 1, solves load steps lsmin to lsmax with element shape checking disabled. (For related command, see SOLVE undocumented option.)
```

### NROPT

```txt
NROPT,FULL,,ON,,A1,B1,C1,A0,B0,C0
A1,B1,C1 are for the first substep
A0,B0,C0, are for all other substeps
A=starting value for the descent parameter on this substep
B=multiplication factor for decreasing descent parameter
C=number of consecutive iterations with decreasing convergence value before multiplication factor is applied
Settings that have been good to me for some contact analysis problems have been nropt,full,,on,,,,1,0.7,5 This essentially would allow the contact elements to hold together longer by adaptive descent when physically they should not be contacting. They are slowly released for improved stability and convergence.
```

### OPNCONTROL

```txt
OPNCONTROL,OPENUPFACTOR,opnvalue
For automatic time-stepping, this controls the factor by which the timestep is increased if convergence is attained easily. The value of opnvalue defaults to 1.5 (it was 2.0 in older releases of ANSYS) and should be greater than 1.0. (see related undocumented CUTCONTROL,CUTBACKFACTOR command.)
[STI: now documented in latest ANSYS releases.]
```

### OUTEQ

```txt
OUTEQ outputs all results from equilibrium iterations while in /SOLU.
```

### OUTS

```txt
OUTS,value
Controls writing of the jobname.stat file every value minutes (default is 6 minutes). The jobname.stat file is written in batch mode, and it provides the status (analogous to status bar in interactive mode) for some commands which may take a while. For example, for the SOLVE command, it will write out element formation, element solution, and PCG information every value minutes in batch mode. Can be issued in /PREP7 or /SOLU.
```

### P

```txt
P,node1,node2,value,,,,node3,node4
Applies pressure of "value" to element face defined by node1-node4. An alternative to SF command since this command does not require selection of nodes and element faces prior.
```

### PDS

```txt
For info on the Probabilistic Design System, which is beta at 5.6 (released at 5.7), contact your ASD.
```

### PSDRES

```txt
PSDRES,Lab,RelKey,WriteRPSD
The PSDRES command has an undocumented 3 rd argument which, when set to “ON”, will write an .rpsd file containing modal response PSDs. The contents of the file may be viewed in /AUX2, although the format is not documented.
```

### PSTRES

```txt
To perform a prestressed "full" harmonic analysis, simply issue PSTRES,ON during the static analysis and PSTRES,ON during the harmonic analysis (similar to prestressed modal). Prestressed modal superposition and reduced harmonic are documented in the manuals.
[STI: I think that this may be documented at 5.7]
```

### RSYNC

```txt
RSYNC,ON
Forces dump of buffer of element stresses after they are written.

RSYNC
RSYNC,filename
"Filename" is created when the load set is complete on the results file. The file will have one line giving the appropriate SET command to process that results set.
```

### SOLVE

```txt
SOLVE,,,,,NOCHECK
Solves without checking elements. Useful to force ANSYS to solve despite elements which produce shape testing errors. It is assumed that the user is able to determine that this is appropriate for his/her situation
[STI: This arises when "bad" elements exist, most commonly from imported meshes of 3rd party products since ANSYS 'fails to mesh' instead of generating error elements, by default]
```

### SPOPT

```txt
SPOPT,PSD,NMODE,Elcalc,FRATIO,SIGNIF,IntKey,IntArr,NUME
“FRATIO,” or “frequency ratio for modal coupling,” limits covariance cross-terms by allowing the user to provide a ratio of the frequency of two modes to be included. For example, specifying FRATIO as “1” will only include diagonal terms of the covariance matrix. This only works in conjunction with numerical integration method, discussed next.
For numerical integration, the last four arguments apply. The last argument should be “NUME” to activate numerical integration. The other three options relate to the “integration significance level,” “integration key (value of 1 to 6),” and “work array length (value of 100 to 500),” although these are optional and need not be specified. Note that if numerical integration is used, the RPSD calculations in /POST26 will not work properly.
```

### SUBOPT

```txt
SUBOPT,,,,,,,,SubConvTol
Sets convergence tolerance for modal analysis w/ subspace method. SubConvTol defaults to 1e-5 [at 5.3] and can be tightened to 1e-12 or loosened to speed up convergence.
```

### THOPT

```txt
THOPT, Option, ReformTol, nTabPoints, TempMin, TempMax
Uses fast thermal solver option, beta at 5.6, released at 5.7.
The link above refers to the outline of the usage of THOPT.
```

### TINTP

```txt
TINTP,,,,,,,npoint,ntol
By default, automatic time-stepping will target 20 points/cycle. The undocumented fields are "npoints" points/cycle with a tolerance of +/- "ntol" points/cycle.
```

### TRNOPT

```txt
TRNOPT, Method, MAXMODE, Dmpkey, MINMODE, MCout
The MCout argument is undocumented, where it can take the values of "yes" or "no" (default). It writes out modal coordinates in an external text file called "jobname.mcf" for mode-superposition method.
[STI: from release 7.0 and above]
```

### VFOPT

```txt
VFOPT,none
Usually, radiosity solution method writes viewfactor file (jobname.vf) to disk, then also stores it in memory. This option prevents writing VF file and only stores viewfactors in memory. Note that, upon exiting ANSYS, viewfactors are not stored in database jobname.db, so it would have to be recomputed later.
Viewfactor file (jobname.vf) can be large, so this option prevents writing to disk, useful if you know you won't be needing the VF file to read from for subsequent sessions.
```

### VFSM

```txt
VFSM,encl_num,1.0
Scales viewfactors to force the sum to be 1.0 with the Radiosity Solver.
For some situations of closed enclosures, the viewfactors may not add up to 1 (such as if the mesh may be coarse). This scales all viewfactors to force them to be 1, so no space node/temperature needs to be defined for the closed case.
Please note that VFSM is now documented at ANSYS 12.0.1, but the syntax of the command has changed, so please refer to the Commands Reference for details.
```

### \*GET,,ACTIVE

```txt
*GET,Parm,ACTIVE,0,SOLU,CNVG
You can also \*GET the convergence indicator, where 0=not converged; 1=converged.
```

### \*GET,,ACTIVE

```txt
*GET,parm,ACTIVE,,SET,NSET
Retrieves the total number of results sets which are stored in the results file.
```

### \*GET,,CINT

```txt
*GET,parm,CINT,cnum,CTIP,node,CONT,cnum,DTYPE,data
Gets the J-Integral or Stress Intensity Factor values. This is documented in 12.0 but maybe not as clearly as one may like. Upper-case letters are literal values used in this \*GET.

cnum: CINT ID number (same ID as when contour was defined with CINT,NEW,cnum)
node: node number at crack tip
cnum: contour number (from 1 to max where max is from CINT,NCON,max)
data: jint is J-integral value. Use k1, k2, or k3 for stress intensity factors. iin1 through iin3 are the interaction integrals 1-3. Default (if left blank) is jint.
```

### \*GET,,COMMON

```txt
To retrieve the node number at which the minimum or maximum results value occurs, first plot the nodal results of interest using the PLNSOL command, then execute one of the following:

\*GET,Parm,COMMON,,CPOST1,,INT,107
to retrieve the node at which the minimum result value occurs, or

\*GET,Parm,COMMON,,CPOST1,,INT,108
to retrieve the node at which the maximum result value occurs.

To determine whether the results are for the top, middle, or bottom of shells, use the following command:

\*GET,Parm,COMMON,,CPOST1,,INT,5
Where PARM=1 for top, =2 for middle, =3 for bottom.

There are many other potential quantities of interest listed in the cpost1.inc file in the custom\include directory.
```

### \*GET,,NODE

```txt
There is an undocumented *GET/*VGET for reaction forces as follows:
*GET,par,NODE,n,RF,Lab
where Lab can be UX,UY,UZ,ROTX,ROTY,ROTZ, or FX,FY,FZ,MX,MY,MZ
The *VGET is the same.
[STI: *GET for reaction force is documented at 5.6 but \*VGET is not documented at 5.5 or 5.6]
```

### \*GET,,PLNSOL

```txt
*GET,parm,PLNSOL,,max
Works on both PLESOL and PLNSOL to obtain min/max values of last contour plot (use bmax/bmin to obtain bound value with Full Graphics on and ERNORM on). Note that the format is still "PLNSOL" as 3rd argument, although your plot may be of element solution (PLESOL).
```

### \*MOPER

```txt
*MOPER,sval(n),eloc(n,3),SGET,elem(n),label,comp
Finds stresses at certain points. This requires use of the \*MOPER,,,INTP undocumented command prior to executing this command.
sval(n): output array containing stresses at the points of interest
eloc(n,3): input array containing relative locations inside the elements (output from INTP)
elem(n): input array containing element numbers related to the relative locations of "eloc" (output from INTP)
label,comp: stress component of interest (see PLNSOL,S for examples)
```

### /GST

```txt
/GST,Lab,Lab2
In batch mode, /GST,ON will write convergence data to file.gst using the ANSYS Graphics format (use Display utility to plot file).
On the other hand, /GST,ON,ON will write convergence data to file.gst using an XML format (use the Results Tracker utility from the ANSYS Product Launcher, Tools menu to plot file).
```

### /PGRPH

```txt
/PGRPH,SAVE
Issue "SET" commands and "/PGRPH,SAVE" after each results set you want to save as PowerGraphics file format. A file called "jobname_LS_SS.pgr" will be generated for each results set based on LS (Load step) and SS (Substep).
[STI: This feature is available at 5.6 but officially released at 5.7. At 5.7, however, the procedure is very different. See POUTRES, PGWRITE, PGSAVE, PGRAPH, PGRSET commands at 5.7 for more details]
```

### /PGRPH

```txt
/PGRPH,ON
This command will change ANSYS's behavior such that the PowerGraphics files ('jobname_LS_SS.pgr') will be used instead of the actual results set after subsequent "SET" commands. The PowerGraphics files provide faster plotting like PowerGraphics but still has some features/behavior present with Full graphics.
[STI: This feature is available at 5.6 but officially released at 5.7. At 5.7, however, the procedure is very different. See POUTRES, PGWRITE, PGSAVE, PGRAPH, PGRSET commands at 5.7 for more details]
```

### AVPRIN

```txt
AVPRIN,,effnu
AVPRIN also works in /POST26 (it is documented only to work with /POST1). Issue AVPRIN,,effnu with effnu prior to any PRVAR or PLVAR commands (this is where the actual calculations are performed).
[STI: This works at 5.6.2; I don't know about earlier releases. The whole equivalent strain thing may be resolved in a cleaner fashion by 5.7.1, at the earliest]
```

### DADD

```txt
dadd,labr,lab1,lab2,fact1,fact2,const

LABR = (FACT1 X LAB1) + (FACT2 X LAB2) + CONST

Where:
labr = DOF result (usually same as lab1)
lab1 = DOF used for calcs
lab2 = DOF used for cals
fact1 = Scale factor applied to lab1
fact2 = Scale factor applied to lab2
const = Constant value

This command subtracts out rigid body displacements so you can view deformed shapes better.
Note: when power graphics is on, the updated displacement may not be displayed after the command is entered and a "pldisp" is performed. You can either do an "ALLSEL$/REPLOT" or turn off power graphics "/GRAPH,FULL$/REPLOT".

[Verified in 6.1]
```

### EXPROFILE

```txt
EXPROFILE,ldtype,load,value,pname,fname,fext
Exports ANSYS data as CFX-Pre profile data.
To export ANSYS data to CFX-Pre, perform the following steps:

  Flag surface or volumetric data to export by an "interface number" with the VAL2 argument of SF,,FSIN,,val2 or BFE,,FVIN,,val2 commands
  Use EXUNIT command to specify units for export.
  Use EXPROFILE command to generate the CFX profile file.

For EXPROFILE, the following are the arguments:
ldtype: SURF or VOLU
load: for ldtype=SURF, DISP, TEMP, or HFLU; for ldtype=VOLU, DISP, FORC, or HGEN
value: surface or volume interface number specified with VAL2 argument of SF,,FSIN or BFE,,FVIN
pname: field name in CFX profile file
fname, fext: filename and extension for CFX profile file

[STI: beta in 9.0, fully documented in 10.0]
```

### EXUNIT

```txt
EXUNIT,ldtype,load,untype,name
Specifies units for export of ANSYS data as CFX-Pre profile data.
To export ANSYS data to CFX-Pre, perform the following steps:

    Flag surface or volumetric data to export by an "interface number" with the VAL2 argument of SF,,FSIN,,val2 or BFE,,FVIN,,val2 commands
    Use EXUNIT command to specify units for export.
    Use EXPROFILE command to generate the CFX profile file.

For EXUNIT, the following are the arguments:
ldtype: SURF or VOLU
load: for ldtype=SURF, DISP, TEMP, or HFLU; for ldtype=VOLU, DISP, FORC, or HGEN
untype: units are either COMM or USER
name: unit name is SI or FT for untype=COMM

[STI: beta in 9.0, fully documented in 10.0]
```

### FSUM

```txt
FSUM,,CONT
Sums contact forces only for CONTA171-174 (at 5.6.1)
```

### FTST

```txt
FTST,SEQV
Uses equivalent stress in fatigue calculations. Issue prior to FTCALC command. [5.4]
```

### FTST

```txt
FTST,SINT
Uses stress intensity in fatigue calculations. Issue prior to FTCALC command. [5.4]
```

### NFORCE

```txt
NFORCE,CONT
Calculates nodal contact forces only for CONTA171-174 (at 5.6.1)
```

### PLESOL

```txt
PLESOL,ENER,work
PRESOL,ENER,work
PLNSOL,ENER,work
PRNSOL,ENER,work
ESOL,var,elem,node,ENER,work (/POST26)
At 5.7, this will plot energy of elements. Specifically, "work" should be "elwk", "plwk", or "crwk" for elastic, plastic, and creep strain energies, respectively. This is available in 5.7 only.
For example, issue:
PLESOL,ENER,ELWK
to view elastic strain energies (at integration points). [STI: Note that this is for 5.7/5.7.1 only. At 6.0, PLESOL,SENE has been introduced instead, so this output is no longer valid.]
```

### PLESOL

```txt
PLESOL,NL,CREQ
PRESOL,NL,CREQ
Plots (or lists) cumulative creep strain. Similar to NL,EPEQ which is cumulative plastic strain.
```

### PLOT33.F

```
(ANSYS, Inc.)
Old source code (ANSYS 5.4?) for [PLOT33](https://github.com/affinitylinks/ansys.net/blob/main/1/plot33.f) program to read GRPH files (ANSYS Graphics Files)
```

### PLVECT

```txt
PLVECT,S,1
Plots only first principal stress instead of plotting all three vectors at once.
```

### RESWRITE

```txt
RESWRITE,filename,load step, substep, time
Three additional fields are available in RESWRITE to specify the load step, substep, and time values. Basically, this will append results to the results file - it is a shorthand for using FILE and RAPPND, although the above undocumented options for RESWRITE give the user control over the substep number as well.
```

### RISK

```txt
RISK,A1,A2,A3,A4,A5,A6,A7,A8,A9
Scatter, failure, or design analysis of SEQV or SINT from PSD analysis.
See Section 2.4 of the PSD Postprocessing Tip for details on this usage.
```

### SET

```txt
SET, Lstep, SBSTEP, FACT, KIMG, TIME, ANGLE, NSET, ORDER
For the KIMG argument, the words phase or ampl can be used to plot or print phase angles or amplitude in /POST1 for a damped system.
```

### SRCS

```txt
SRCS, NTURN, CURR, FREQ, PSYM, CSYM
NTURN: Number of turns in the coil winding. Input the total number of windings regardless of the symmetry used in the model.
CURR: Current per turn applied to the coil. Required only for a three-dimensional analysis (the value is calculated for a two-dimensional analysis and is returned as the parameter IWIND).
FREQ: Harmonic frequency of coil current (in Hertz). Required only if terminal voltage (VLTG) is to be calculated. Assumes that eddy currents are neglected.
PSYM: Planar symmetry factor. Used when a symmetric model is used through the cross-section of the coil. The factor is applied to the terminal parameter calculations. For example, if an axisymmetric coil is modeled with symmetry about the X-axis, the symmetry factor would be 2. Defaults to 1.
CSYM: Circumferential symmetry factor. Used only for three-dimensional analysis when a circular-symmetric model is used. For example, if a 90 degree sector is modeled, the symmetry factor (to scale to a full 360 degree model) would be 4. Defaults to 1.

Undocumented at ANSYS 5.7, SRCS is a macro that is still available in the "apdl" subdirectory in ANSYS 11.0. SRCS is limited to linear models. The LMATRIX command, however, is applicable to both linear and nonlinear models, so LMATRIX should be used instead of SRCS.
```

### STORE

```txt
STORE,PSD,num,1
The last argument, when set to 1, will use evenly-spaced points for RPSD calculations rather than automatically-generated points. (The default is automatic and recommended)
```

### TFUN

```txt
TFUN,reference,variable,psd_table,name
Plot transfer function.
See Section 6 of the PSD Postprocessing Tip for details on this usage.
```

### TLSPRM

```txt
Macro performs s-parameter extraction for transmission line (HF Emag). Available in 6.1 in "docu" directory as a macro - see contents of macro file for usage.
```

### \_BUTTON

```txt
Provides information on what button a user pushed in a dialog box. Useful in conjunction with the MULTIPRO command (see below)
0 if the OK button was pressed
1 if the Cancel button was pressed
```

### \_STATUS

```txt
Executing an ANSYS command, whether in a macro or elsewhere, generates the parameter \_STATUS. This parameter reflects the error status of that command:
0 for no error
1 for a note
2 for a warning
3 for an error
[STI: Please see Ch. 4.7 "Using the _STATUS and _RETURN Parameters in Macros" in the ANSYS APDL Guide for more information. A similar parameter _ERROR returns 0 for no error, 1 for warning, 2 for error after a command.]
```

### \*GET,,ACTIVE

```txt
*GET,Parm,ACTIVE,,SYNAME,,START,1
Gets the first 8 characters of the OS name (such as INTELNT). For more than 8 characters, use "9" for the START modifier. Note that some platforms may change between 5.4 through 5.6 (such as HPPA 8000).

A list of returned values for systems are shown below (for 8.0, although some systems listed below may no longer be supported):
RS6000 64
RS6000
HPPA 7000
HPPA 8000
HPPA 8000-64
HP IA64
SGI32
SGI64
SUN-USIII
FUJITSU
SOLARIS64
SOLARIS
DECAXP-OSF1
WINDOWS 64
INTEL NT
LINUX IA32
LINUX IA64
SUN4 SPARC
```

### \*GET,,ACTIVE

```txt
*GET,Parm,active,,date
Gets current system date (year, month, then day), for example, "20000704.0" for 07/04/2000.
Where year=nint(currdate/10000); month=nint((currdate-year*10000)/100); date=currdate-(year*10000+month\*100)
[STI: I haven't found a way to grab the current time yet...]
```

### \*GET,,ACTIVE

```txt
*GET,Parm,active,,update
At 5.5, get the current ANSYS version or update number. For example, in 5.5.2, it returns 19990107.0. For 5.5.3, it returns 19990405.0
```

### \*GET,,ACTIVE

```txt
*GET,parm,ACTIVE,,AGREE
Gets agreement number
[STI: I found this one for a customer wanting to encrypt a macro for a specific company (agreement number). Kinda cool, IMHO.]
```

### \*GET,,COMMON

```txt
*get,parm,COMMON,,d3com2,,int,31
Gets the status of /UIS,MSGPOP. When writing macros you sometimes don't want those pesky warning messages to pop up all the time, so you use /uis,msgpop,3 to suppress them and put them back on with /uis,msgpop,0. The problem is if your macro is called by a macro that changed the msgpop status, then you kind of mess stuff up. The answer is to get the msgpop status before you change it then set it back.

Example usage:
\*get,\_oldMPS,COMMON,,d3com2,,int,31
/uis,msgpop,3
! Do my stuff
! ...
! ...
! ...
! Done with the stuff I want to suppress messages on
/uis,msgpop,\_oldMPS
```

### \*RETURN

```txt
*RETURN,value
Break reading from an input file
Where value=0 returns to the top level, -n returns n levels, n returns to level n
Useful when breaking *DO loops or *IF conditional statements, for example.
[STI: Implemented at 5.7?]
```

### /AUX02

```txt
Binary file dump. Enter /AUX02 to find list of applicable commands.

Example usage from John Swanson:

/aux2 ! enter file dump utility
file,foo,rst ! specify file name
form,long ! dump the full record of information
dump,2 ! dump the second record (index record) xxx is the 11th integer
ptr,xxx ! dump the record at pointer xxx (this is an index of all the load sets.) The last non-zero integer is the last load set. The others are the load sets in order. This is the way to get the other load cases. Call this pointer yyy
ptr,yyy+103 ! this is the location of the double precision header for this load set (103 skips the integer header) omegay is the 13th value.

If you look at the file fdresu.inc (File Descriptor Result) on the distribution media you will see a full description of the structure of the .rst file, and you may be able to derive or modify the above sequence for accessing other information.
```

### /AUX03

```txt
Results file editor. Enter /AUX03 to find list of applicable commands.
```

### /CONFIG

```txt
/CONFIG,PRXY,1
At 6.0, if Poisson's ratio is not input, a warning is presented to the user to let him/her know that a default value of 0.3 will be used. This configuration command changes the warning to a note, so there will not be a ton of warning messages issued during solve.
An alternative is to add in the config6x.ans file:
PRXY_DEF = 1
```

### /CONFIG

```txt
/CONFIG,NODBB,1
Toggles whether or not the backup database file (jobname.dbb) will be written upon SAVE or /EXIT
```

### /CONFIG

```txt
/CONFIG,NOCMDDB,1
or
NO_CMDDB=1 in config56.ans
Supresses addition of command history in database log file (LGWRITE).
```

### /CONFIG

```txt
/CONFIG,NOELDBW,num
Controls writing of results info
1=do not write results to _.db but only _.rst
2=do not write results to _.rst, only _.db
3=do not write to either _.rst or _.db)
[STI: I use /CONFIG,NOELDB,1 to give max memory during solution rather than filling up database space -db with results. Please see CSI's Tip of the Week on memory management for more details. This was documented from 5.7 onwards, I believe.]
```

### /CONFIG

```txt
/CONFIG,RESUPRES,0
or
RESUPREC=0 in config145.ans

In ANSYS 14.5, stresses, strains, and other element quantities are written in the result file (.rst) as single precision to save space (DOF solution and reaction forces are still written as double-precision). This command, when invoked before solving, will store all results in double-precision.
```

### /DEBUG

```txt
The /DEBUG command generates debugging at various points in the output. You can specify one of three formats for /DEBUG: solution debug format, element debug format, and general debug format.
[STI: Please see this link for more details on /DEBUG]
```

### /DEMO

```txt
/DEMO,num,1
Allows graphics benchmarks to be performed (getting a rough idea of graphics card performance). This command rotates the model "num" number of times and prints a summary of stats.
```

### /DFLAB

```txt
/DFLAB,dofnum,dlabel,flabel
Changes DOF #dofnum to "dlabel" (D) and Force to "flabel" (F). DOF numbers range from 1-32. For example, DOF number 1 is UX, 2 is UY, etc.
This should be the first command issued upon entering ANSYS.
/DFLAB,19,PRESSURE changes PRES label (#19) to PRESSURE
```

### /MSTART

```txt
/MSTART,MTOOL,off
This turns off/on the Mechanical Toolbar. For ANSYS/Professional, if you want to start ANSYS without the Mechanical toolbar, add the following lines to your start56.ans file:
/MSTART,MTOOL,OFF
/MSTART,MAIN,ON
/MSTART,INPUT,ON
/MSTART,TOOL,ON
```

### /NERR

```txt
/NERR,,,field
Ignores all error messages
If field is set to -1, ANSYS will keep running unless a fatal error occurs. All errors are written to jobname.out and jobname.err.
If field is set to -2, ANSYS will behave the same but errors are reported to jobname.err only, not jobname.out.
```

### /TRACK

```txt
/TRACK,MonLevel,PrintLevel,SumLevel
The /TRACK command issues a message when the program logic enters and leaves some of the higher level subroutines. Subroutines TrackBegin and TrackEnd (see Chapter 6 of UPF Guide) set up the /TRACK command.
MonLevel is the level for timing monitoring. PrintLevel is the level for enter/exit printout, and SumLevel is the level at which the timing sum is output. Each of these arguments can be any value between 0 and 9 (default is 0).
You can use the /TRACK command to identify which section of code is causing the program to abort. For example, to flag up to eight levels of subroutines to determine when the program logic enters and leaves them, you would issue the command /TRACK,,8.

Another very useful feature is to use /TRACK to get contact element statistics during solution in a batch run. Use /TRACK,,1,-1 and you will see contact & solution stats printed at the end of the run (batch only).
```

### /TXTRE

```txt
/TXTRE,file,88
This option allows placement of an image on the screen (anywhere you want). A typical example of putting your own picture/logo in the bottom-right corner of the Graphics window is shown below:
/txtre,file,88,'MYLOGO','PNG',,2
/anum,1,13,1.5297,-0.98938
/lsym,1.556,-0.990,0,88,0.000,1
where "MYLOGO.PNG" is the name of your image file and "2" can be "0" for pixmap/bitmap, "1" or "jpeg" for JPEG, and "2" or "png" for PNG, as noted in the online-help for /TXTRE.

A similar command (this one is documented in /TXTRE) to replace the graphical ANSYS logo with your own is:
/txtre,file,51,'MYLOGO','PNG',,2
```

### /UIS

```txt
/UIS,MSGPOP,4
Suppresses error message pop-up dialog box. (Error messages will still be recorded in the jobname.err file and output window/file.)
```

### /UNDO

```txt
/UNDO,on
Turns on UNDO feature which is active for most commands (prior to session editor at 5.6). Saves a file to "jobname.undo". Valid options are "on, off, prompt, status".

UNDO
After /UNDO feature is activated above, this command actually undos the last command.
```

### 3D Graphics

```txt
By setting the environment variable ANSXXX to 1 and using OpenGL graphics (-d 3d), one can resize the window to any aspect ratio (not limited to max ratio of 1:1.67). Note that this doesn't work under Windows; it works for UNIX with OpenGL only (on HP-UX, you need to run the OpenGL version of ANSYS).
```

### ANSYS and Tcl/Tk customization

```txt
John Swanson
Information on using Tcl/Tk with ANSYS to create customized GUI. Tcl/Tk is used in ANSYS, such as the Contact Wizard, Solution Control Wizard, or Materials GUI at 5.7/6.0.
```

### ANSYS and UIDL customization

```txt
John Swanson
UIDL is the ANSYS language used to define the dialog boxes and Main Menu. This information is related to learning more about UIDL to create custom dialog boxes. An alternative is to use Tcl/Tk.
```

### ANSYSSTANDARD.TLB

```txt
You can swap the command line to the bottom by making a small change to the GUI resource file:

In your ANSYS 6.1 directory, go to docu/english/toolbars. Edit ANSYSSTANDARD.TLB and change the line that says:
*ANS_STD.location: n
to
*ANS_STD.location: s
[where "n" is for north and "s" is for south]

Likewise, to change the location of the "Main Menu" from left to right, edit:
*ANS_MAIN.location: w
to
*ANS_MAIN.location: e
[where "w" is for west and "e" is for east]
```

### CNTR

```txt
CNTR,PRINT,nlevel
CNTR,print,0 (default) - only print the troubleshooting when solution diverges in the end
CNTR,print,1 - above + print the troubleshooting when bi-section occurs
CNTR,print,2 - above + print the message for each load step
CNTR,print,3 - above + print the message for each sub-step
CNTR,print,4 - above + print the message for each iteration and much more
```

### DEBUG

```txt
When creating macros or input files, it is often useful to execute them one line at a time to determine where your programming logic breaks down. Placing this command as the first line in the file allows you to do this.
Type in "debug" to see command syntax.
```

### Dynamic Prompt Timeout

```txt
The dynamic prompt appears for 2 seconds by default in 6.0. To lengthen the time before the dynamic prompt disappears, do the following:

1. Make a backup of the file 'C:\Program Files\Ansys Inc\ANSYS61\LIB\Euidl1.0\scripts\anscmdprompt.itk'
2. Edit 'anscmdprompt.itk' at line 468, which contains the string " set \_helpWinAfter [after 2000 \", and change the value to the time in miliseconds you wish to have the help visible.

[At 7.0, this is controlled by line 69 ' variable _helpWinTimer 20000' instead, and default is 20 seconds]
```

### dynprompt57.ans

```txt
At 5.7, the dynamic input file prompting was introduced, where the command format was displayed as you typed a command.

Modify "dynprompt57.ans" to add your own macro argument format, so when you type your own macros, the proper arguments are also displayed.
[STI: at 6.0, this file is called "dynprompt60.ans", where the last two numbers indicate the version number.]
```

### Graphics Startup

```txt
GRPHENTR=1 in config56.ans
Allows startup of GUI mode without requiring the "-g" option when using command "ansys56".
```

### jobname.solc

```txt
Regarding the undocumented jobname.solc feature:

    Open up a text editor and place and /solu commands you want (not /SOLU itself). Main use I've seen of jobname.solc is really to change CNVTOL or NSUBST, although I think other options are available.
    Save file as jobname.solc in working directory.

If I recall correctly, jobname.solc will be deleted when it is read from, similar to jobname.abt. Also, I think it works on the next substep.
```

### KEYW

```txt
KEYW,BETA,1
Turns on GUI filtering of Beta features in releases of ANSYS. Add to "start5x.ans" file prior to launching ANSYS.
```

### KEYW

```txt
KEYW,ALPHA,1
Turns on GUI filtering of Alpha features? I find this pretty useless since the features are not as good/robust as beta (above), but it is cool to see upcoming features of ANSYS.
```

### KEYW

```txt
KEYW,QALOGKEY,1
Shows detailed information from the granule (GRN) files in the jobname.log file. This is handy to find out what the granule function name is (Fnc_xxx) for a given dialog box/menu.

When plotting experimental and calculated curves for *MOONEY/*EVAL, this isn't recorded in the log file. Using this keyword will show the commands necessary to plot the curves together (or you can manually use /NOERASE like I do).
```

### KEYW

```txt
KEYW,PR_SGUI,1
Supresses "Solution is done" message [5.5.3 and above]

Setting this keyword will not have an adverse effect on the menus, but to be safe, use the above setting for the SOLVE command only, then reset PR_SGUI to zero after SOLVE.
```

### KEYW

```txt
KEYW,SIMPLOFF,1
At 5.6, the "Abridged Menu" with the Solution Control Wizard is the default. I find that since the abridged menu or Solution Control wizard doesn't support all nonlinear or dynamics options, this confuses customers. If you put this in your start56.ans file, this will always show the unabridged menu (similar to 5.5 and prior versions). (STI)
```

### KEYW

```txt
keyw,cuwidget
Resets menus in case they may be grey and inaccessible.
```

### KEYW

```txt
KEYW,PR_SGVOF,1
When redefining arrays in an interactive session, the user is prompted if they really want to redefine an existing array. The above command disables this prompt in ANSYS 15.0 and above, so if an existing array is redefined with the \*DIM command, it will do so silently.

See also \*DEL,,NOPR.
```

### MULTIPRO

```txt
Useful means of prompting user for input for multiple variables (a cleaner alternative to *ASK).
The MULTIPRO macro is located in the "docu" directory (e.g., /ansys55/docu). This allows a user to specify a dialog box to prompt a user for several pieces of info (better alternative than several *ASK commands). View the MULTIPRO.MAC macro in a text editor to see how to use this command.
(Another nice use for MULTIPRO is a simple OK/Cancel dialog box)

Also, there is the Tcl version of the MULTIPRO macro with a Test macro.
Lastly, there is also a ANSYS and Tcl (10/20/99) package by John Swanson which covers a lot of applications of Tcl, including multiprompt.tcl.
```

### OUTEQ

```txt
OUTEQ outputs all results from equilibrium iterations while in /SOLU.
```

### Status Bar

```txt
\*ABSET,title40,[BAR|KILL|BOTH]
Creates a customized status/progress bar for use during a macro to give feedback to the user as to what % complete the macro is at.

*ABCHECK,percent,newtitle
Updates the status bar to "percent" complete with information printed as "newtitle"
What is useful is to make "newtitle" a parameter (%PARAM%) as well.
It is recommended not to call *ABCHECK more than 20 times in a loop. Also, be sure to check \_RETURN values prior to issuing this

\*ABFINI
Removes status bar

[STI: See ALSM.MAC, VLSM.MAC, and JB_FORC.MAC macros in the Macros page for examples]
```

### tlbrlist61.ans

```txt
Although undocumented, tlbrlist61.ans can be used to create customized toolbars. Copy this configuration file to your home or working directory. The contents of "tlbrlist61.ans" contain filenames, and these can be changed to point to different files.

The actual toolbar information is contained in ANSYSSTANDARD.TLB (icon toolbar) and ANSYSABBR.TLB (abbreviation toolbar). These can be copied and modified to suit one's needs, although one should know some Tcl/Tk and ANSYS to do this.
```

### UVBREFRESH

```txt
UVBREFRESH updates the Main Menu (UIDL).
First, set the environment variable UIDLVB to 1. It can be set in your .cshrc file with "setenv UIDLVB 1".
In ANSYS, at the BEGIN level, type UVBREFRESH to re-index and re-read the granule files. Note that this doesn't work with the root menu MenuRoot.
```

### ~EUI

```txt
~eui,wm iconify .dlgAnsysGUI
Minimize ANSYS window

~eui,wm deiconify .dlgAnsysGUI
Maximize ANSYS window

[STI: Works for 6.1 and above]
```

### ~EUI

```txt
~eui, 'puts [clock format [clock seconds] -format "%c"]'
This writes the current date and time to the Output Window/File.
```

### \*GET,,COMMON

```txt
*get,parm,COMMON,,d3com2,,int,31
Gets the status of /UIS,MSGPOP. When writing macros you sometimes don't want those pesky warning messages to pop up all the time, so you use /uis,msgpop,3 to suppress them and put them back on with /uis,msgpop,0. The problem is if your macro is called by a macro that changed the msgpop status, then you kind of mess stuff up. The answer is to get the msgpop status before you change it then set it back.

Example usage:
\*get,\_oldMPS,COMMON,,d3com2,,int,31
/uis,msgpop,3
! Do my stuff
! ...
! ...
! ...
! Done with the stuff I want to suppress messages on
/uis,msgpop,\_oldMPS
```

### \*MOPER

```txt
*MOPER,Eloc(1,1),XYZ(1,1),INTP,Elem(1)
where:
*dim,XYZ,array,nPts,3
*dim,Elem,array,nPts
\*dim,Eloc,array,nPts,3

This command finds the element containing the XYZ point, rather than the element with the closest centroid. The Eloc array is the element coordinates of the point.
Compare this, for example, with the \*MOPER,,,ENEAR option.
```

### \*UILIST

```txt
*UILIST,filename,ext,dir
Lists the contents of a file to a 'pop-up' window when running interactively. It is similar to the *LIST command but this version runs from within a macro while *LIST does not.
```

### /AN3D

```txt
/AN3D for 3D annotation is documented at 5.6. It is undocumented but available at 5.5.
The following are the ANSYS 5.5 /AN3D commands.

/AN3D,POIN,x,y,z
/AN3D,LINE,x1,y1,z1,x2,y2,z2
/AN3D,AREA,npt,x1,y1,z1,x2,y2,z2,x3,y3,z3,x4,y4,z4
/AN3D,ARRO,symsiz,x1,y1,z1,x2,y2,z2
/AN3D,TEXT,x,y,z,text
/AN3D,SYMB,itype,x,y,z,size
```

### /DEV

```txt
/DEV,PSFN,NINC
Turn off incrementing of JPEG filenames (suppress the 'nnn' in jobnamennn.jpg).

/DEV,PSFN,NONINC
Resume incrementing of JPEG files.
```

### /DIRGET

```txt
/dirget,parm,filename,fileext
Gets the list of files with the file extension "filename" or "fileext"
For example:
/dirget,\_str,all,tif
Gets all filenames with extension "TIF"
[STI: Note: This may only work on UNIX at 5.6.1, not on NT. I keep getting bombed out of ANSYS using this command on NT. Also, for 5.7 and above, look at the /INQUIRE command and strings for same functionality.]
```

### /ENCRYPT

```txt
/ENCRYPT,Encryption_key,File_name,File_ext,Directory_Path/
The commands /ENCRYPT and /DECRYPT allow one to encrypt macros. See APDL Programmer's Guide for more details.
```

### /HOLD

```txt
/HOLD,filename,timeint,timeout
Read a command from file "filename" if it exists. If it doesn't exist, wait "timeint" seconds, then keep trying again until "timeout" seconds.
```

### /PNUM

```txt
/PNUM,DOMAIN,1
Shows domains generated for domain decomposition solver (DDS). Beta at 5.6, 5.7, but it is documented at 6.0.
```

### /RMTMP

```txt
Removes/closes the file specified in /INPUT after it is read. /RMTMP should be the last command in the input file.
```

### /TEE

```txt
/TEE,(new,append,end),filename,ext,dir
Echos the input automatically to another text file designated as the model is created.
[STI: This is an official command in 5.6]
```

### /TXTRE

```txt
/TXTRE,file,88
This option allows placement of an image on the screen (anywhere you want). A typical example of putting your own picture/logo in the bottom-right corner of the Graphics window is shown below:
/txtre,file,88,'MYLOGO','PNG',,2
/anum,1,13,1.5297,-0.98938
/lsym,1.556,-0.990,0,88,0.000,1
where "MYLOGO.PNG" is the name of your image file and "2" can be "0" for pixmap/bitmap, "1" or "jpeg" for JPEG, and "2" or "png" for PNG, as noted in the online-help for /TXTRE.

A similar command (this one is documented in /TXTRE) to replace the graphical ANSYS logo with your own is:
/txtre,file,51,'MYLOGO','PNG',,2
```

### /UI

```txt
/UI, COPY, SAVE, JPEG
This undocumented option of the /UI command creates a JPEG file of the current graphics window. Also, see
/ui,copy,save,jpeg,graph,color,reverse,portrait or
/ui,copy,save,jpeg,grap,colo,norm,port,,100
```

### /UI

```txt
/UI, WSIZE, xstart, ystart, xdist, ydist
This moves/modifies the graphics window size. Specify xstart as pixels from left side of screen, ystart as pixels from top of screen, and distance in pixels.
For example, issue "/ui,wsize,175,175,700,700/1.325" to see the window positioned 175 pixels from top left corner of screen with a width of 700 (preserving 1.325 aspect ratio).
```

### /UI

```txt
/UI,RAISE
Raises the Graphics Window to the forefront. Useful with /UI,copy,save,jpeg to make sure no other toolbars, widgets, etc. obscure view.
```

### /UI

```txt
/ui,copy,save,png,graph,color,reverse,portrait,yes
Generates a PNG file of the active contents of the ANSYS Graphics window [verified at 6.0].
```

### /XML

```txt
/XML,filename,ext,directory
This ANSYS command allows to write current load step results in XML format for use in Workbench Simulation.
Similar to other ANSYS commands, the 2nd through 4th arguments allow specification of the filename to save to. "Filename" defaults to the jobname, "Ext" defaults to "xml", and "Directory" defaults to the current working directory. Use of this command will write out geometry and results, as specified by the XMLOPT undocumented command.
```

### ABTOANS

```txt
From 8.0 onwards, an undocumented macro ABTOANS allows user to convert an ABAQUS input file to ANSYS.
```

### ANSYS and Tcl/Tk customization

```txt
John Swanson
Information on using Tcl/Tk with ANSYS to create customized GUI. Tcl/Tk is used in ANSYS, such as the Contact Wizard, Solution Control Wizard, or Materials GUI at 5.7/6.0.
```

### ANSYS and UIDL customization

```txt
John Swanson
UIDL is the ANSYS language used to define the dialog boxes and Main Menu. This information is related to learning more about UIDL to create custom dialog boxes. An alternative is to use Tcl/Tk.
```

### CMWRITE

```txt
CMWRITE,Fname,Fext,Fdir,ipos,[_ | BLOCK | UNBLOCK]
Write component information to file, where ipos = 0,write at beginning of file, 1, write at end of file
For 7.0 and later.
```

### Dynamic Prompt Timeout

```txt
The dynamic prompt appears for 2 seconds by default in 6.0. To lengthen the time before the dynamic prompt disappears, do the following:

1. Make a backup of the file 'C:\Program Files\Ansys Inc\ANSYS61\LIB\Euidl1.0\scripts\anscmdprompt.itk'
2. Edit 'anscmdprompt.itk' at line 468, which contains the string " set \_helpWinAfter [after 2000 \", and change the value to the time in miliseconds you wish to have the help visible.

[At 7.0, this is controlled by line 69 ' variable _helpWinTimer 20000' instead, and default is 20 seconds]
```

### EXPROFILE

```txt
EXPROFILE,ldtype,load,value,pname,fname,fext
Exports ANSYS data as CFX-Pre profile data.
To export ANSYS data to CFX-Pre, perform the following steps:

    Flag surface or volumetric data to export by an "interface number" with the VAL2 argument of SF,,FSIN,,val2 or BFE,,FVIN,,val2 commands
    Use EXUNIT command to specify units for export.
    Use EXPROFILE command to generate the CFX profile file.

For EXPROFILE, the following are the arguments:
ldtype: SURF or VOLU
load: for ldtype=SURF, DISP, TEMP, or HFLU; for ldtype=VOLU, DISP, FORC, or HGEN
value: surface or volume interface number specified with VAL2 argument of SF,,FSIN or BFE,,FVIN
pname: field name in CFX profile file
fname, fext: filename and extension for CFX profile file

[STI: beta in 9.0, fully documented in 10.0]
```

### EXUNIT

```txt
EXUNIT,ldtype,load,untype,name
Specifies units for export of ANSYS data as CFX-Pre profile data.
To export ANSYS data to CFX-Pre, perform the following steps:

    Flag surface or volumetric data to export by an "interface number" with the VAL2 argument of SF,,FSIN,,val2 or BFE,,FVIN,,val2 commands
    Use EXUNIT command to specify units for export.
    Use EXPROFILE command to generate the CFX profile file.

For EXUNIT, the following are the arguments:
ldtype: SURF or VOLU
load: for ldtype=SURF, DISP, TEMP, or HFLU; for ldtype=VOLU, DISP, FORC, or HGEN
untype: units are either COMM or USER
name: unit name is SI or FT for untype=COMM

[STI: beta in 9.0, fully documented in 10.0]
```

### KEYW

```txt
keyw,cuwidget
Resets menus in case they may be grey and inaccessible.
```

### OPFACT

```txt
OPFA,3LEV
To perform a 3-level BOX-BEHNKEN factorial analysis:
OPTYP,FACT
OPFA,3LEV
```

### PLOT33.F

```txt
(ANSYS, Inc.)
Old source code (ANSYS 5.4?) for PLOT33 program to read GRPH files (ANSYS Graphics Files)
```

### RMXPORT

```txt
RMXPORT,ATOV
Translate ANSYS ROM into Verilog-A

RMXPORT,VTOA
Translate Verilog-A into ANSYS ROM
```

### RPnnn

```txt
RPnnn, vinc1, vinc2, ...
The RPnnn command works similar to *REPEAT,nnn. For example, instead of using *REPEAT,3 to repeat the previous commands a total of 3 times, one can use RP3 instead. The second argument (value increment) of RPnnn is the same as the third argument of \*REPEAT.
```

### XMLOPT

```txt
XMLOPT,options
This ANSYS command allows to write current load step results in XML format for use in Workbench Simulation.
"Options" can be the following:

    ALL - all results
    DOFS - nodal results
    S - stress results at the nodes
    EPEL - elastic strain
    EPPL - plastic strain
    (EPTO - total strain: obsolete)
    CONT - contact results
    PARM - parameters
    RFOR - reaction forces
    TG - thermal gradients at the nodes
    TF - thermal flux at the nodes
    (RESULTS - convenience label to include the S, EPTO, TG, TF results: obsolete)

See also /XML undocumented command to write results to file.
```

## WORKBENCH FEATURES

### /XML

```txt
/XML,filename,ext,directory
This ANSYS command allows to write current load step results in XML format for use in Workbench Simulation.
Similar to other ANSYS commands, the 2nd through 4th arguments allow specification of the filename to save to. "Filename" defaults to the jobname, "Ext" defaults to "xml", and "Directory" defaults to the current working directory. Use of this command will write out geometry and results, as specified by the XMLOPT undocumented command.
```

### NO_WEAK_SPRINGS

```txt
Set variable "no_weak_springs" to "1" to disable use of weak springs in DesignSpace, if you do not want this feature.
"(DS will add weak springs for several reasons. First it will add them if it detects that your model is underconstrained. Secondly it will add them if it finds contact conditions other than bonded. This is because although you are specifying no-separation, the parts may still slide relative to one another. Weak springs are added in case you do not provide adequate constraint to prevent free sliding. Assuming you have real life loads and adequate constraints to stop free sliding, the weak springs should have no affect on your answer and the message can be ignored.)", Al Hancq (ANSYS, Inc.)
```

### prefs.contourCount

```
Add this line to your script file to be able to set the number of legend contours:
prefs.contourCount = 4; // sets the number of contours to 4
```

### RIGID_MOMENTS

```txt
Set DesignSpace variable "rigid_moments" to "1" if you want to use DesignSpace v5 moment application in DesignSpace v6.
"(In DesignSpace 5, when applying moments to a surface, this was done through stiff springs. This also made the surface act rigidly.
In DesignSpace 6, force couples are used instead to apply the moment, allowing the surface to deform. This is more representative of what happens when a moment is applied, as an applied moment should not make the surface act rigidly.
If the user wants to use the older DesignSpace 5 method of applying moments, setting the above variable will do so. This would also produce same answers in DesignSpace 6 as in 5, if the user saw a discrepancy between revisions.)"
```

### WB OLD PRESTRESS

```txt
Workbench Mechanical 13.0 introduces a new way of performing prestressed modal analyses with the PERTURB command. To use the older method of prestressed modal analyses (PSTRES command), set the operating system environment variable "WB OLD PRESTRESS" to a value of 1. (On Windows, use the System control panel to define this environment variable.)

Note that in the Static Structural system, you need to save the MAPDL database under the "Analysis Settings" branch since the Modal analysis system needs to resume the database.
```

### XMLOPT

```txt
XMLOPT,options
This ANSYS command allows to write current load step results in XML format for use in Workbench Simulation.
"Options" can be the following:

    ALL - all results
    DOFS - nodal results
    S - stress results at the nodes
    EPEL - elastic strain
    EPPL - plastic strain
    (EPTO - total strain: obsolete)
    CONT - contact results
    PARM - parameters
    RFOR - reaction forces
    TG - thermal gradients at the nodes
    TF - thermal flux at the nodes
    (RESULTS - convenience label to include the S, EPTO, TG, TF results: obsolete)

See also /XML undocumented command to write results to file.
```
