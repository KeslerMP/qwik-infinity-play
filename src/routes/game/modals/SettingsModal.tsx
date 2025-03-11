import { component$, QRL, $ } from "@builder.io/qwik";

export const SettingsModal = component$(
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
                <h2 class="text-xl font-bold mb-4 pixelated-text">Configurações</h2>
                <p class="mb-4 pixelated-text">Ajuste as configurações do jogo:</p>
                <div class="flex flex-col gap-2">
                    <button
                        onClick$={() => alert('Som ajustado!')}
                        class="w-full px-4 py-2 bg-white text-black border-2 border-black pixelated-button hover:bg-gray-100"
                    >
                        Ajustar Som
                    </button>
                    <button
                        onClick$={() => alert('Gráficos ajustados!')}
                        class="w-full px-4 py-2 bg-white text-black border-2 border-black pixelated-button hover:bg-gray-100"
                    >
                        Ajustar Gráficos
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