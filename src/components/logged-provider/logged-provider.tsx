import { component$, useSignal, $, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { VALIDATE_TOKEN } from "~/graphql/queries";

export const LoggedProvider = component$(() => {
    const loc = useLocation();
    const navigate = useNavigate();
    const isLogin = useSignal<boolean | null>(null);
    const loading = useSignal(true);

    const getCookie = $((name: string) => {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? match[2] : null;
    });

    const validateToken = $(async (token: string) => {
        try {
            const response = await fetch("https://backend-inf-production.up.railway.app/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: VALIDATE_TOKEN,
                    variables: { token },
                }),
            });

            const { data, errors } = await response.json();
            if (errors) {
                isLogin.value = false;
                console.error(errors);
            } else {
                isLogin.value = true;
            }
        } catch (error) {
            console.error("Erro ao validar token", error);
            isLogin.value = false;
        } finally {
            loading.value = false;
        }
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async () => {
        const token = await getCookie("authToken");

        if (token) {
            await validateToken(token);
        } else {
            isLogin.value = false;
        }

        loading.value = false;

        if (isLogin.value && loc.url.pathname === "/") {
            navigate("/game");
        }

        if (!isLogin.value && loc.url.pathname !== "/") {
            navigate("/");
        }
    });

    if (loading.value) {
        return (
            <div class="flex items-center justify-center min-h-screen">
                <div class="flex flex-col items-center gap-2">
                    <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p class="text-gray-500">Carregando...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Slot />
        </div>
    );
});
