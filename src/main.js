// Wires the views to the page. The backend's address comes from ?api=, defaulting to http://localhost:3000.

import { greet } from "./greet.js";
import { greetForm, greetMessage, health } from "./view.js";

const api = new URLSearchParams(location.search).get("api") ?? "http://localhost:3000";
const app = document.getElementById("app");

app.innerHTML = `<div id="health"></div>${greetForm()}`;

const form = document.getElementById("greet-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = form.elements.name;
  document.getElementById("greeting").innerHTML = greetMessage(await greet(api, input.value));
});

const answer = await fetch(`${api}/health`).then((r) => r.json()).catch(() => undefined);
document.getElementById("health").innerHTML = health(answer);
