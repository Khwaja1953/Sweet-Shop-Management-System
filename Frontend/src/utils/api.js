export const BASE_URL = import.meta.env.VITE_BACKEND_URL || '';

export async function postJSON(path, data, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.msg || 'Request failed');
  return json;
}

export async function getJSON(path, token) {
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, { headers });
  const json = await res.json();
  if (!res.ok) throw new Error(json.msg || 'Request failed');
  return json;
}
