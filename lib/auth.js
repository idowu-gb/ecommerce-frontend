export function setTokens(access, refresh) {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}
export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}
export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
}

export async function refreshAccessToken(apiBase) {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  const res = await fetch(`${apiBase}/api/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });
  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("accessToken", data.access);
    return data.access;
  } else {
    logout();
    return null;
  }
}

// wrapper that refreshes once on 401 and retries
export async function fetchWithAuth(url, opts = {}, apiBase) {
  const access = getAccessToken();
  opts.headers = opts.headers || {};
  opts.headers["Content-Type"] = "application/json";
  if (access) opts.headers["Authorization"] = `Bearer ${access}`;

  let res = await fetch(url, opts);
  if (res.status === 401 && getRefreshToken()) {
    const newAccess = await refreshAccessToken(apiBase);
    if (newAccess) {
      opts.headers["Authorization"] = `Bearer ${newAccess}`;
      res = await fetch(url, opts);
    }
  }
  return res;
}
