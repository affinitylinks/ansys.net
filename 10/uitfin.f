C
C===========================================================================
C
C EXAMPLE OF A PID CONTROL SYSTEM IMPLEMENTED USING UITFIN
C
C October 2001
C ANSYS 5.7
C
C===========================================================================
C
C Dave Lindeman ddlindeman@mmm.com
C 3M SEMS Technology Center Tel: 651-733-6383
C 3M Center 235-1F-36 FAX: 651-736-7615
C St. Paul, MN 55144
C
C===========================================================================
SUBROUTINE UITFIN
EXTERNAL FORPUT,GETSTACKDISP,PAREVL
INTEGER GETSTACKDISP
DOUBLE PRECISION PAREVL
INTEGER KERR,NPID
DOUBLE PRECISION DISP,E0,E1,E2,F0,FORCE(2)
DOUBLE PRECISION KDIF,KINT,KPRP
DOUBLE PRECISION SUBC(3),TSTP,UY
CHARACTER*32 LABEL32
DATA E0,E1,E2,F0 /4*0.0D+00/
DATA SUBC /3*0.0D+00/
C===========================================================================
C Evaluate ANSYS parameter values
C===========================================================================
LABEL32 = 'DISP'
DISP = PAREVL(LABEL32,0,SUBC(1),2,KERR)
LABEL32 = 'KDIF'
KDIF = PAREVL(LABEL32,0,SUBC(1),2,KERR)
LABEL32 = 'KINT'
KINT = PAREVL(LABEL32,0,SUBC(1),2,KERR)
LABEL32 = 'KPRP'
KPRP = PAREVL(LABEL32,0,SUBC(1),2,KERR)
LABEL32 = 'NPID'
NPID = PAREVL(LABEL32,0,SUBC(1),2,KERR)
LABEL32 = 'TSTP'
TSTP = PAREVL(LABEL32,0,SUBC(1),2,KERR)
C===========================================================================
C Obtain displacement of mass
C===========================================================================
KERR = GETSTACKDISP(NPID,'UY ',UY)
C===========================================================================
C Calculate current and previous errors
C===========================================================================
E2 = E1
E1 = E0
E0 = DISP-UY
C===========================================================================
C Update nodal force
C===========================================================================
FORCE(1) = F0 + KPRP*(((1.0D+00+(KDIF/TSTP)+(TSTP/KINT))*E0)
+ -((1.0D+00+2.0D+00*(KDIF/TSTP))*E1)+((KDIF/TSTP)*E2))
FORCE(2) = 0.0D+00
CALL FORPUT(NPID,2,FORCE(1))
F0 = FORCE(1)
RETURN
END
C===========================================================================
C End of UITFIN
C===========================================================================
