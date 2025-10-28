# XSS exercise: unsafe vs safe rendering

This exercise demonstrates how Cross-Site Scripting (XSS) happens when untrusted data is inserted into the DOM with `innerHTML`, and how to prevent it by escaping content before rendering.

## What youll do

- See an XSS payload execute in two unsafe pages (`index.html` and `unsafe.html`).
- Learn why certain payloads (like `<script>`) dont run when inserted with `innerHTML`, but event-handler payloads (like `<img onerror>`) do.
- Fix it by escaping the data and verifying the safe page (`safe.html`).

## Run locally (required)

These pages fetch `api.json`, so you must serve the folder over HTTP.

- With Python 3:

```bash
python -m http.server 5173
```

- Or with Node.js 

```bash
npx serve -l 5173
```

Then open these in your browser:

- http://localhost:5173/index.html
- http://localhost:5173/unsafe.html
- http://localhost:5173/safe.html

## 1) Start with `index.html` (unsafe)

- Loads `app.mjs`, which injects data from `api.json` into the DOM using `innerHTML`.
- The JSON contains XSS payloads like `<img src=x onerror="alert('XSS')">`.
- Because `innerHTML` parses the string as HTML, the `<img>` `onerror` handler executes.
- Youll see alert popupsthis is the XSS executing.

Note: If a page uses `innerHTML += ...`, the browser re-parses the entire HTML string each time, which may re-trigger previously attached `onerror` handlers. Thats why you might see duplicate alerts.

## 2) Then test `unsafe.html` (same XSS problem)

- Loads `appWithTemplateLiteral.mjs`. Even though it uses template literals, its still using `innerHTML`, so its equally vulnerable.
- Template literals do NOT auto-escape HTML; both `"<h1>" + data + "</h1>"` and `` `<h1>${data}</h1>` `` are unsafe when the data is untrusted.
- Expect the same kind of XSS alert popups.

Why your `<script>...</script>` payload might not fire: browsers dont execute `<script>` tags inserted via `innerHTML`. Event-driven payloads (like `<img onerror>` or `<svg onload>`) will execute, which is why those are used in this demo.

## 3) Finally, use `safe.html` (fixed)

- Loads `appSafe.mjs`, which escapes untrusted data before inserting it into the DOM.
- It uses `escapeHTML` from `Utils/escapeHTML.mjs`.

### The escaping helper

`Utils/escapeHTML.mjs` encodes special characters so that the browser treats the content as text, not HTML:

```js
export function escapeHTML(text) {
  if (text === undefined || text === null) return "";
  const div = document.createElement("div");
  div.textContent = String(text);
  return div.innerHTML;
}
```

- Example: `"<img src=x onerror=alert(1)>"` becomes `"&lt;img src=x onerror=alert(1)&gt;"`.
- After escaping, inserting with `innerHTML` renders the literal characters instead of executing anything.

### Safer patterns (beyond this exercise)

- Prefer setting `textContent` for plain text nodes.
- Build DOM nodes with `document.createElement`, set `.textContent`, and append them rather than concatenating HTML.
- If you must allow some HTML, use a trusted, well-maintained HTML sanitizer.

## File map

- `index.html`  unsafe demo using `app.mjs`.
- `unsafe.html`  unsafe demo using `appWithTemplateLiteral.mjs`.
- `safe.html`  safe demo using `appSafe.mjs` + `escapeHTML`.
- `api.json`  contains the XSS payloads for testing.
- `Utils/escapeHTML.mjs`  helper for encoding untrusted strings.

## Expected results

- `index.html` and `unsafe.html`: you see alert popups (XSS executes).
- `safe.html`: no alerts; the payloads are displayed as text.
