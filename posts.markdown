---
layout: page
title: Posts
permalink: /posts/
---

{%- assign years = site.posts | group_by_exp: "post", "post.date | date: '%Y'" -%}

{%- if years.size > 1 -%}
<nav class="year-filter" aria-label="Jump to year">
  {%- for year in years -%}
  <a href="#year-{{ year.name }}">{{ year.name }}</a>
  {%- endfor -%}
</nav>
{%- endif -%}

{%- for year in years -%}
<section class="year-group" id="year-{{ year.name }}">
  <h2 class="year-heading">{{ year.name }}</h2>
  <div class="bulletin-grid">
    {%- for post in year.items -%}
    <article class="bulletin-post">
      <span class="tag">{{ post.categories | first | default: "post" | upcase }}</span>
      <p class="title"><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></p>
      <div class="body">{{ post.excerpt }}</div>
      <p class="meta">Posted by {{ post.author | default: site.author }} &middot; {{ post.date | date: "%b %-d, %Y" }}</p>
    </article>
    {%- endfor -%}
  </div>
</section>
{%- endfor -%}

{%- if site.posts.size == 0 -%}
<p class="meta">No posts yet.</p>
{%- endif -%}
