#
# simple script to bring in parasolid files
# may need to get fancy if you want
#   solid/surface/wireframe/all option
#   defeaturing option
#   scaling option
#
# --sheldon

#
# define parasolid file types
#
set Paratypes {
  {{Parasolid Files} {.x_t}}
  {{Parasolid Files} {.xmt}}
  {{Parasolid Files} {.xmt_txt}}
  {{All Files} *}
}

#
# present dialog box
#
set CADfile [tk_getOpenFile -defaultextension ".x_t" -filetypes $Paratypes -title "Parasolid Import"]

#
# parse command for ~PARAIN
#
if {$CADfile != ""} {
  #
  # parse arguments
  #
  set Paraname [file rootname [file tail $CADfile]]
  set Paraext [string trimleft [file extension $CADfile] .]
  set Paradir [file dirname $CADfile]

  #
  # send command
  #
  ans_sendcommand ~PARAIN,$Paraname,$Paraext,'$Paradir',solids,0,0
}
