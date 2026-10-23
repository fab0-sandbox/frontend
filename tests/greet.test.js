import assert from "node:assert/strict";
import { test } from "node:test";
import { greet } from "../src/greet.js";

function fakeFetch(status, body) {
  const calls = [];
  const fn = async (url) => {
    calls.push(url);
    return { ok: status >= 200 && status < 300, status, json: async () => body };
  };
  fn.calls = calls;
  return fn;
}

test("R3.2: greet calls the backend and returns the greeting", async () => {
  const fake = fakeFetch(200, { greeting: "Hello, Ada!" });
  assert.deepEqual(await greet("http://x", "Ada", fake), { greeting: "Hello, Ada!" });
  assert.deepEqual(fake.calls, ["http://x/greet?name=Ada"]);
});

test("R3.4: greet trims the name", async () => {
  const fake = fakeFetch(200, { greeting: "Hello, Ada!" });
  await greet("http://x", "  Ada  ", fake);
  assert.deepEqual(fake.calls, ["http://x/greet?name=Ada"]);
});

test("R4.1: an empty name needs a name and doesn't call the backend", async () => {
  const fake = fakeFetch(200, {});
  assert.deepEqual(await greet("http://x", "", fake), { needName: true });
  assert.equal(fake.calls.length, 0);
});

test("R4.2: a blank name needs a name and doesn't call the backend", async () => {
  const fake = fakeFetch(200, {});
  assert.deepEqual(await greet("http://x", "   ", fake), { needName: true });
  assert.equal(fake.calls.length, 0);
});

test("R5.1: greet returns the backend's error", async () => {
  const error = "Name is too long (at most 50 characters).";
  const fake = fakeFetch(400, { error });
  assert.deepEqual(await greet("http://x", "A".repeat(51), fake), { error });
});

test("R6.3: greet URL-encodes the name", async () => {
  const fake = fakeFetch(200, { greeting: "Hello!" });
  await greet("http://x", "<b>Ada</b>", fake);
  assert.deepEqual(fake.calls, ["http://x/greet?name=%3Cb%3EAda%3C%2Fb%3E"]);
});
