---
layout: macro
pagination:
  data: macros
  size: 10
  alias: macro
tags:
  - macro
  - apdl
eleventyNavigation:
  key: macros
  parent: main
permalink: '/macros/{{pagination.pageNumber}}/'
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
