// What the page shows, as HTML strings from plain data, so tests run without a browser. main.js puts them on the page.

export const escape = (text) =>
  String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// The backend's health, from GET /health: {ok: true}, or undefined when it can't be reached.
export function health(answer) {
  return answer?.ok ? `<p class="ok">The backend is up.</p>` : `<p class="down">The backend can't be reached.</p>`;
}

// The greeting form; the greeting or error goes into #greeting.
export function greetForm() {
  return `<form id="greet-form">
  <label for="name">Your name</label>
  <input id="name" name="name" autocomplete="off" />
  <button type="submit">Greet</button>
  <p id="greeting" role="status"></p>
</form>`;
}

// What greet() found: {greeting}, {error}, or {needName: true}.
export function greetMessage(result) {
  if (result?.greeting !== undefined) return `<p class="greeting">${escape(result.greeting)}</p>`;
  if (result?.needName) return `<p class="error">${escape("Please enter a name.")}</p>`;
  return `<p class="error">${escape(result?.error ?? "Something went wrong.")}</p>`;
}
