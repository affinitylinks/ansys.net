---
layout: resource
pagination:
  data: resources
  size: 10
  alias: resource
tags:
  - resource
  - apdl
eleventyNavigation:
  key: resources
  parent: main
permalink: '/resources/{{pagination.pageNumber}}/'
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
