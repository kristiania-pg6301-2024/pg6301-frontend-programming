export async function fetchJson(url) {
  const res = await fetch(url);
  return await res.json();
}
