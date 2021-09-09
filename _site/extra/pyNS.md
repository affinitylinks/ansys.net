---
title: Python Named Selection Macro - Mechanical Workbench
description: 'In mechanical workbench, creates named selection of the bodies containing the string in an array. The name of the named selection is the string in an array.'
tags:
  - workbench
  - mechanical
  - namedSelection
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

<div id="disqus_thread"></div>
<script>
    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    var disqus_config = function () {
    this.page.url = ansys.netlify.app/extra/pyns;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = pyns.md; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://ansysx.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
