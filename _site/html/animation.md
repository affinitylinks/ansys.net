---
title: 'Animation Gallery'
author: 'ansys.net'
description: 'Animations of ANSYS Analyses'
tags:
  - html
  - animation
---

## Description of Animation Gallery

_{{ author }}_

The following are some animations of sample analyses run in ANSYS. These examples include large-strain deformation, material nonlinearities, finite-sliding contact, fluid-structure interaction, etc. Most animations are in AVI format while others may be in GIF format. A small description of the model is included, when appropriate.

[rubber boot](https://github.com/smhrjn/ansys.net/blob/main/9/rubberboot.zip)
Model and animation by Sheldon Imaoka. [ANSYS 6.1]

Zipped AVI animation of equivalent elastic strains of a rubber boot. Modeled with SOLID185 (fully incompressible Mixed U-P) and Neo-Hookean model with surface-to-surface contact (rigid-deformable and self-contact). Three load steps comprise of (a) initial interference fit, (b) pull down boot in -y direction, (c) rotate rigid shaft.

[rubber bushing](https://github.com/smhrjn/ansys.net/blob/main/9/rubberbushing.gif)
Model and animation by Sheldon Imaoka. [ANSYS 6.0]

GIF animation of equivalent stress in rubber bushing. Use of SOLID185 with large-strain viscoelasticity (beta at 6.0) and 2-term Mooney-Rivlin. Rigid-deformable contact and self-contact. Assumes 5% relaxation; note that as the load is released, the true-stress vs. true-strain curve plotted in upper-right corner shows relaxation. A point in compression and another point in tension is plotted, and true stress-strain curve does not follow original path.

[pinched cylinder](https://github.com/smhrjn/ansys.net/blob/main/9/pinch3d.zip)
Model and animation by Sheldon Imaoka. [ANSYS 6.1]

Zipped AVI file of animation of pinched cylinder. SOLID185 elements with Ogden hyperfoam model (for compressible foam-type rubbers) with viscoelasticity, relaxation to 50% for both shear and bulk moduli with different relaxation times. Contours of von Mises stress along with reaction force history animated.

[hyperelastic oring under pressure](https://github.com/smhrjn/ansys.net/blob/main/9/oring.zip)
Model and animation by Sheldon Imaoka. [ANSYS 6.1]

Zipped AVI animation of equivalent stresses of an axisymmetric model. An o-ring is constrained in three directions by rigid walls. One of the rigid walls compresses the o-ring, then an external pressure is applied from below

[gasket](https://github.com/smhrjn/ansys.net/blob/main/9/gasket.zip)
Model and animation by Sheldon Imaoka. [ANSYS 6.1]

Zipped AVI animation of pressure in gasket. Use of gasket material and interface elements (19x). Bolts preloaded sequentially in model, reaction forces plotted in upper-left corner. Gasket closure/pressure relationship shown on upper-right corner. Light outline is material definition, thick outline is material behavior, "+" marker is current gasket properties. A taller silicon bead lining is shown in light blue with rest of gasket shown in red.

[sheet forming](https://github.com/smhrjn/ansys.net/blob/main/9/sheetform.zip)
Model and animation by Sheldon Imaoka. [ANSYS 6.0]

Zipped file containing AVI animation of von Mises stress of a sheet metal forming operation. Model uses bilinear isotropic hardening model with SHELL181. Contact modeled with surface-to-surface TARGE170 and CONTA173 elements with friction, MU=0.3. Rigid-to-deformable contact accounts for shell thickness as well as changes in shell thickness.

[metal extrusion](https://github.com/smhrjn/ansys.net/blob/main/9/extrude.zip)
Model and animation by Sheldon Imaoka. [ANSYS 6.0]

Zipped file containing AVI animation of equivalent plastic creep strains of an extrusion. Model uses bilinear isotropic hardening model with SOLID185 (B-Bar formulation). Contact modeled with surface-to-surface TARGE170 and CONTA173 elements with friction, MU=0.1.

[solder ball](https://github.com/smhrjn/ansys.net/blob/main/9/solderball.gif)
Model courtesy of Bret Zahn at ChipPAC, animation by Sheldon. [ANSYS 5.7]

GIF Animation of equivalent creep strains in a solder ball. Model uses hyperbolic sine creep (implicit) with SOLID185 (B-Bar formulation). Rest of chip and board were modeled using superelements.

[nitinol stent](https://github.com/smhrjn/ansys.net/blob/main/9/stent.zip)
Model and animation by Sheldon Imaoka. [ANSYS 8.1]

Zipped AVI animation of % transformationof martensite in a Nitinol stent. A force load is applied axially to a segment of a stent, then unloaded. The axial and radial displacements reveal a nonlinear relationship due to the phase transformation of the material. Use of Shape-Memory Alloy (SMA) constitutive model.

[rachetting](https://github.com/smhrjn/ansys.net/blob/main/9/)
Model and animation by Sheldon Imaoka. [ANSYS 6.1]

Zipped AVI animation of equivalent plastic strains in a notch. A nonlinear kinematic hardening model (Chaboche) is used to simulate rachetting under cyclic non-symmetric loading. Note the development of plastic strains as noted by the graph on the bottom.

[element birth and death](https://github.com/smhrjn/ansys.net/blob/main/9/birthdeath.zip)
Model and animation by Sheldon Imaoka. [ANSYS 6.1]

Zipped AVI animation of equivalent stresses in a rigid-deformable contact model. A criterion is used to deactivate an element once its maximum strain exceeds a certain value. As a rigid sphere is pushed against shell elements (these shell elements are visualized with their thicknesses in 3D), the thinner shells fail first, thus 'breaking open' the seal.

[snap fit](https://github.com/smhrjn/ansys.net/blob/main/9/buckle1m.zip)
Model and animation by Sean Harvey. [ANSYS 5.5]

Zipped file containing AVI animation of von Mises stress with total reaction force. Model uses 10-node tet SOLID92 and 20-node hex SOLID95 with linear elastic materials, along with surface-to-surface contact (TARGE170 and CONTA174). Translucency is activated for the mating piece. (This was a half-symmetry model for a demo; note that since it was a ficticious model, the mating piece self-intersects.)

[gears](https://github.com/smhrjn/ansys.net/blob/main/9/60deg2.gif)
Model and animation by ANSYS, Inc. [ANSYS 5.5]

GIF Animation of von Mises stress of gears.

[pipe bending](https://github.com/smhrjn/ansys.net/blob/main/9/roller.avi)
Model and animation by Sheldon Imaoka. [ANSYS Workbench 12.1]

Very simple pipe bending application. Metal plasticity with rigid-deformable contact. Joints are used to prescribe motion to the rollers.

[FSI using ANSYS and CFX](https://github.com/smhrjn/ansys.net/blob/main/9/sloshing.zip)
Model and animation by Sheldon Imaoka. [ANSYS and CFX 10.0]

Zipped AVI and MPG animations of sloshing in tank resulting in plastic deformation of container. The MFX solver (ANSYS and CFX FSI solver) is used to simulate the fluid and structure under a ramped acceleration loading. The fluid exerts force on one side of the container causing plastic straining. The resulting deformations are automatically sent back to the CFX model to account for the change in the fluid domain during this transient simulation.

[MEMS thermoelectric power generator](https://github.com/smhrjn/ansys.net/blob/main/9/tepower.zip)
Model and animation by Sheldon Imaoka. [ANSYS and CFX 10.0]

Zipped AVI and MPG animations of MEMS thermoelectric power generator converting heat from combustion into electrical energy. The MFX solver (ANSYS and CFX FSI solver) is used to couple the energy equation between the fluid domain and the solid (thermoelectric) domain. Combustion is modeled in CFX that provides the heat source, which is passed to ANSYS. ANSYS sends temperatures to CFX, and this process is iterated until convergence is achieved for a given timestep. The temperature gradients then cause a voltage drop across the thermoelectric device (Seebeck effect). Joule heating, orthotropic material properties, thermal contact also considered.

[simplified leaf valve](https://github.com/smhrjn/ansys.net/blob/main/9/valve.mpg)
Model and animation by Sheldon Imaoka. [ANSYS and CFX 10.0]

MPEG animation of velocity and pressure profiles of a deforming simplified three-leaf valve under pressure pulse. The MFX solver (ANSYS and CFX FSI solver) is used to couple fluid flow with large deformations. The Carreau model is used for the fluid and anisotropic hyperelasticity for the surrounding solid (not shown here). The CFX solver receives displacements from the ANSYS solver and morphs the mesh. ANSYS, in turn, receives forces from the non-Newtonian flow of the fluid.

[ultrasonic transducer](https://github.com/smhrjn/ansys.net/blob/main/9/xducer.zip)
Model and animation by Sheldon Imaoka. [ANSYS and CFX 10.0]

Zipped MPEG animation of pressure and vapor volume fraction with AVI animation of displacements of an ultrasonic transducer. The MFX solver (ANSYS and CFX FSI solver) is used to couple a piezoelectric transducer with compressible fluid flow. The ANSYS structure is first preloaded with a bolt, then excited by a sinusoidal voltage. The displacements are calculated and sent to CFX. Cavitation is included in the CFX model, which calculates pressures sent back to ANSYS.
