---
layout: default
title: To Webfinity and Beyond!
---

{% for post in site.posts %}
  <small>{{ post.date | date_to_string }}</small>
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  {{ post.content }}
  </hr>
  <br>
{% endfor %}
