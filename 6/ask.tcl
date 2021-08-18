# Modified *ask by Navtej Singh

# This file allow users to define parmas in ansys with long names and values.

# parm name can be upto 32 characters long
# parm values can be up to 128 chars long

# just type the string/number/1e4 etc. without any quotes

# Use @ your own risk. 
# How to use? Call this ask.tcl file with the following command from ANSYS
# Copy this ask.tcl file on your machine
# Change the dir below "c:/myapdl/mac/" with the correct dir where ask.tcl is located  
#
# ~eui,'source [file join c:/myapdl/mac/ ask.tcl]'
# use above command in your macros to call this modified *ask




package require Iwidgets 3.0
wm withdraw .
toplevel .t
#wm withdraw .t

wm title .t "Modified *ASK by Navtej"

option add *textBackground seashell
.t configure -background white

iwidgets::entryfield .t.parmName -labeltext "Variable Name(32chars max):" -labelpos w -width 32
pack .t.parmName -padx 4 -pady 4

iwidgets::entryfield .t.parmVal -labeltext "Variable Value:(128chars max)" -labelpos w  -width 32 
pack .t.parmVal -padx 4 -pady 4

button .t.b -text "Enter..." -command {

if { [string is double [.t.parmVal get]]==1 } { 
		catch { ans_sendcommand [.t.parmName get]=[.t.parmVal get]}
} else {
catch { ans_sendcommand [.t.parmName get]='[.t.parmVal get]' }
}

after 30
catch { destroy .t }
}
pack .t.b -padx 4 -pady 4




