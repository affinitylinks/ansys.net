---
title: Python Named Selection Macro
description: 'Creates named selection of the bodies containing the string in an array. The name of the named selection is the string in an array.'
---

# {{ title }}

{{ description }}

```python
items = [
  'ns1',
  'ns2',
  'ns3'
]

for item in items:
  sel = Model.AddNamedSelection()
  sel.ScopingMethod = GeometryDefineByType.Worksheet
  sel.Name = item
  pipews = sel.GenerationCriteria
  pipews.Add(None)
  pipews[0].EntityType = SelectionType.GeoBody
  pipews[0].Criterion = SelectionCriterionType.Name
  pipews[0].Operator = SelectionOperatorType.Contains
  pipews[0].Value = item
  sel.Generate()
```
