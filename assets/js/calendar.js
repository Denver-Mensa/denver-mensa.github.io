(function () {
  var grid = document.querySelector(".events-grid[data-calendar]");
  if (!grid) return;

  var apiKey = grid.getAttribute("data-api-key");
  var calendarId = grid.getAttribute("data-calendar-id");

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
        var start = event.start.date
          ? new Date(event.start.date)
          : new Date(event.start.dateTime);
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
        meta.textContent = formatDate(start) + location;

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

  function formatDate(date) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
})();
