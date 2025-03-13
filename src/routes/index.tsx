import { component$, useSignal, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { CREATE_USER, LOGIN_USER } from "~/graphql/queries";

export default component$(() => {
  const isLogin = useSignal(true);
  const email = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");
  const loading = useSignal(false);
  const message = useSignal("");
  const token = useSignal("");
  const navigate = useNavigate();

  const isEmailValid = $((email: string) => {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  });

  const handleSubmit = $(async (event: SubmitEvent, form: HTMLFormElement) => {
    event.preventDefault();
    loading.value = true;
    message.value = "";

    if (!isEmailValid(email.value)) {
      message.value = "Email inválido!";
      loading.value = false;
      return;
    }

    if (!isLogin.value && password.value !== confirmPassword.value) {
      message.value = "As senhas não coincidem!";
      loading.value = false;
      return;
    }

    const mutation = isLogin.value
      ? LOGIN_USER
      : CREATE_USER;

    try {
      const response = await fetch("https://backend-inf-production.up.railway.app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            email: email.value,
            password: password.value,
          },
        }),
      });

      const { data, errors } = await response.json();
      if (errors) {
        message.value = errors[0].message || "Erro na autenticação.";
      } else {
        const result = isLogin.value ? data.login : data.register;
        message.value = `Sucesso: ${result.email}`;
        token.value = result.token;

        document.cookie = `authToken=${result.token}; path=/; max-age=3600; secure; samesite=strict`;
        navigate("/game");
      }
    } catch (error) {
      console.error("Erro:", error);
      message.value = "Erro de conexão.";
    } finally {
      loading.value = false;
    }
  });

  return (
    <div class="max-w-md mx-auto h-screen flex items-center justify-center">
      <div class="w-full p-4 border-4 shadow-lg bg-white">
      <h1 class="text-2xl font-bold mb-4">{isLogin.value ? "Login" : "Registro"}</h1>
      <form 
        preventdefault:submit
        onSubmit$={handleSubmit} 
        class="flex flex-col gap-3"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          bind:value={email}
          required
          class={`p-2 border rounded ${email.value && !isEmailValid(email.value) ? "border-red-500" : ""}`}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          bind:value={password}
          required
          class="p-2 border rounded"
        />
        {!isLogin.value && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a Senha"
            bind:value={confirmPassword}
            required
            class={`p-2 border rounded ${
              confirmPassword.value && confirmPassword.value !== password.value ? "border-red-500" : ""
            }`}
          />
        )}
        <button
          type="submit"
          disabled={loading.value}
          class="bg-black text-white p-2 rounded hover:opacity-80 disabled:bg-gray-400 cursor-pointer"
        >
          {loading.value ? "Aguarde..." : isLogin.value ? "Entrar" : "Registrar"}
        </button>
      </form>
      {message.value && <p class="mt-2 text-sm text-gray-700">{message.value}</p>}


      <button
        onClick$={() => isLogin.value = !isLogin.value}
        class="mt-4 text-blue-500 underline cursor-pointer"
      >
        {isLogin.value ? "Criar uma conta" : "Já tem uma conta? Faça login"}
      </button>
    </div>
    </div>
  );
});