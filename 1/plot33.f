*deck,plot33                                                            pft
c sid 4.2 copy of file s.plot33.F last changed by gjd on 97/07/03
     program plot33
c **********  this program plots all the plots on the coded plot file  *********
c *** ansys(r) copyright(c) 1971,78,82,83,85,87,89,96  ANSYS,INC.
c
cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
c                                                                      c
c  the plot33 program is provided in source format to allow users to   c
c  make any modifications necessary for a particular system.           c
c                                                                      c
c  this standard version may be linked with user-supplied calcomp      c
c  hcbs software (plot, plots, symbol), or other software that uses    c
c  the calcomp subroutine protocol, e.g., hewlett-packard ispp,        c
c  tektronix preview, veratec versaplot, etc.                          c
c                                                                      c
c  to work with other plotter software it may be necessary for the     c
c  user to remove the calcomp subroutine calls (plots, plot, and       c
c  symbol) and substitute the subroutine calls appropriate for the     c
c  software being used.                                                c
c                                                                      c
c  because of the large variety of different plotters used by ansys    c
c  customers, it is not possible for sasi to verify the use of this    c
c  plot33 program with all plotter types.                              c
c                                                                      c
cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
c
#include "impcom.inc"
c
     external plots,plot,symbol,pl33in,pl33xy,pack
     integer  oufile,i,ibufpl(1),iout,numplt,ipl(80),kerase,krastr,
    x  iclra,iclrg,iclrt,iltyp,inorm,nchar,nvert,kedge,kytsiz
     real     chsize,xp1,x1p2,ysz,xzero,xmin,ymin,xmax,ymax,x,y,xy(2,8)
     character*80  strng
     integer  infile,inbuf,ibf,ix1,iy1,ix2,iy2,kpx,npix,ntot,
    x  n,iclr,inrm
     real     xsize,ysize
     common /pl33cm/  xsize,ysize,infile,inbuf,ibf(80)
     data xzero,xp1,x1p2  /0.0, 0.1, 1.2/
c
c          **********  set the file number  **********
     infile = 33
     oufile = 77
c          **********  define the output file  **********
     iout = 6
c          **********  open the file  **********
     open (unit=infile,file='FILE33.DAT',status='OLD',iostat=i)
     if (i .ne. 0) then
        write (iout,1111)
1111    format (' *** ERROR ***  FILE33.DAT DOES NOT EXIST.')
        go to 999
     end if
c         **********  begin session  **********
     write (iout,2000) infile
2000 format (/,' *****  BEGIN PLOT33 FROM FILE',i2,'  *****')
c          **********  initialize the plotting device  **********
     call plots (ibufpl(1),1,oufile)      inbuf = 80
     xsize = 10.0
     ysize = 10.0
     numplt = 0
     chsize = xp1
c
c          **********  loop through all the plotting commands  **********
  10 continue
     call pl33in (1,ipl(1))
     if (ipl(1) .eq. 0) then
c         **********  end-of-file  **********
        call plot (xzero,xzero,999)
        go to 900
     else if (ipl(1) .eq. 40) then
c         **********  start plotting  **********
        call pl33in (5,ipl(1))
        kerase = ipl(1) - 65
        krastr = ipl(2) - 65
        if ((numplt .ge. 1) .and. (kerase .eq. 1)) then
c            **********  advance paper  **********
           ysz = x1p2 * xsize
           call plot (ysz,xzero,-3)
        end if
        if (kerase .eq. 1) numplt = numplt + 1
     else if (ipl(1) .eq. 41) then
c         **********  end plotting  **********
        inbuf = 80
     else if (ipl(1) .eq. 48) then
c         **********  window  **********
        call pl33in (6,ipl(1))
        call pl33xy (ipl(1),xmin,ymin)
        call pl33in (6,ipl(1))
        call pl33xy (ipl(1),xmax,ymax)
     else if (ipl(1) .eq. 60) then
c         **********  area color  **********
        call pl33in (2,ipl(1))
        iclra = 16 * (ipl(1)-65) + ipl(2) - 65
     else if (ipl(1) .eq. 61) then
c         **********  graph color  **********
        call pl33in (2,ipl(1))
        iclrg = 16 * (ipl(1)-65) + ipl(2) - 65
     else if (ipl(1) .eq. 62) then
c         **********  text color  **********
        call pl33in (2,ipl(1))
        iclrt = 16 * (ipl(1)-65) + ipl(2) - 65
     else if (ipl(1) .eq. 44) then
c         **********  line type  **********
        call pl33in (1,ipl(1))
        iltyp = ipl(1) - 65
     else if (ipl(1) .eq. 49) then
c         **********  line width  **********
        call pl33in (1,ipl(1))
        iltyp = ipl(1) - 65
     else if (ipl(1) .eq. 51) then
c         **********  marker size  **********
        call pl33in (1,ipl(1))
        iltyp = ipl(1) - 65
     else if (ipl(1) .eq. 47) then
c         **********  normal  **********
        call pl33in (2,ipl(1))
        inorm = 16 * (ipl(1)-65) + ipl(2) - 65
     else if (ipl(1) .eq. 42) then
c         **********  dot  **********
        call pl33in (6,ipl(1))
        call pl33xy (ipl(1),x,y)
        call plot (x,y,3)
        call plot (x,y,2)
     else if (ipl(1) .eq. 46) then
c         **********  move  **********
        call pl33in (6,ipl(1))
        call pl33xy (ipl(1),x,y)
        call plot (x,y,3)
     else if (ipl(1) .eq. 45) then
c         **********  draw  **********
        call pl33in (6,ipl(1))
        call pl33xy (ipl(1),x,y)
        call plot (x,y,2)
     else if (ipl(1) .eq. 36) then
c         **********  text  **********
        call pl33in (6,ipl(1))
        call pl33xy (ipl(1),x,y)
        call pl33in (2,ipl(1))
        nchar = 16 * (ipl(1)-65) + ipl(2) - 65
        call pl33in (nchar,ipl(1))
        call pack (ipl(1),strng,nchar)
        call symbol (x,y,chsize,strng,xzero,nchar)
     else if (ipl(1) .eq. 43) then
c         **********  area  **********
        call pl33in (2,ipl(1))
        nvert = ipl(1) - 65
        kedge = ipl(2) - 65
        do 20  i = 1,nvert
           call pl33in (6,ipl(1))
           call pl33xy (ipl(1),xy(1,i),xy(2,i))
  20    continue
     elseif (ipl(1) .eq. 50) then
c         **********  set text size key  **********
        call pl33in (1,ipl(1))
        kytsiz = ipl(1) - 65
     elseif (ipl(1) .eq. 90) then
c         **********  pixmap [z]  **********
        call pl33in (15, ipl(1))
        kpx = 256*(ipl(1) -65) + 16*(ipl(2) -65) + ipl(3) -65
        ix1 = 256*(ipl(4) -65) + 16*(ipl(5) -65) + ipl(6) -65
        iy1 = 256*(ipl(7) -65) + 16*(ipl(8) -65) + ipl(9) -65
        ix2 = 256*(ipl(10)-65) + 16*(ipl(11)-65) + ipl(12)-65
        iy2 = 256*(ipl(13)-65) + 16*(ipl(14)-65) + ipl(15)-65
        npix = (ix2-ix1+1)*(iy2-iy1+1)
        ntot = 0
 300    call pl33in (6, ipl(1))
        n    = 16*(ipl(1)-65) + ipl(2) - 65
        inrm = 16*(ipl(3)-65) + ipl(4) - 65
        iclr = 16*(ipl(5)-65) + ipl(6) - 65
        ntot = ntot + n
        if (ntot .lt. npix) go to 300
     else if (ipl(1) .eq. 32) then
c         **********  no-op  **********
     else
c         **********  unknown  **********
     end if
     go to 10
c
c          ********  close input file  ********
 900 close (unit=infile)
     write (iout,2001)
2001 format (/,' *****  END OF PLOT33  *****')
 999 stop
     end
     subroutine pl33in (n,ib)
c **********  read in "n" characters and unpack them  **********
c **********  into the ascii integer array, "ib(*)".  **********
c *** Notice - This file contains ANSYS Confidential information ***
     external unpack
     integer  n,ib(*),nn,ii,j,k,i
     character*80  inline
     integer  infile,inbuf,ibf
     real     xsize,ysize
     common /pl33cm/  xsize,ysize,infile,inbuf,ibf(80)
c
     nn = n
     ii = 0
  10 continue
     if (inbuf .eq. 80) then
        read (infile,1000,end=900) inline
1000    FORMAT (A80)
        call unpack (inline,ibf(1),80)
        inbuf = 0
     end if
     k = inbuf + nn
     if (k .le. 80) then
        do 21  i = 1,nn
           ib(ii+i) = ibf(inbuf+i)
  21    continue
        inbuf = k
     else
        j = 80 - inbuf
        do 30  i = 1,j
           ib(ii+i) = ibf(inbuf+i)
  30    continue
        inbuf = 80
        nn = nn - j
        ii = ii + j
        go to 10
     end if
     go to 999
 900 continue
     ib(1) = 0
     inbuf = 80
c
 999 return
     end
     subroutine pl33xy (ipl,x,y)
c **********  get the x,y location of a point  **********
c *** Notice - This file contains ANSYS Confidential information ***
     integer  ipl(6)
     real     x,y,x3070
     integer  infile,inbuf,ibf
     real     xsize,ysize
     common /pl33cm/  xsize,ysize,infile,inbuf,ibf(80)
     data x3070  /3070.0/
c
     x = 256 * (ipl(1)-65)  +  16 * (ipl(2)-65)  +  ipl(3) - 65
     x = x * xsize / x3070
     y = 256 * (ipl(4)-65)  +  16 * (ipl(5)-65)  +  ipl(6) - 65
     y = y * ysize / x3070
c
     return
     end      subroutine pack(invar,outvar,n)
c *** Notice - This file contains ANSYS Confidential information ***
c
c --- pack ascii data into character data
c
#include "impcom.inc"
c
     integer   invar(*),i,n
     character*1   outvar(*)
c
     do 10   i = 1, n
c     must add 128 for prime parity bit                                 system
        outvar(i) = char(invar(i))
10      continue
     return
     end
     subroutine unpack(invar,outvar,n)
c *** Notice - This file contains ANSYS Confidential information ***
c
c --- unpack character data into ascii data
c
#include "impcom.inc"
c
     integer   outvar(*),i,n
     character*1   invar(*)
c
     do 10   i = 1, n
c     must subtract 128 for prime parity bit                            system
        outvar(i) = ichar(invar(i))
10      continue
     return
     end