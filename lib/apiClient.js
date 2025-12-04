import { useAuthStore } from "@/store/authStore";

export async function apiFetch(url, options = {}) {
  const { accessToken, setAccessToken, logout } = useAuthStore.getState();

  // 1. Request awal
  let res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // 2. Kalau bukan 401 → langsung return
  if (res.status !== 401) return res;

  // 3. Jika token expired → refresh
  const ref = await fetch("http://localhost:5000/api/v1/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!ref.ok) {
    logout();
    throw new Error("Session expired");
  }

  const refreshData = await ref.json();
  const newToken = refreshData.data;

  // 4. Simpan accessToken baru
  setAccessToken(newToken);

  // 5. Ulang request dengan token baru
  return fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${newToken}`,
    },
  });
}
