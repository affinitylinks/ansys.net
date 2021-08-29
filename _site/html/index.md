---
layout: page
pagination:
  data: collections.html
  size: 5
eleventyExcludeFromCollections: true
eleventyNavigation:
  key: html
  parent: main
permalink: /html/{{pagination.pageNumber}}/
---

<h1 class="mb-3">Html</h1>
{% include "pagination.njk" %}
{%- for item in pagination.items -%}
<article class="mb-5 position-relative">
  <div class="row">
    <div class="col-12 col-sm-4">
      <img class="w-100 rounded" src="{{item.data.thumbnail}}" alt="{{item.title}}">
    </div>
    <div class="col">
      <h4>{{item.data.title}}</h4>
      <p class="mb-0">{{item.data.description}}</p>
    </div>
  </div>
</article>
{%- endfor -%}
{% include "pagination.njk" %}
