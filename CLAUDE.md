# frontend

The fab0 sandbox's frontend: a static page that talks to `fab0-sandbox/backend`. Its work comes from fab0 runs in
`fab0-sandbox/factory`, through the skills in `.claude/skills/`.

- **Stack:** plain HTML and ES modules, no build step and no dependencies. Don't add any.
- **Layout:** `index.html` loads `src/main.js`, which fetches from the backend and puts views on the page. Views in
  `src/view.js` are pure functions from data to HTML strings. Tests in `tests/*.test.js`, specs in
  `docs/specs/<run>.md`.
- **Tests:** `node --test`, with `node:test` and `node:assert/strict`. Test views and logic as pure functions; no
  browser, no network.
- **Style:** escape every value put into HTML with `escape()`. The backend's address comes from `?api=`.
