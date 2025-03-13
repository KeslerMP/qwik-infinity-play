import { component$, useSignal, useVisibleTask$, $, useContext } from "@builder.io/qwik";
import { UserContext } from "~/lib/contexts/UserContext";

export default component$(() => {
    const message = useSignal("...");
    const loading = useSignal(false);
    const displayedMessage = useSignal("");

    const user = useContext(UserContext);

    const fetchMessage = $(async () => {
        loading.value = true;
        displayedMessage.value = "";
        try {
            const res = await fetch("https://api.example.com/chat");
            const data = await res.json();
            message.value = data.text;
            animateText(data.text);
        } catch (error) {
            message.value = "Erro ao carregar mensagem";
            animateText("Erro ao carregar mensagem");
        }
        loading.value = false;
    });

    const isSkipping = useSignal(false);

    const animateText = $(async (text: string) => {
        displayedMessage.value = "";
        isSkipping.value = false;
        for (let i = 0; i < text.length; i++) {
            if (isSkipping.value) {
                displayedMessage.value = text;
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 50));
            displayedMessage.value += text[i];
        }
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
        fetchMessage();
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
        document.addEventListener('keydown', (event) => {
            console.log(user);
            if (event.code === 'Space') {
                isSkipping.value = true;
                console.log('Skipping...');
            }
        });
    });

    return (
        <div class="max-w-md mx-auto h-screen flex flex-col items-center justify-center gap-4  p-4">
            <div class="w-48 h-48 bg-white flex items-center justify-center border-4 border-white rounded-lg">
                <img src="https://via.placeholder.com/150" alt="Personagem" class="w-full h-full object-cover rounded-lg filter pixelate" width={150} height={150} />
            </div>
            <div class="border-4 border-white p-4 w-full bg-black text-white text-center rounded-lg min-h-[50px] font-pixel">
                {loading.value ? "Carregando..." : displayedMessage.value}
            </div>
            <div class="flex justify-between w-full">
                <button onClick$={fetchMessage} class="bg-white cursor-pointer text-black p-2 rounded-lg border-4 border-black">Ação 1</button>
                <button onClick$={fetchMessage} class="bg-white cursor-pointer text-black p-2 rounded-lg border-4 border-black">Ação 2</button>
                <button onClick$={fetchMessage} class="bg-white cursor-pointer text-black p-2 rounded-lg border-4 border-black">Ação 3</button>
                <button onClick$={fetchMessage} class="bg-white cursor-pointer text-black p-2 rounded-lg border-4 border-black">Ação 4</button>
            </div>
        </div>
    );
});