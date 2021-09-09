---
title: 'Vector operations and commands'
author: 'Sheldon Imaoka (CSI)'
description: 'Vector notation/functions in ANSYS allow the user to execute some of these *DO loops in a much more efficient manner. Instead of looping through individual functions, vector functions act upon arrays, resulting in faster execution times. This memo will provide some basic/introductory examples on the use of *VGET as well as the undocumented vector notation.'
tags:
  - html
  - undocumented
  - vector
---

## {{ title }}

### _{{ author }}_

[PDF](https://github.com/smhrjn/ansys.net/blob/main/8/week_15_STI50_TNT_Vector_operations.pdf)

Vector notation/functions in ANSYS allow the user to execute some of these \*DO loops in a much more efficient manner. Instead of looping through individual functions, vector functions act upon arrays, resulting in faster execution times. This memo will provide some basic/introductory examples on the use of \*VGET as well as the undocumented vector notation.

Accompanying input [file](https://github.com/smhrjn/ansys.net/blob/main/9/buildn.inp), [BUILDN1](https://github.com/smhrjn/ansys.net/blob/main/9/buildn1.mac) macro, and [BUILDN2](https://github.com/smhrjn/ansys.net/blob/main/9/buildn2.mac) macro.

In the memo, in Section 2, please note that there is a typo. The section with the following lines:

```txt
*vget,NARRAY(1,1),node,1,u,x
*vmask,NMASK(1)
*vget,NARRAY(1,2),node,2,u,y
*vmask,NMASK(1)
*vget,NARRAY(1,3),node,3,u,z
```

should be replaced as follows:

```txt
*vget,NARRAY(1,1),node,1,u,x
*vmask,NMASK(1)
*vget,NARRAY(1,2),node,1,u,y
*vmask,NMASK(1)
*vget,NARRAY(1,3),node,1,u,z
```
