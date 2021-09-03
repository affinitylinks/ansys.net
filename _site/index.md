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

The following pages contain the links to the respective files in the repository. (Descriptions for the resources are replicated whenever possible.)

<div>
<h2 class="text-center"> Resources <a href="/resources/0" class="btn btn-sm btn-outline-primary">see all</a></h2>

<!-- <ul class="list-group">

{%- for item in resources | limit(5) -%}

<li class="list-group-item">

<a href="{{item.url | url }}" target="_blank">{{ item.title }}</a>

<p class="font-italic">{{ item.author }}</p>

{{ item.description }}

</li>

{%- endfor -%}

</ul> -->
</div>

<div>
<h2 class="text-center"> Macros <a href="/macros/0" class="btn btn-sm btn-outline-primary">see all</a></h2>

<!-- <ul class="list-group">

{%- for item in macros | limit(5) -%}

<li class="list-group-item">

<a href="{{item.url | url }}" target="_blank">{{ item.title }}</a>

<p class="font-italic">{{ item.author }}</p>

{{ item.description }}

</li>

{%- endfor -%}

</ul> -->
</div>

<div>
<h2 class="text-center"> Examples <a href="/examples/0" class="btn btn-sm btn-outline-primary">see all</a></h2>

<!-- <ul class="list-group">

{%- for item in examples | limit(5) -%}

<li class="list-group-item">

<a href="{{item.url | url }}" target="_blank">{{ item.title }}</a>

<p class="font-italic">{{ item.author }}</p>

{{ item.description }}

</li>

{%- endfor -%}

</ul> -->
</div>

<div>
<h2 class="text-center"> Miscellaneous <a href="/miscellaneous/0" class="btn btn-sm btn-outline-primary">see all</a></h2>

<!-- <ul class="list-group">

{%- for item in misc | limit(5) -%}

<li class="list-group-item">

<a href="{{item.url | url }}" target="_blank">{{ item.title }}</a>

<p class="font-italic">{{ item.author }}</p>

{{ item.description }}

</li>

{%- endfor -%}

</ul> -->
</div>

<div>
<h2 class="text-center"> Html (in-site) <a href="/html/0" class="btn btn-sm btn-outline-primary">see all</a></h2>

<!-- <ul class="list-group">

{%- for item in collections.html | limit(5) -%}

<li class="list-group-item">

<a href="{{item.url | url }}">{{ item.data.title }}</a>

<p class="font-italic">{{ item.author }}</p>

{{ item.data.description }}

</li>

{%- endfor -%}

</ul> -->
</div>

<hr>

<div>
<h2 class="text-center"> Extra Resources </h2>

<ul class="list-group">

{%- for item in collections.extra | limit(5) -%}

<li class="list-group-item">

<a href="{{item.url | url }}">{{ item.data.title }}</a>

<p class="font-italic">{{ item.author }}</p>

{{ item.data.description }}

</li>

{%- endfor -%}

</ul>
</div>

<div id="disqus_thread"></div>
<script>
    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    var disqus_config = function () {
    this.page.url = ansys.netlify.app;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = siteHome; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://ansysx.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
