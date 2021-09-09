---
title: Undocumented Elements and Element Features
author: 'ansys.net'
description: 'Undocumented elements and element features'
tags:
  - html
  - undocumented
  - elements
---

## {{ title }}

_{{ author }}_

### CIRCU125

Undocumented DIODE element (5.5, 5.6).
[STI: Documented & released at 5.7]

### CONTA17x

Pure thermal contact:
Use KEYOPT(1)=2 for pure thermal option (TEMP DOF only) for 5.7.
This pure thermal contact feature is documented at 6.0.

### CONTA17x (2)

Support of "debonding" for bonded or no-separation contact. Use real constants 27 (max tensile stress) and 28 (max shear stress) to specify limits at which point the bonded or no-separation contact becomes like standard contact.
[STI: beta at 9.0]

### CONTAC26

CONTAC26 "2-D Point-to-Ground Contact" was undocumented at ANSYS 8.1. It should be replaced by CONTA175.

### CONTAC48

CONTAC48 "2-D Point-to-Surface Contact" was undocumented at ANSYS 8.1. It should be replaced by either node-to-surface CONTA175 or surface-to-surface CONTA171-172.

### CONTAC49

CONTAC49 "2-D Point-to-Surface Contact" was undocumented at ANSYS 8.1. It should be replaced by either node-to-surface CONTA175 or surface-to-surface CONTA173-174.

### FLUID66

FLUID66 "Thermal-Fluid Pipe" was undocumented around 5.6. It should be replaced with FLUID116.

### GCGEN

GCGEN, Ccomp, Tcomp, NUMC, RADC, Tlab, Shape

Ccomp
Name of the component containing nodes on the contact surface [CM]. Assemblies are not permitted.

Tcomp
Name of the component containing nodes on the target surface. Assemblies are not permitted.

NUMC
Generate NUMC contact elements whose contact node is closest to the centroid of each target element face. If Shape = TRI, the program will generate 2\*NUMC CONTAC49 elements for each quadrilateral target element face. (That is, each triangular contact element base will be connected to NUMC contact nodes.) Defaults to an unlimited number of contact elements generated per target face.

RADC
Generate contact elements whose contact node is within a radius of RADC measured from the centroid of each target element face. Defaults to no limit on the radius.

Tlab
Label to identify the target surface of line or shell elements. The top surface will be used unless Tlab = BOT. Tlab is ignored if the target elements are solids.

Shape
Label that controls the shape of CONTAC49 element bases. Using the TRI feature can sometimes improve contact performance if the target elements have warped quadrilateral faces:
(blank) --
The contact element bases will have the same shape (triangular or quadrilateral) as the corresponding target element faces (default).
TRI --
The contact element bases will always be triangular.

Notes:
Generates 2-D contact (CONTAC48) or 3-D contact (CONTAC49) elements. Each contact element connects nodes on a target element face to a contact node. The "target" end of a contact element is called the contact element base. A target element face is defined as a face on a selected element whose nodes belong to the target component. If the selected element is a solid then the target face must also be external to the model, while for a line or shell element all nodes of the element will belong to the target face. The active element type attribute (TYPE) must be a contact element (CONTAC48 or CONTAC49) and must match the dimensionality of the target element. The other active attributes (MAT, TYPE, REAL, ESYS) will be used for the generated elements. The target elements must be defined before using this command. Midside nodes on target element faces are ignored.

It is highly recommended to use newer CONTA171-175 elements instead of CONTAC48-49.

### HYPER158

HYPER158 "3-D 10-Node Tetrahedral Mixed u-P Hyperelastic Solid" was undocumented at ANSYS 10.0. SOLID187 should be used instead - it supports more than Mooney-Rivlin with TB,HYPER, and toggles Mixed u-P via KEYOPT(6) (note that Mixed u-P formulations in HYPERxx and 18x elements are slightly different).

### HYPER56

HYPER56 "2-D 4-Node Mixed u-P Hyperelastic Solid" was undocumented at ANSYS 10.0. PLANE182 should be used instead - it supports more than Mooney-Rivlin with TB,HYPER, and toggles Mixed u-P via KEYOPT(6) (note that Mixed u-P formulations in HYPERxx and 18x elements are slightly different).

### HYPER58

HYPER58 "3-D 8-Node Mixed u-P Hyperelastic Solid" was undocumented at ANSYS 10.0. SOLID185 should be used instead - it supports more than Mooney-Rivlin with TB,HYPER, and toggles Mixed u-P via KEYOPT(6) (note that Mixed u-P formulations in HYPERxx and 18x elements are slightly different).

### HYPER74

HYPER74 "2-D 8-Node Mixed u-P Hyperelastic Solid" was undocumented at ANSYS 10.0. PLANE183 should be used instead - it supports more than Mooney-Rivlin with TB,HYPER, and toggles Mixed u-P via KEYOPT(6) (note that Mixed u-P formulations in HYPERxx and 18x elements are slightly different).

### HYPER84

HYPER84 "2-D Hyperelastic Solid" was undocumented at ANSYS 10.0. PLANE182/183 should be used instead - it supports more than Mooney-Rivlin or Blatz-Ko with TB,HYPER.

### HYPER86

HYPER86 "3-D Hyperelastic Solid" was undocumented at ANSYS 10.0. SOLID185 should be used instead - it supports more than Mooney-Rivlin or Blatz-Ko with TB,HYPER.

### PIPE20

NMISC 101 through 104 are S1max, S3min, SINTMAX, SEQVMAX for Node I (NMISC 105 through 108 for Node J).

### PIPE60

NMISC 104 through 107 are S1max, S3min, SINTMAX, SEQVMAX for Node I (NMISC 108 through 111 for Node J).

### PLANE13

KEYOPT(1)=1 (VOLT only)
KEYOPT(1)=5 (AZ, TEMP)

### PLANE2

PLANE2 "2-D 6-Node Triangular Structural Solid" was undocumented at ANSYS 11.0. It should be replaced by PLANE183 with KEYOPT(1)=1.

### PLANE55, PLANE77

Supports planar with thickness with KEYOPT(3)=3
Use real constant to specify thickness
ET,2,55
KEYOPT,2,3,3
R,2,THICK
Above sets planar with thickness for PLANE55 as element type 2.
Thickness of "THICK" parameter specified as real constant 2.
[STI: Note that for PLANE55, this has become a documented option from ANSYS 8.1 onwards.]

### SHELL143

SHELL143 "4-Node Plastic Small Strain Shell" was undocumented at ANSYS 11.0. It should be replaced by SHELL181 with KEYOPT(3)=2.

### SHELL43

SHELL43 "4-Node Plastic Large Strain Shell" is undocumented at ANSYS 12.0.1, namely because SHELL181 has a richer set of features. Use SHELL181 instead of SHELL43.

### SHELL51

SHELL51 "Axisymmetric Structural Shell" was undocumented at ANSYS 11.0. It should be replaced by SHELL208.

### SHELL91

SHELL91 "Nonlinear Layered Structural Shell" became undocumented at ANSYS 12.0.1 in order to simplify the shell element offerings. One should use SHELL281 instead since SHELL281 is a current technology element that has layered capabilities.

### SHELL93

SHELL93 "8-Node Structural Shell" became undocumented at ANSYS 12.0.1 in order to simplify the shell element offerings. One should use SHELL281 instead since SHELL281 is a current technology element with many more features compared with SHELL93.

### SHELL99

SHELL99 "Linear Layered Structural Shell" became undocumented at ANSYS 12.0.1 in order to simplify the shell element offerings. One should use SHELL281 instead since SHELL281 is a current technology element that has layered capabilities.

### SOLID191

SOLID191 "3-D 20-Node Layered Structural Solid" has become undocumented in ANSYS 12.0.1 to simplify the element offerings. SOLID186 has layered capabilities along with many more features than SOLID191, so use that element type instead.

### SOLID45

Keyoption 7 for solid45
Toggles between temperature property evaluation between centroid and integration points.

### SOLID46

SOLID46 "3-D 8-Node Layered Structural Solid" has become undocumented in ANSYS 12.0.1 to simplify the element offerings. SOLID185 and SOLSH190 both have layered capabilities along with many more features than SOLID46, so use those elements instead.

### SOLID5, SOLID98

KEYOPT(1)=3 for Piezo option (UX, UY, UZ, VOLT) instead of using KEYOPT(1)=0 for PIEZO.
[STI: Documented in 5.6.]

### SOLID64

SOLID64 "3-D Anisotropic Structural Solid" was undocumented at ANSYS 11.0. It should be replaced by SOLID185.

### SOLID65

KEYOPT(10)=1 is an undocumented keyoption for SOLID65, available starting from ANSYS 12.1.

Depending on the input concrete constants, the failure surface may have a hole in the transition from compression-compression-compression state to the compression-compression-tension state. This keyoption attempts to patch this hole in the failure surface to help achieve convergence.

### SOLID72

SOLID72 "3-D 4-Node Tetrahedral Structural Solid with Rotations" was undocumented around ANSYS 5.7 because of the fact that many users incorrectly assumed that the rotational DOF of the solid element was compatible with those of beam or shell elements. There is no replacement except to use higher-order SOLID92 or SOLID187 instead.

### SOLID73

SOLID73 "3-D 8-Node Structural Solid with Rotations" was undocumented around ANSYS 5.7 because of the fact that many users incorrectly assumed that the rotational DOF of the solid element was compatible with those of beam or shell elements. There is no replacement except to use lower-order SOLID45/185 or higher-order SOLID95/186 instead.

### SURF19

SURF19 "2-D Surface Effect" was undocumented around 5.6. It should be replaced with either SURF151 (thermal) or SURF153 (structural).

### SURF22

SURF22 "3-D Surface Effect" was undocumented around 5.6. It should be replaced with either SURF152 (thermal) or SURF154 (structural).

### VISCO106

VISCO106 "2-D 4-Node Viscoplastic Solid" (Anand Model) has been undocumented at ANSYS 12.0.1 to simplify the element offerings. Consider using PLANE182 with TB,RATE,,,,ANAND instead.

### VISCO107

VISCO107 "3-D 8-Node Viscoplastic Solid" (Anand Model) has been undocumented at ANSYS 12.0.1 to simplify the element offerings. Consider using SOLID185 with TB,RATE,,,,ANAND instead.

### VISCO108

VISCO108 "2-D 8-Node Viscoplastic Solid" (Anand Model) has been undocumented at ANSYS 12.0.1 to simplify the element offerings. Consider using PLANE183 with TB,RATE,,,,ANAND instead.

### VISCO88

VISCO88 "2-D 8-Node Viscoelastic Solid" has been undocumented at ANSYS 12.0.1 to simplify the element offerings. Consider using PLANE183 with TB,SHIFT and TB,PRONY instead.

### VISCO89

VISCO89 "3-D 20-Node Viscoelastic Solid" has been undocumented at ANSYS 12.0.1 to simplify the element offerings. Consider using SOLID186 with TB,SHIFT and TB,PRONY instead.
