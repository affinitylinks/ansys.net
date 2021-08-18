proc GetFile {} {
	
	set FileName [tk_getOpenFile]
	if {$FileName != ""} {
		# Break the file name up into parts
		set TheDirectory [file dirname $FileName]
		set TheName [file rootname [file tail $FileName]]
		set TheExtension [file extension $FileName]
		set TheExtension [string trimleft $TheExtension .]
		# Throw it into ansys
		ans_sendcommand /Input, \'$TheName\', $TheExtension, \'$TheDirectory\'
	}
}

# If you want a Motif look and feel uncomment the following line
set tk_strictMotif 1
GetFile
