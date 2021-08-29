---
layout: example
pagination:
  data: examples
  size: 30
  alias: example
tags:
  - example
  - apdl
eleventyNavigation:
  key: examples
  parent: main
permalink: '/examples/{{pagination.pageNumber}}/'
---

<h1 class="mb-3 text-center">Examples</h1>

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
