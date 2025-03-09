import { $, useSignal } from "@builder.io/qwik";

export function useAuth() {
  const token = useSignal<string | null>(null);

  // Verifica se há um token salvo no localStorage
  const checkAuth = $(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      token.value = storedToken;
      return true;
    }
    return false;
  });

  // Salva o token após login
  const login = $((newToken: string) => {
    localStorage.setItem("token", newToken);
    token.value = newToken;
  });

  // Remove o token ao fazer logout
  const logout = $(() => {
    localStorage.removeItem("token");
    token.value = null;
  });

  return { token, checkAuth, login, logout };
}
