---
layout: macro
pagination:
  data: macros
  size: 30
  alias: macro
tags:
  - macro
  - apdl
title: macro
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

<p class="font-italic">{{ item.author }}</p>

{{ item.description }}

</li>
{%- endfor -%}
</ul>
{% include "pagination.njk" %}
