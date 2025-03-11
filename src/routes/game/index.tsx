import { component$, useSignal, $ } from "@builder.io/qwik";
import { SinglePlayerModal } from "./modals/SinglePlayerModal";
import { MultiplayerModal } from "./modals/MultiplayerModal";
import { SettingsModal } from "./modals/SettingsModal";
import { LogoutModal } from "./modals/LogoutModal";

export default component$(() => {
    const activeModal = useSignal<"singlePlayer" | "multiplayer" | "settings" | "logout" | null>(null);

    const openModal = $((modal: "singlePlayer" | "multiplayer" | "settings" | "logout") => {
        activeModal.value = modal;
    });

    const closeModal = $(() => {
        activeModal.value = null;
    });

    return (
        <div class="max-w-md mx-auto h-screen flex items-center justify-center flex-col gap-4 bg-white">
            <h1 class="text-4xl font-bold pixelated-text mb-8">
                Analog Survival
            </h1>
            <button
                onClick$={() => openModal("singlePlayer")}
                class="w-64 px-6 py-3 bg-white text-black font-semibold border-4 border-black pixelated-button hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
                SINGLE PLAYER
            </button>
            <button
                onClick$={() => openModal("multiplayer")}
                class="w-64 px-6 py-3 bg-white text-black font-semibold border-4 border-black pixelated-button hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
                MULTIPLAYER
            </button>
            <button
                onClick$={() => openModal("settings")}
                class="w-64 px-6 py-3 bg-white text-black font-semibold border-4 border-black pixelated-button hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
                SETTINGS
            </button>
            <button
                onClick$={() => openModal("logout")}
                class="w-64 px-6 py-3 bg-white text-black font-semibold border-4 border-black pixelated-button hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
                LOGOUT
            </button>

            {activeModal.value === "singlePlayer" && <SinglePlayerModal onClose={closeModal} />}
            {activeModal.value === "multiplayer" && <MultiplayerModal onClose={closeModal} />}
            {activeModal.value === "settings" && <SettingsModal onClose={closeModal} />}
            {activeModal.value === "logout" && <LogoutModal onClose={closeModal} />}
        </div>
    );
});