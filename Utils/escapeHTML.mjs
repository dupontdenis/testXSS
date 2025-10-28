export function escapeHTML(text) {
  if (text === undefined || text === null) return "";
  const div = document.createElement("div");
  div.textContent = String(text);
  return div.innerHTML;
}
// Escape a string for safe HTML display by leveraging the browser's parser.
// Example: "<img src=x onerror=alert(1)>" -> "&lt;img src=x onerror=alert(1)&gt;"
// Note: This does NOT sanitize HTML (it encodes it). Use when you intend to render as text.
export { escapeHTML as escapeHtml };
