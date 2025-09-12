<script lang="ts">
    import { fade, scale } from "svelte/transition";
    import confetti from "canvas-confetti";
    import { dndzone } from "svelte-dnd-action";

    let stage = "";
    let currentQ = 0;
    let message = "";
    let currentVideo = 0;

    let arranged = false;
    let items = [
        { id: 1, name: "Srijal", video: "https://drive.google.com/file/d/1N1DBE7oUVEbjKSq1DtBwlNSe2H3-hIah/preview" },
        { id: 2, name: "Appa", video: "https://drive.google.com/file/d/1GHTm3mqRzGkwY-Lf9d8ZM6yPim6ATgQF/preview" },
        { id: 3, name: "Aama", video: "https://drive.google.com/file/d/11sJ67KAzkzK49X01xiNGpv8cadbk_GEF/preview" },
        { id: 4, name: "Samragi", video: "https://drive.google.com/file/d/1kPsBmfPHQz6ulKuH1TR_-va-4BPqD3t6/preview" },
        { id: 5, name: "Deshu", video: "https://drive.google.com/file/d/1u1EMBmYpSJlfviEOVCVZYHBHQioW9BAV/preview" }
    ];
    
    let canClick = false;

    function openGiftBox() {
        triggerFireworks();
        setTimeout(() => {
            stage = "message"; 
        }, 2500);
    }

    function Timeout() {
        canClick = false;
        setTimeout(() => {
            canClick = true;
        }, 10000); // 10 seconds wait
    }

    function handleDnd({ detail }) {
        items = detail.items; 
    }

    function lockOrder() {
        arranged = true;
        stage = "videos";
        Timeout(); // start timeout as soon as video stage begins
    }

    function nextVideo() {
        if (!canClick) return;
        if (currentVideo < items.length - 1) {
            currentVideo++;
            Timeout(); // lock button again for 10s on new video
        } else {
            stage = "olu";
            Timeout(); // lock Olu stage button initially
        }
    }

    function reveal() {
        if (!canClick) return;
        Timeout();
        stage = "reveal";
    }

    function triggerFireworks() {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 10,
                angle: 60,
                spread: 80,
                origin: { x: 0 },
                colors: ["#ff4d6d", "#ffd700", "#00c4ff"]
            });
            confetti({
                particleCount: 10,
                angle: 120,
                spread: 80,
                origin: { x: 1 },
                colors: ["#ff4d6d", "#ffd700", "#00c4ff"]
            });
            confetti({
                particleCount: 7,
                startVelocity: 50,
                spread: 360,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-white p-0 -mt-15">

    <!-- Stage 0 -->
    {#if stage === ""}
        <img
            src="/giftbox/giftbox.svg"   
            alt="Gift Box"
            class="w-64 h-64 cursor-pointer animate-bounce hover:scale-105 transition-transform"
            on:click={openGiftBox}
            transition:scale={{ duration: 500 }}
        />
        <div class="text-center">
            <h2 class="text-2xl font-bold text-purple-700 mt-6" transition:fade>
                Click the Gift Box to Open Your Birthday Surprise!
            </h2>
        </div>
    {/if}

    <!-- Stage 1 -->
    {#if stage === "message"}
        <div class="text-center">
            <h1 class="text-7xl font-extrabold text-pink-600 mb-6 animate-bounce" transition:scale>
                Happy Birthday My Love
            </h1>
            <p class="text-lg text-gray-700 mb-6">
                I have a gift for you, but before you can see it, I have a little surprise planned.
            </p>
            <p class="text-lg text-gray-500 mb-6">
                Tap the button below to start.
            </p>
            <button
                on:click={() => (stage = "arrange")}
                class="bg-pink-500 text-white py-3 px-8 rounded-xl text-xl hover:bg-pink-600 shadow-lg transition"
            >
                Click here to start
            </button>
        </div>
    {/if}

    <!-- Arrange -->
    {#if stage === "arrange"}
        <div class="text-center">
            <h2 class="text-3xl font-bold text-pink-600 mb-6" transition:fade>
                Hiee love!!! these are the birthday messages from your loved ones. 
                Set the order to see them in the way you want.
            </h2>
            <p class="text-lg text-gray-700 mb-6">
                Drag and drop to arrange the order.
            </p>
            <div
                use:dndzone={{ items, flipDurationMs: 300 }}
                on:consider={handleDnd}
                on:finalize={handleDnd}
                class="grid grid-cols-2 gap-4 max-w-lg mx-auto"
            >
                {#each items as item (item.id)}
                    <div class="p-6 bg-white rounded-xl shadow-lg text-center cursor-move">
                        {item.name}
                    </div>
                {/each}
            </div>

            <button
                on:click={lockOrder}
                class="mt-8 bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition shadow"
            >
                Done
            </button>
        </div>
    {/if}

    <!-- Videos -->
    {#if stage === "videos"}
        <div class="text-center">
            <h2 class="text-2xl font-bold text-pink-700 mb-4">
                Birthday wish from {items[currentVideo].name}!!!
            </h2>
            <div class="flex justify-center">
                <iframe
                    src={items[currentVideo].video}
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                    class="rounded-lg shadow-lg w-108 max-w-5xl h-108"
                ></iframe>
            </div>

            <button 
                on:click={nextVideo}
                disabled={!canClick}
                class="mt-6 py-3 px-6 rounded-lg transition shadow 
                {canClick ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}"
            >
                {currentVideo < items.length - 1 ? "Next" : "It's time for Olu bb now!"}
            </button>
        </div>
    {/if}

    <!-- Olu -->
    {#if stage === "olu"}
        <div class="text-center">
            <h2 class="text-2xl font-bold text-pink-700 mb-4">
                Playing message from Olu bb!!!
            </h2>
            <div class="flex justify-center">
                <iframe
                    src="https://drive.google.com/file/d/1S7MMtxfXMUxsuO5kBX1h3h1ftcfosXD5/preview"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                    class="rounded-lg shadow-lg w-108 max-w-5xl h-108"
                >
            This is Your Handsome HUSBAND.
            </iframe>
            </div>

            <button 
                on:click={reveal}
                disabled={!canClick}
                class="mt-6 py-3 px-6 rounded-lg transition shadow
                {canClick ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}"
            >
                Reveal Gift
            </button>
        </div>
    {/if}

    <!-- Reveal -->
    {#if stage === "reveal"}
        <div class="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-pink-100 to-white p-0 -mt-50">
            <div class="absolute left-0 top-0 h-full w-1/2 bg-pink-400 curtain curtain-left"></div>
            <div class="absolute right-0 top-0 h-full w-1/2 bg-pink-400 curtain curtain-right"></div>
            <div class="z-10 text-center opacity-0 animate-fadeIn [animation-delay:2s]">
                <h1 class="text-5xl font-extrabold text-slate-700 mb-6 animate-bounce">
                    Here’s Your Birthday Gift !!!
                </h1>
                <p class="text-lg text-gray-700 mb-6">
                    Click the button below to see your special gift.    
                </p>
                <a
                    href="https://oludezenla.vercel.app/"
                    class="bg-gradient-to-r from-pink-500 to-green-500 text-white py-4 px-10 rounded-2xl text-2xl font-bold hover:scale-105 transition shadow-xl"
                >
                    Reveal Gift
                </a>
            </div>
        </div>
    {/if}
</div>

<style>
  @keyframes slideLeft {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }
  @keyframes slideRight {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
  .curtain-left { animation: slideLeft 2s ease-in-out forwards; }
  .curtain-right { animation: slideRight 2s ease-in-out forwards; }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
</style>
