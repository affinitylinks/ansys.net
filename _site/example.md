---
layout: example
pagination:
  data: examples
  size: 10
  alias: example
tags:
  - example
  - apdl
eleventyNavigation:
  key: examples
  parent: main
permalink: '/examples/{{pagination.pageNumber}}}/'
---

{% include "pagination.njk" %}

<ul class="list-group">

{%- for item in pagination.items -%}

<li class="list-group-item">
{{ item.title }}

[{{ item.description }}]({{ item.url | url }})

</li>
{%- endfor -%}
</ul>
{% include "pagination.njk" %}
