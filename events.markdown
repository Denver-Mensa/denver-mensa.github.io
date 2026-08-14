---
layout: page
title: Events
permalink: /events/
---

{%- if site.calendar.id and site.calendar.id != "" -%}
<iframe class="calendar-embed" src="https://calendar.google.com/calendar/embed?src={{ site.calendar.id | url_encode }}&ctz={{ site.calendar.timezone | url_encode }}"
  style="border: 0" width="100%" height="600" frameborder="0" scrolling="no"></iframe>
{%- else -%}
<p>Calendar not configured yet. Add your calendar ID to <code>_config.yml</code> under <code>calendar.id</code>.</p>
{%- endif -%}
