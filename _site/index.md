---
title: home
date: Created
layout: page
tags:
  - home
  - info
---

<div>
<h2 class="text-center"> Examples <a href="/examples/0" class="btn btn-sm btn-outline-primary">see all</a></h2>

<ul class="list-group">

{%- for item in examples | limit(5) -%}

<li class="list-group-item">

<a href="{{item.url | url }}" target="_blank">{{ item.title }}</a>

<p class="font-italic">{{ item.author }}</p>

{{ item.description }}

</li>

{%- endfor -%}

</ul>
</div>

<div>
<h2 class="text-center"> Macros <a href="/macros/0" class="btn btn-sm btn-outline-primary">see all</a></h2>

<ul class="list-group">

{%- for item in macros | limit(5) -%}

<li class="list-group-item">

<a href="{{item.url | url }}" target="_blank">{{ item.title }}</a>

<p class="font-italic">{{ item.author }}</p>

{{ item.description }}

</li>

{%- endfor -%}

</ul>
</div>

<div>
<h2 class="text-center"> Resources <a href="/resources/0" class="btn btn-sm btn-outline-primary">see all</a></h2>

<ul class="list-group">

{%- for item in resources | limit(5) -%}

<li class="list-group-item">

<a href="{{item.url | url }}" target="_blank">{{ item.title }}</a>

<p class="font-italic">{{ item.author }}</p>

{{ item.description }}

</li>

{%- endfor -%}

</ul>
</div>

<div>
<h2 class="text-center"> Miscellaneous <a href="/miscellaneous/0" class="btn btn-sm btn-outline-primary">see all</a></h2>

<ul class="list-group">

{%- for item in misc | limit(5) -%}

<li class="list-group-item">

<a href="{{item.url | url }}" target="_blank">{{ item.title }}</a>

<p class="font-italic">{{ item.author }}</p>

{{ item.description }}

</li>

{%- endfor -%}

</ul>
</div>

<div>
<h2 class="text-center"> Html Links <a href="/html/0" class="btn btn-sm btn-outline-primary">see all</a></h2>

<ul class="list-group">

{%- for item in collections.html | limit(5) -%}

<li class="list-group-item">

<a href="{{item.data.url | url }}" target="_blank">{{ item.data.title }}</a>

<p class="font-italic">{{ item.author }}</p>

{{ item.data.description }}

</li>

{%- endfor -%}

</ul>
</div>
