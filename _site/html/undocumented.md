---
title: Undocumented Features
author: 'ansys.net'
description: 'Undocumented commands & features'
tags:
  - html
  - undocumented
  - inquiry
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

#### 1

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

#### 2

```txt
*MOPER,Eloc(1,1),XYZ(1,1),INTP,Elem(1)
where:
*dim,XYZ,array,nPts,3
*dim,Elem,array,nPts
\*dim,Eloc,array,nPts,3

This command finds the element containing the XYZ point, rather than the element with the closest centroid. The Eloc array is the element coordinates of the point.
Compare this, for example, with the \*MOPER,,,ENEAR option.
```

#### 3

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

### \*VFUN

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
