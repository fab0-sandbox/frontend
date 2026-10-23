// What the page shows, as HTML strings from plain data, so tests run without a browser. main.js puts them on the page.

export const escape = (text) =>
  String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// The backend's health, from GET /health: {ok: true}, or undefined when it can't be reached.
export function health(answer) {
  return answer?.ok ? `<p class="ok">The backend is up.</p>` : `<p class="down">The backend can't be reached.</p>`;
}
