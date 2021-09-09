---
title: '*GET commands/functions'
author: 'ansys.net'
description: 'Undocumented *GET commands'
tags:
  - html
  - undocumented
  - get
---

## {{title}}

_{{ author }}_

### \_RETURN

Parameter returns number of geometry entity just created (5.3 does not support \_return for the L command)
[STI: Please see Ch. 4.7 "Using the _STATUS and _RETURN Parameters in Macros" in the ANSYS APDL Guide for more information]

### \*GET,,ACTIVE

\*GET,Parm,ACTIVE,,SYNAME,,START,1
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

### \*GET,,ACTIVE

\*GET,Parm,ACTIVE,0,SOLU,CNVG
You can also \*GET the convergence indicator, where 0=not converged; 1=converged.

### \*GET,,ACTIVE

*GET,Parm,active,,date
Gets current system date (year, month, then day), for example, "20000704.0" for 07/04/2000.
Where year=nint(currdate/10000); month=nint((currdate-year*10000)/100); date=currdate-(year\*10000+month\*100)
[STI: I haven't found a way to grab the current time yet...]

### \*GET,,ACTIVE

\*GET,Parm,active,,update
At 5.5, get the current ANSYS version or update number. For example, in 5.5.2, it returns 19990107.0. For 5.5.3, it returns 19990405.0

### \*GET,,ACTIVE

\*GET,parm,ACTIVE,,SET,NSET
Retrieves the total number of results sets which are stored in the results file.

### \*GET,,ACTIVE

\*GET,parm,ACTIVE,,AGREE
Gets agreement number
[STI: I found this one for a customer wanting to encrypt a macro for a specific company (agreement number). Kinda cool, IMHO.]

### \*GET,,CDSY

\*GET,Parm,CDSY, ,NUM,MAX
Gets the max local coord. system number
You can also use the inquiry function MAXCSYS = csyiqr(0,14)

### \*GET,,CE

\*GET,Parm,CE,CeNum, TERM, num, [COEF | NODE | DOF]
Gets the node number, DOF, or coefficient in CE #CeNum, #num term.
The DOF key is as follows: 1=ux, 2=uy, 3=uz, 4=rotx, 5=roty, 6=rotz, 7=ax, 8=ay 9=az, 10=vx, 11=vy, 12=vz, 19=pres, 20=temp, 21=volt, 22=mag, 23=enke, 24=ends, 25=emf, 26=curr

### \*GET,,CE

\*GET,Parm,CE,CeNum, [NTERM | CONST]
Gets the total number of terms or the constant for CE

### \*GET,,CE

\*GET,Parm,CE,0,[MAX | NUM]
Gets the total #num number of CEs defined or the #max number of CEs.

### \*GET,,CINT

\*GET,parm,CINT,cnum,CTIP,node,CONT,cnum,DTYPE,data
Gets the J-Integral or Stress Intensity Factor values. This is documented in 12.0 but maybe not as clearly as one may like. Upper-case letters are literal values used in this \*GET.

cnum: CINT ID number (same ID as when contour was defined with CINT,NEW,cnum)
node: node number at crack tip
cnum: contour number (from 1 to max where max is from CINT,NCON,max)
data: jint is J-integral value. Use k1, k2, or k3 for stress intensity factors. iin1 through iin3 are the interaction integrals 1-3. Default (if left blank) is jint.

### \*GET,,COMMON

\*GET,Parm,COMMON,,D3COM,,REAL,num
Uses #num double precision variable in the D3COM.INC include file (in the /ansys56/custom/include or /ansys56/customize/include directories, included in a "full" installation) Example:
\*GET,\_z1,common,,stepcm,,int,16
Gets number of equilibrium iterations of the last substep of the last load step completed.

### \*GET,,COMMON

\*GET,parm,common,,stepcm,,int,1
Newton-Raphson option key

### \*GET,,COMMON

\*GET,parm,common,,stepcm,,int,69
Adaptive descent key

### \*GET,,COMMON

\*GET,parm,common,,soptcm,,int,39
Equation solver values:
FRONT = 0, SPARSE=8, JCG=7, JCGOUT=2, ICCG=5, PCG=3, PCGOUT=3, ITER=0, etc.

### \*GET,,COMMON

\*GET,parm,common,,soptcm,,int,66
Auto Solve Method

### \*GET,,COMMON

PCG common blocks:

#### \*GET,parm,common,,stepcm,,int,138

PCG out-of-core key

#### \*GET,parm,common,,stepcm,,int,105

PCG Single precision key

#### \*GET,parm,common,,stepcm,,int,134

PCG Elem by Elem key

### \*GET,,COMMON

\*get,parm,comm,,stepcm,,int,30
Number of nodal diameters:

### \*GET,,COMMON

Time & time step values

#### \*get,TIME_END,common,,stepcm,,real,2

Get time at end of solve (TIME command)

#### \*get,DT_INIT,common,,stepcm,,real,23

Get initial time step (DELTIM command)

#### \*get,DT_MIN,common,,stepcm,,real,24

Get minimum time step (DELTIM command)

#### \*get,DT_MAX,common,,stepcm,,real,25

Get maximum time step (DELTIM command)

### \*GET,,COMMON

Convergence values (CNVTOL):

#### \*GET,param1,common,,stepcm,,real,28+i

Reference value of Lab

#### \*GET,param2,common,,stepcm,,real,48+i

Tolerance about VALUE

#### \*GET,param3,common,,stepcm,,int,34+i

Convergence norm

#### \*GET,param4,common,,stepcm,,real,132+i

Minimum reference value

The parameter "i" to use is based on which criteria you are looking for:
I = 1 for F convergence
I = 2 for M convergence
I = 3 for U convergence
and there are more...

I tested some of these out on a model, and they work if you entered a value that is not the default. If you use the default value for any of these items, the \*get returns a zero.

### \*GET,,COMMON

\*GET,\_cesha,common,,d3com,,real,178
This gets the current /ESHAPE setting
[STI: verified to work (at least) from 5.6 on up]

### \*GET,,COMMON

\*get,parmname,common,,cfprp7,,real,13
Gets element edge length by ESIZE

\*get,parmname,common,,cfprp7,,int,63
Gets number of element divisions specified by ESIZE

### \*GET,,COMMON

\*get,trf,common,,bfcom,,real,8
Get defined TREF value.

\*get,tunf,common,,bfcom,,real,10
Get defined TUNIF value.

### \*GET,,COMMON

\*GET,XMIN,COMMON,,GRCOM,,REAL,44
/XRANGE min value

\*GET,XMAX,COMMON,,GRCOM,,REAL,45
/XRANGE max value

\*GET,YMIN,COMMON,,GRCOM,,REAL,6
/YRANGE min value

\*GET,YMAX,COMMON,,GRCOM,,REAL,7
/YRANGE max value

### \*GET,,COMMON

\*GET,PARM,common,,cmopt,,int,13232
Gets count of state variables in optimization (/OPT) run.

### \*GET,,COMMON

\*GET,PARM,common,,cmopt,,int,13235
Gets count of design variables in optimization (/OPT) run.

### \*GET,,COMMON

To retrieve the node number at which the minimum or maximum results value occurs, first plot the nodal results of interest using the PLNSOL command, then execute one of the following:

#### \*GET,Parm,COMMON,,CPOST1,,INT,107

to retrieve the node at which the minimum result value occurs, or

#### \*GET,Parm,COMMON,,CPOST1,,INT,108

to retrieve the node at which the maximum result value occurs.

To determine whether the results are for the top, middle, or bottom of shells, use the following command:

### \*GET,Parm,COMMON,,CPOST1,,INT,5

Where PARM=1 for top, =2 for middle, =3 for bottom.

There are many other potential quantities of interest listed in the cpost1.inc file in the custom\include directory.

### \*GET,,COMMON

\*GET,parm,COMMON,,BOLCMD,,REAL,16
Gets the current boolean tolerance value (value assigned to the BTOL command).

### \*GET,,CP

\*GET,Parm,CP,CpNum,TERM,num,NODE
Gets the node number in CP #CpNum, #num term.

### \*GET,,CP

\*GET,Parm,CP,CpNum,[DOF | NTERM]
Gets the DOF of the CP #CpNum or total number of terms. The DOF key is as follows: 1=ux, 2=uy, 3=uz, 4=rotx, 5=roty, 6=rotz, 7=ax, 8=ay 9=az, 10=vx, 11=vy, 12=vz, 19=pres, 20=temp, 21=volt, 22=mag, 23=enke, 24=ends, 25=emf, 26=curr

### \*GET,,CP

\*GET,Parm,CP,0,[MAX | NUM]
Gets the total #num number of CPs defined or the #max number of CPs.

### \*GET,,ELEM

\*GET,Parm,ELEM,elementNumber,EFOR,nodeNumber,item
where item is FX, FY, FZ, MX, etc.
Gets element nodal forces / moments associated with an element (without using selection and fsum).

### \*GET,,ETYP

\*GET,Parm,ETYP, ,NUM,MAX
Gets the max element type number You can also use the inquiry function MAXETYP = etyiqr(0,14)

### \*GET,,NODE

\*GET,par,NODE,n,NTEMP
Gets nodal structural temperatures applied on the model.

### \*VGET,parm(1),125,1,12,1,,,2

\*VGETs nodal structural temperatures into an array.

### \*GET,,NODE

There is an undocumented \*GET\/\*VGET for reaction forces as follows:
\*GET,par,NODE,n,RF,Lab
where Lab can be UX,UY,UZ,ROTX,ROTY,ROTZ, or FX,FY,FZ,MX,MY,MZ
The \*VGET is the same.
[STI: \*GET for reaction force is documented at 5.6 but \*VGET is not documented at 5.5 or 5.6]

### \*GET,,PARM

\*GET,Parm,PARM,ARnn,ARTYPE
At 5.6.1, this returns the type of the ARxx parameter, not the type of the variable which ARnn is pointing to.

### \*GET,,PLAB

\*GET,Parm,PLAB,mat,TEMP,Tvalue
Gets material value at given temperature.
For example:
\*GET,EX1,EX,1,TEMP,70.0
Gets EX for material #1 at TEMP=70 and puts into parameter EX1.

### \*GET,,PLNSOL

\*GET,parm,PLNSOL,,max
Works on both PLESOL and PLNSOL to obtain min/max values of last contour plot (use bmax/bmin to obtain bound value with Full Graphics on and ERNORM on). Note that the format is still "PLNSOL" as 3rd argument, although your plot may be of element solution (PLESOL).

### \*GET,,RCON

\*GET,Parm,RCON, ,NUM,MAX
Gets the max REAL set number
You can also use the inquiry function MAXREAL = rlinqr(0,14)

### \*GET,,TBLAB

\*GET,parm,tblab,mat_number,NTEMP
Retrieves the number of temperature Tables defined for any TABLE (e.g., MISO)

\*GET,parm,tblab,mat_number,TVAL,pos
Retrieves the temperature value at position "pos" of any TABLE defined as TBDATA (MISO for example)

It is useful for retrieving all strain/stress curves from database

### \*GET,,TBLAB

\*GET,PARAM,tblab,matid,temp,0,ncon
Gets the number of constants (data values) for material tblab.
For example, to get the number of state variables defined for material ID #2, use:
\*GET,param,STATE,2,TEMP,0,NCON

### \*VGET,,ID1

An undocumented \*VGET for selecting Lines, Areas and Volumes by "hot spot"
\*VGET,xyzarray,ID1,num,ID2,ID3,,,4
Xyzarray: 3 row array that the coordinates are stored in
ID1: Location in ANSYS memory of information - 40 = Line, 60 = Area, 80 = Volume
ID2: First offset in memory location - 8 = Lines, 6 = Areas and Volumes
ID3: Second offset in memory location - 3 = Lines, 2 = Areas and Volumes

for lines:
*dim,ls_cent,,3
*vget,ls_cent(1),40,num,8,3,,,4
lsel,s,loc,x,ls_cent(1)
lsel,r,loc,y,ls_cent(2)
lsel,r,loc,z,ls_cent(3)
for areas:
*dim,al_cent,,3
*vget,ls_cent(1),60,num,6,2,,,4
for volumes:
*dim,vl_cent,,3
*vget,vl_cent(1),80,num,6,2,,,4

### /INQUIRE

/INQUIRE,strarray,DIRECTORY
This gets the working directory ANSYS was launched from.

### /INQUIRE

/INQUIRE,strarray,JOBNAME
This gets the ANSYS jobname and puts it into a string array called "strarray".

### /INQUIRE

/INQUIRE,strarray,TITLE,n
This gets the ANSYS title starting from character "n".

### LSx()

LSx(line number, unit distance)
\*GET functions for the slope of a line for LSX, LSY, LSZ where unit distance is between 0 and 1 (0 is slope at keypoint 1, 1 is slope at keypoint 2)

### rlnext()

RLNEXT(R)

Next defined real set having a number greater than R. (\*GET inline function)
