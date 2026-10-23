import assert from "node:assert/strict";
import { test } from "node:test";
import { escape, greetForm, greetMessage, health } from "../src/view.js";

test("health says the backend is up when it answers ok", () => {
  assert.match(health({ ok: true }), /is up/);
});

test("health says the backend can't be reached without an answer", () => {
  assert.match(health(undefined), /can't be reached/);
});

test("escape keeps markup out of text", () => {
  assert.equal(escape(`<b>"x" & 'y'</b>`), "&lt;b&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/b&gt;");
});

test("R3.1: greetForm has a name input and a button", () => {
  const html = greetForm();
  assert.match(html, /<input[^>]*name="name"/);
  assert.match(html, /<button/);
});

test("R3.3: greetMessage shows the greeting", () => {
  assert.match(greetMessage({ greeting: "Hello, Ada!" }), /Hello, Ada!/);
});

test("R4.3: greetMessage asks for a name", () => {
  assert.match(greetMessage({ needName: true }), /Please enter a name/);
});

test("R5.2: greetMessage shows an error, not as a greeting", () => {
  const message = "Name is too long (at most 50 characters).";
  const html = greetMessage({ error: message });
  assert.ok(html.includes(message));
  assert.ok(!html.includes('class="greeting"'));
});

test("R6.1: greetMessage escapes a greeting", () => {
  const html = greetMessage({ greeting: "Hello, <b>Ada</b>!" });
  assert.ok(html.includes("&lt;b&gt;Ada&lt;/b&gt;"));
  assert.ok(!html.includes("<b>"));
});

test("R6.2: greetMessage escapes an error", () => {
  const html = greetMessage({ error: "<img src=x>" });
  assert.ok(html.includes("&lt;img src=x&gt;"));
  assert.ok(!html.includes("<img"));
});
