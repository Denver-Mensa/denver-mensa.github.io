---
layout: page
title: Posts
permalink: /posts/
---

<div class="bulletin-grid">
  {%- for post in site.posts -%}
  <article class="bulletin-post">
    <span class="tag">{{ post.categories | first | default: "post" | upcase }}</span>
    <p class="title"><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></p>
    <div class="body">{{ post.excerpt }}</div>
    <p class="meta">Posted by {{ post.author | default: site.author }} &middot; {{ post.date | date: "%b %-d, %Y" }}</p>
  </article>
  {%- endfor -%}
</div>
