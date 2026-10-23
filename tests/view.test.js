import assert from "node:assert/strict";
import { test } from "node:test";
import { escape, health } from "../src/view.js";

test("health says the backend is up when it answers ok", () => {
  assert.match(health({ ok: true }), /is up/);
});

test("health says the backend can't be reached without an answer", () => {
  assert.match(health(undefined), /can't be reached/);
});

test("escape keeps markup out of text", () => {
  assert.equal(escape(`<b>"x" & 'y'</b>`), "&lt;b&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/b&gt;");
});
