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

<h1 class="mb-3 text-center">Macros</h1>

{% include "pagination.njk" %}

<ul class="list-group">

{%- for item in pagination.items -%}

<li class="list-group-item">

<a href="{{ item.url | url }}" target="_blank"> {{item.title}}</a>

{{ item.description }}

</li>
{%- endfor -%}
</ul>
{% include "pagination.njk" %}
