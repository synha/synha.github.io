---
layout: default
title: virajsinha.com - Viraj Sinha
---

This is the blog of Viraj Sinha. Standby for me to get it fully functional

{% for post in site.posts %}
  <small>{{ post.date | date_to_string }}</small>
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
{% endfor %}
