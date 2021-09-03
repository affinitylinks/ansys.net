---
title: home
date: Created
layout: page
tags:
  - home
  - info
---

## Sheldon's ansys.net site contents

This repository contains the pdf and ansys files from "ansys.net" website.

## Organization

The [repository](https://github.com/affinitylinks/ansys.net) contains 9 folders with roughly 90 files each. The files are roughly in order as you move through the folders, corresponding to the order in the CSV pulled from his site as the guide.

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
