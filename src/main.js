// Wires the views to the page. The backend's address comes from ?api=, defaulting to http://localhost:3000.

import { health } from "./view.js";

const api = new URLSearchParams(location.search).get("api") ?? "http://localhost:3000";
const app = document.getElementById("app");

const answer = await fetch(`${api}/health`).then((r) => r.json()).catch(() => undefined);
app.innerHTML = health(answer);
