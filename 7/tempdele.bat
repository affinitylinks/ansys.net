REM tempdele.bat 
REM Deletes ANSYS temporary or unecessary files from the current folder (directory)
REM and all subfolders.
REM By Bram Weisman April 26, 2003.  For ANSYS 7.0.
REM Use at your own risk.  I assume no liability for damages due to use or 
REM misuse of this batch file.
REM 
REM The swith /q enables the macro to proceed without user interation.  
REM There will be no confirm delete prompts.
REM Be sure you understand this macro before you execute it.


rem !Element Matrices
del *.emat* /q /s
rem !Element Rotated Matrices
del *.erot* /q /s 
rem !Element saved data ESAV files created by nonlinear analyses 
del *.esav* /q /s 
rem !Assembled global stiffness and mass matrices
del *.full* /q /s 
rem !Loading and boundary conditions of load steps (used for multiframe restart)
del *.ldhi* /q /s 
rem !Element saved records, solution commands, and status for a single substep of a load step (used for multiframe restart)
del *.r0* /q /s  
rem !Element saved records, solution commands, and status for a single substep of a load step (used for multiframe restart)
del *.r1* /q /s  
rem !Sparse solver scratch files
del *.LN* /q /s  
rem !Copy of ESAV file from last converged substep
del *.osav* /q /s 
rem !Page file for ANSYS virtual memory (database space)
del *.page* /q /s 
rem !Scratch file for PCG solver
del *.pc* /q /s  
rem !Scratch file for Jacobi Conjugate Gradient solver
del *.scr* /q /s  
rem !Scratch file from substructure generation pass
del *.sscr* /q /s 
rem !DB Lock file
del *.lock /q /s 
