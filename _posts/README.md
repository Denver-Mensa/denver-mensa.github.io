# Adding a bulletin

Each bulletin is one file in this `_posts/` folder. You can add one entirely from the GitHub website — no code or software needed.

## Steps (web editor)

1. In this folder, click **Add file → Create new file**.
2. Name it using today's date and a short title, all lowercase with hyphens:
   `2026-09-17-our-new-board-member.markdown`
   Format: `YEAR-MONTH-DAY-short-title.markdown`
3. Paste this template and fill it in:

   ```markdown
   ---
   layout: post
   title:  "Welcome our new board member"
   date:   2026-09-17 09:00:00 -0600
   categories: announcement
   author: Board
   ---

   Your bulletin text goes here.
   ```

4. Fill in the fields (see table below), then click **Commit changes**.

The homepage bulletin board shows the **3 newest** posts automatically. Older ones stay on the full [Posts](../posts/) page.

## Fields

| Field | What it does |
|---|---|
| `title` | The card's headline. Clicking it opens the full post. |
| `categories` | The colored tag badge, shown in capitals. Use one lowercase word (e.g. `carpool`, `volunteer`, `swap`). |
| `author` | The "Posted by …" name. |
| `date` | Sets the order — keep it in the past so it appears right away. |
| Body text | The short text under the title. The first paragraph is used as the card preview. |

## Tips

- Use a short, descriptive title.
- Keep the body to one or two sentences for a clean card.
- To update a bulletin, open its file here and click the **pencil** (Edit) icon.
- To remove one, open the file and use the **⋮** menu → **Delete file**.
