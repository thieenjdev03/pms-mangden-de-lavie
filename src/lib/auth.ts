export type MockUserRole = "admin" | "user";

export type MockUser = {
  role: MockUserRole;
};

const STORAGE_KEY = "user";

export function getUser(): MockUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MockUser;
  } catch {
    return null;
  }
}

export function isAdmin(): boolean {
  return getUser()?.role === "admin";
}

export function loginAsAdmin(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ role: "admin" } satisfies MockUser));
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
