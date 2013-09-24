---
layout: default
title: Viraj Sinha
---

{% for post in site.posts %}
  <small>{{ post.date | date_to_string }}</small>
  <h2><a href="{{ post.url }}" class="rainbow" >{{ post.title }}</a></h2>
  	{% if post.content contains '<!--more-->' %}
{{ post.content | split:'<!--more-->' | first }}
<small><a style="align: middle" href="{{ post.url }}" class="rainbow">Full Post</a></small>
	{% else %}
{{ post.content }}
	{% endif %}
  </hr>
  <br>
{% endfor %}
