---
layout: misc
pagination:
  data: misc
  size: 30
  alias: misc
tags:
  - misc
  - apdl
title: misc
eleventyNavigation:
  key: misc
  parent: main
permalink: '/miscellaneous/{{pagination.pageNumber}}/'
---

<h1 class="mb-3 text-center">Miscellaneous</h1>

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
