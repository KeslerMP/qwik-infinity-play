import { component$, useSignal, $, Slot, useVisibleTask$, useContextProvider } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { VALIDATE_TOKEN } from "~/graphql/queries";
import { UserContext, User } from "~/lib/contexts/UserContext";

export const LoggedProvider = component$(() => {
    const loc = useLocation();
    const navigate = useNavigate();
    const isLogin = useSignal<boolean | null>(null);
    const loading = useSignal(true);
    const animationEnded = useSignal(false); 

    // Criando um Signal para armazenar os dados do usuário
    const userState = useSignal<User>({
        id: null,
        token: null,
        email: null,
    });

    // Definindo o contexto global com `userState`
    useContextProvider(UserContext, userState);

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

                // Atualizando o contexto global com os dados do usuário
                userState.value = {
                    id: data.validateToken.id,
                    token: data.validateToken.token,
                    email: data.validateToken.email,
                };

                console.log("Usuário autenticado:", userState.value);
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
            loading.value = false;
        }

        if (isLogin.value && loc.url.pathname === "/") {
            navigate("/game");
        }

        if (!isLogin.value && loc.url.pathname !== "/") {
            navigate("/");
        }
    });

    return (
        <div class="relative w-full h-screen overflow-hidden">
            {loading.value || !animationEnded.value ? (
                <div 
                class="absolute inset-0 flex items-center justify-center bg-white z-50 animate-screen-slide"
                onAnimationEnd$={() => (animationEnded.value = true)} 
                >
                    <img
                        src="/monster-hand.png"
                        class="absolute grayscale bottom-[-100px] left-1/2 transform -translate-x-1/2 animate-image-move"
                        width={200}
                        height={100}
                        alt="Loading"
                    />
                </div>
            ) : (
                <Slot />
            )}
        </div>
    );
});
