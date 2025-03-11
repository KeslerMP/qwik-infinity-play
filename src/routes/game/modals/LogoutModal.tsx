import { component$, $, QRL } from "@builder.io/qwik";

export const LogoutModal = component$(
  ({ onClose }: { onClose: QRL<() => void> }) => {
    const handleLogout = $(() => {
      document.cookie = "authToken=; max-age=0; path=/";
      console.log("Logout realizado com sucesso!");
      onClose();
      window.location.reload();
    });

    return (
      <div
        class="fixed inset-0 bg-[#00000021] bg-opacity-50 flex items-center justify-center"
        onClick$={onClose}
      >
        <div
          class="bg-white p-6 rounded-lg border-4 border-black pixelated-modal"
          onClick$={(e) => e.stopPropagation()}
        >
          <h2 class="text-xl font-bold mb-4 pixelated-text">Logout</h2>
          <p class="mb-4 pixelated-text">Tem certeza que deseja sair?</p>
          <div class="flex gap-2">
            <button
              onClick$={handleLogout}
              class="w-full px-4 py-2 bg-white text-black border-2 border-black pixelated-button hover:bg-gray-100"
            >
              Confirmar
            </button>
            <button
              onClick$={onClose}
              class="w-full px-4 py-2 bg-white text-black border-2 border-black pixelated-button hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }
);
