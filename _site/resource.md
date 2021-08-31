---
layout: resource
pagination:
  data: resources
  size: 40
  alias: resource
tags:
  - resource
  - apdl
title: resource
eleventyNavigation:
  key: resources
  parent: main
permalink: '/resources/{{pagination.pageNumber}}/'
---

<h1 class="mb-3 text-center">Resources</h1>

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
