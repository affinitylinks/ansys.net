---
title: home page
date: Created
layout: page
tags:
  - home
  - info
---

<div class="row">
  <div class="col">
    <div>
      <h2> Examples </h2>
      <ul class="list-group">
      {%- for item in examples -%}
        <li class="list-group-item"><a href="{{item.url | url }}" target="_blank">{{ item.title }}</a> {{item.description}}</li>
      {%- endfor -%}
      </ul>
    </div>
    <div>
      <h2> Macros </h2>
      <ul  class="list-group">
      {%- for item in macros -%}
        <li class="list-group-item"><a href="{{item.url | url }}" target="_blank">{{ item.title }} </a> : {{item.description}}</li>
      {%- endfor -%}
      </ul>
    </div>
    <div>
      <h2> Resources </h2>
      <ul  class="list-group">
      {%- for item in resources -%}
        <li class="list-group-item"><a href="{{item.url | url }}" target="_blank">{{ item.title }}</a> {{item.description}} </li>
      {%- endfor -%}
      </ul>
    </div>
    <div>
      <h2> Html Links </h2>
      <ul  class="list-group">
      {%- for item in collections.html -%}
        <li class="list-group-item"><a href="{{item.data.url | url }}">{{ item.data.title }}</a> {{item.data.description}} </li>
      {%- endfor -%}
      </ul>
    </div>
  </div>
</div>
