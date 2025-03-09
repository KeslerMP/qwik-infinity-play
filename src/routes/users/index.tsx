import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useUsers = routeLoader$(async () => {
  try {
    const response = await fetch("https://backend-inf-production.up.railway.app/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            users {
              id
              email
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro na requisição GraphQL");
    }

    const { data } = await response.json();
    return data.users || [];
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
});

export default component$(() => {
  const users = useUsers(); // Usa os dados carregados pelo servidor

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.value.map((user: { id: string; email: string }) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
});
