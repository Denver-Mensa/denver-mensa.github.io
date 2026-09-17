(function () {
  var grid = document.querySelector(".events-grid[data-calendar]");
  if (!grid) return;

  var apiKey = grid.getAttribute("data-api-key");
  var calendarId = grid.getAttribute("data-calendar-id");
  var timeZone = grid.getAttribute("data-timezone") || "America/Denver";

  if (!apiKey || !calendarId) {
    grid.innerHTML = '<p class="meta">Calendar not configured yet. Add your calendar ID and API key in _config.yml.</p>';
    return;
  }

  var now = new Date().toISOString();
  var url =
    "https://www.googleapis.com/calendar/v3/calendars/" +
    encodeURIComponent(calendarId) +
    "/events?key=" + encodeURIComponent(apiKey) +
    "&maxResults=3&orderBy=startTime&singleEvents=true&timeMin=" + now;

  fetch(url)
    .then(function (response) { return response.json(); })
    .then(function (data) {
      if (data.error) {
        showMessage("Could not load events: " + data.error.message);
        return;
      }
      if (!data.items || data.items.length === 0) {
        showMessage("No upcoming events scheduled.");
        return;
      }
      grid.innerHTML = "";
      data.items.forEach(function (event) {
        var location = event.location ? " \u00B7 " + event.location : "";

        var card = document.createElement("div");
        card.className = "event-card";

        var icon = document.createElement("div");
        icon.className = "icon";
        icon.innerHTML = "&#9650;";

        var title = document.createElement("p");
        title.className = "title";
        title.textContent = event.summary || "Untitled event";

        var meta = document.createElement("p");
        meta.className = "meta";
        meta.textContent = formatWhen(event.start, event.end) + location;

        card.appendChild(icon);
        card.appendChild(title);
        card.appendChild(meta);
        grid.appendChild(card);
      });
    })
    .catch(function () {
      showMessage("Could not load events.");
    });

  function showMessage(text) {
    grid.innerHTML = '<p class="meta">' + text + "</p>";
  }

  function fmtDate(date) {
    return date.toLocaleDateString("en-US", {
      month: "short", day: "numeric", timeZone: timeZone
    });
  }

  function fmtTime(date) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric", minute: "2-digit", timeZone: timeZone
    });
  }

  // "2026-09-20" -> local Date (avoids UTC parsing shifting the day)
  function parseDateOnly(value) {
    var p = value.split("-");
    return new Date(p[0], p[1] - 1, p[2]);
  }

  function formatWhen(start, end) {
    var dash = " \u2013 ";

    // All-day event: Google reports an EXCLUSIVE end date.
    if (start.date) {
      var s = parseDateOnly(start.date);
      if (end && end.date) {
        var e = parseDateOnly(end.date);
        e.setDate(e.getDate() - 1); // make the end inclusive
        if (e.getTime() > s.getTime()) {
          return fmtDate(s) + dash + fmtDate(e);
        }
      }
      return fmtDate(s);
    }

    // Timed event
    var st = new Date(start.dateTime);
    var label = fmtDate(st) + " \u00B7 " + fmtTime(st);
    if (end && end.dateTime) {
      var en = new Date(end.dateTime);
      if (fmtDate(st) === fmtDate(en)) {
        label += dash + fmtTime(en);
      } else {
        label += dash + fmtDate(en) + " \u00B7 " + fmtTime(en);
      }
    }
    return label;
  }
})();
