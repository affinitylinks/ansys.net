---
layout: page
pagination:
  data: collections.html
  size: 30
title: html
eleventyExcludeFromCollections: true
eleventyNavigation:
  key: html
  parent: main
permalink: /html/{{pagination.pageNumber}}/
---

<h1 class="mb-3 text-center">Html</h1>
{% include "pagination.njk" %}
<div class="row">
  <div class="col">
    {%- for item in pagination.items -%}
      <article class="mb-5 position-relative">
        <a href="{{item.url | url }}">{{ item.data.title }}</a>
        <p class="font-italic">{{ item.data.author }}</p>
        <p class="mb-0">{{item.data.description}}</p>
      </article>
    {%- endfor -%}
  </div>
</div>
{% include "pagination.njk" %}
