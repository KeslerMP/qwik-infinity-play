import { component$, useSignal, $, useContext } from "@builder.io/qwik";
import { UserContext } from "~/lib/contexts/UserContext";
import { MINHACAMPANHA, AVANCARMAPA, PROCURARLOOT, ATACARINIMIGO } from "~/graphql/queries";

interface GraphQLResponse<T> {
    data?: T;
    errors?: { message: string }[];
}

export default component$(() => {
    const message = useSignal("...");
    const loading = useSignal(false);
    const displayedMessage = useSignal("");
    const user = useContext(UserContext);

    const animateText = $(async (text: string) => {
        displayedMessage.value = "";
        for (let i = 0; i < text.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 50));
            displayedMessage.value += text[i];
        }
    });

    const fetchGraphQL = $(async (query: string, variables: Record<string, any> = {}) => {
        if (!user.value?.token) {
            message.value = "Usuário não autenticado";
            return;
        }
        
        loading.value = true;
        displayedMessage.value = "";
        try {
            const res = await fetch("https://backend-inf-production.up.railway.app/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.value.token}`
                },
                body: JSON.stringify({ query, variables })
            });
            const data: GraphQLResponse<any> = await res.json();
            if (data.errors) {
                throw new Error(data.errors[0].message);
            }
            console.log(data);
            if (query === MINHACAMPANHA) {
                message.value = `Você esta em ${data.data.minhaCampanha.mapa.nome}, no dia ${data.data.minhaCampanha.dia}, com ${data.data.minhaCampanha.vida} de vida, ${data.data.minhaCampanha.fome} de fome e ${data.data.minhaCampanha.sede} de sede.`;
            } else if (query === AVANCARMAPA) {
                message.value = "Você segue adiante, explorando territórios desconhecidos...";
            } else if (query === PROCURARLOOT) {
                message.value = "Vasculhando o terreno, você encontra um item interessante!";
            } else if (query === ATACARINIMIGO) {
                message.value = `Você desfere um golpe certeiro no inimigo, causando ${variables.dano} de dano!`;
            }
            
            animateText(message.value);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : "Erro desconhecido";
            message.value = `Erro: ${errMsg}`;
            animateText(message.value);
        }
        loading.value = false;
    });

    return (
        <div class="max-w-md mx-auto h-screen flex flex-col items-center justify-center gap-4 p-4">
            <div class="w-48 h-48 bg-white flex items-center justify-center border-4 border-white rounded-lg">
                <img src="https://via.placeholder.com/150" alt="Personagem" class="w-full h-full object-cover rounded-lg filter pixelate" width={150} height={150} />
            </div>
            <div class="border-4 border-white p-4 w-full bg-black text-white text-center rounded-lg min-h-[50px] font-pixel">
                {loading.value ? "Carregando..." : displayedMessage.value}
            </div>
            <div class="flex justify-between w-full">
                <button onClick$={() => fetchGraphQL(MINHACAMPANHA, { userId: user.value.id })} class="bg-white cursor-pointer text-black p-2 rounded-lg border-4 border-black">Minha Campanha</button>
                <button onClick$={() => fetchGraphQL(AVANCARMAPA, { userId: user.value.id })} class="bg-white cursor-pointer text-black p-2 rounded-lg border-4 border-black">Avançar Mapa</button>
                <button onClick$={() => fetchGraphQL(PROCURARLOOT, { userId: user.value.id })} class="bg-white cursor-pointer text-black p-2 rounded-lg border-4 border-black">Procurar Loot</button>
                <button onClick$={() => fetchGraphQL(ATACARINIMIGO, { userId: user.value.id, dano: 10 })} class="bg-white cursor-pointer text-black p-2 rounded-lg border-4 border-black">Atacar Inimigo</button>
            </div>
        </div>
    );
});
