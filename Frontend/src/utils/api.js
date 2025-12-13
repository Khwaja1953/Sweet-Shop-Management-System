export const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export async function postJSON(path, data, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({...data}),
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

export async function putJSON(path, data, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.msg || 'Request failed');
  return json;
}

export async function deleteJSON(path, token) {
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, { method: 'DELETE', headers });
  const json = await res.json();
  if (!res.ok) throw new Error(json.msg || 'Request failed');
  return json;
}

// Helper to parse JWT token payload
export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (err) {
    return null;
  }
}
