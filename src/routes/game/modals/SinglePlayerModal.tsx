import { component$, QRL, $ } from "@builder.io/qwik";

export const SinglePlayerModal = component$(
  ({ onClose }: { onClose: QRL<() => void> }) => {
    
    return (
        <div
            class="fixed inset-0 bg-[#00000021] bg-opacity-50 flex items-center justify-center"
            onClick$={onClose} // Fecha o modal ao clicar no fundo
        >
            <div
                class="bg-white p-6 rounded-lg border-4 border-black pixelated-modal"
                onClick$={(e) => e.stopPropagation()} // Impede que o clique no modal feche o modal
            >
                <h2 class="text-xl font-bold mb-4 pixelated-text">Single Player</h2>
                <p class="mb-4 pixelated-text">Escolha o modo de jogo:</p>
                <div class="flex flex-col gap-2">
                    <a
                        href="/game/singleplayer"
                        class="w-full px-4 py-2 bg-white text-black border-2 border-black pixelated-button hover:bg-gray-100"
                    >
                        Campanha
                    </a>
                    <button
                        onClick$={() => alert('Modo Treino selecionado!')}
                        class="w-full px-4 py-2 bg-white text-black border-2 border-black pixelated-button hover:bg-gray-100"
                    >
                        Treino
                    </button>
                </div>
                <button
                    onClick$={onClose}
                    class="mt-4 w-full px-4 py-2 bg-white text-black border-2 border-black pixelated-button hover:bg-gray-100"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
});