---
title: home page
date: Created
layout: page
tags:
  - home
  - info
---

<div class="row">
  <h1> {{ siteTitle }}</h1>

  <h2> Examples </h2>
  {%- for item in collections.example -%}
    <li><a href="{{item.data.url}}" target="_blank">{{ item.data.title }}</a> </li>

{%- endfor -%}

  <h2> Html Links </h2>
  {%- for item in collections.html -%}
    <li><a href="{{item.data.url}}">{{ item.data.title }}</a> </li>

{%- endfor -%}

  <h2> Macros </h2>
  {%- for item in collections.macro -%}
    <li><a href="{{item.data.url}}" target="_blank">{{ item.data.title }} </a> : {{item.data.description}}</li>

{%- endfor -%}

</div>
