---
title: 'ANSYS and Tcl/Tk Customization'
author: 'John Swanson'
description: 'Information on using Tcl/Tk with ANSYS to create customized GUI. Tcl/Tk is used in ANSYS, such as the Contact Wizard, Solution Control Wizard, or Materials GUI at 5.7/6.0.'
tags:
  - html
  - undocumented
  - tcl
---

## On a Tcl/Tk version of MULTIPRO

Attached is the [multiprompt.tk](https://github.com/smhrjn/ansys.net/blob/main/9/multiprompt.tk) Tcl script which several of you requested. This is the 5.6 version (ans_evalexpr is not supported in 5.5). Also included is a macro [multi.mac](https://github.com/smhrjn/ansys.net/blob/main/9/multi.mac) showing how the [multiprompt.tk](https://github.com/smhrjn/ansys.net/blob/main/9/multiprompt.tk) TCL script is called.

There is a 5.5 version of [multiprompt.tk](https://github.com/smhrjn/ansys.net/blob/main/9/multiprompt.tk), as well as a more elaborate demonstration, but the disk on which I stored these has been mislaid during our move to Virginia. I left copies at the ANSYS Distributor's Office in Singapore, and will try to either find my copy or get a copy from Singapore. Anyway, more later.

I also have a demonstration showing how to put active fields directly on an ansys annotated display, allowing an applicition to run from a completely graphic input. I will include that when I locate it.

These examples are part of an extended User Programming Course which I hope to assemble, running for 2-3 days, including hands-on problems as well as lecture. If anyone is interested in such a course on-site, let me know.
_Posted by John Swanson on 10.17.1999_

## Presentation on ANSYS and Tcl/Tk

As I promised in an earlier posting, I would supply some more advanced Tcl Applications as soon as I had recovered (somewhat) from our move. I have located the missing disk, so here goes...

The [attached file](https://github.com/smhrjn/ansys.net/blob/main/9/tcl.zip) is ZIPped. Unzip in into a directory called tcl.dir. There you will find a powerpoint presentation tcl.ppt, which is a preliminary discussion of tcl application development in ANSYS. You will also find a readme.txt file which explains the two applications which are included. Also included are the 5.5 and 5.6 versions of the tcl programmed multiprompt macro.

Next create subdirectories parablock.dir and shaft.dir. The file decklist will show what files are to be put in each of these subdirectories.

Finally, go into each of these subdirectories and run ansys55 (ansys56 should also work).

shaft.dir is a parametric model of a circular stepped shaft under an axial load. You can change the diameters, length, fillet radius, and number of elements meshed in the fillet. Upon OK, the problem will run and show the result. The result display is timed to show for 10 seconds, then cycle back for a new parametric study.

parablock.dir is a simple block with a circular hole. This is a geometry only. In this model you can change the dimensions directly on the drawing of the block, and the model will be created when the OK is selected.

All the \_.mac and \_.tk files are included for these examples.
_Posted by John Swanson on 10.20.1999_

## Details of Tcl/Tk Commands for ANSYS

[This comprehensive document](https://github.com/smhrjn/ansys.net/blob/main/9/5_ANSYS_Program_Interaction.pdf) outlines all of the tcl commands to interact with ANSYS.
_Posted by Sheldon on 01.09.2002_
