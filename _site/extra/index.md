---
layout: page
pagination:
  data: collections.extra
  size: 30
title: extra
eleventyExcludeFromCollections: true
eleventyNavigation:
  key: extra
  parent: main
permalink: /extra/{{pagination.pageNumber}}/
---

<h1 class="mb-3 text-center">Extra Resources</h1>
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
