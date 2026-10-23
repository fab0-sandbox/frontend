export async function greet(api, rawName, fetchFn = fetch) {
  const name = rawName.trim();
  if (!name) return { needName: true };
  const response = await fetchFn(`${api}/greet?name=${encodeURIComponent(name)}`);
  const body = await response.json();
  if (response.ok && body.greeting) return { greeting: body.greeting };
  return { error: body.error };
}
