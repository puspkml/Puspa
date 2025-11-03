<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import confetti from 'canvas-confetti';
	import { dndzone } from 'svelte-dnd-action';

	let stage = '';
	let currentQ = 0;
	let message = '';
	let currentVideo = 0;

	let arranged = false;
	let items = [
		{
			id: 1,
			name: 'Srijal',
			video: 'https://drive.google.com/file/d/1N1DBE7oUVEbjKSq1DtBwlNSe2H3-hIah/preview'
		},
		{
			id: 2,
			name: 'Appa',
			video: 'https://drive.google.com/file/d/1GHTm3mqRzGkwY-Lf9d8ZM6yPim6ATgQF/preview'
		},
		{
			id: 3,
			name: 'Aama',
			video: 'https://drive.google.com/file/d/11sJ67KAzkzK49X01xiNGpv8cadbk_GEF/preview'
		},
		{
			id: 4,
			name: 'Samragi',
			video: 'https://drive.google.com/file/d/1kPsBmfPHQz6ulKuH1TR_-va-4BPqD3t6/preview'
		},
		{
			id: 5,
			name: 'Deshu',
			video: 'https://drive.google.com/file/d/1u1EMBmYpSJlfviEOVCVZYHBHQioW9BAV/preview'
		}
	];

	let canClick = false;

	function openGiftBox() {
		triggerFireworks();
		setTimeout(() => {
			stage = 'message';
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
		stage = 'videos';
		Timeout(); // start timeout as soon as video stage begins
	}

	function nextVideo() {
		if (!canClick) return;
		if (currentVideo < items.length - 1) {
			currentVideo++;
			Timeout(); // lock button again for 10s on new video
		} else {
			stage = 'olu';
			Timeout(); // lock Olu stage button initially
		}
	}

	function reveal() {
		if (!canClick) return;
		Timeout();
		stage = 'reveal';
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
				colors: ['#ff4d6d', '#ffd700', '#00c4ff']
			});
			confetti({
				particleCount: 10,
				angle: 120,
				spread: 80,
				origin: { x: 1 },
				colors: ['#ff4d6d', '#ffd700', '#00c4ff']
			});
			confetti({
				particleCount: 7,
				startVelocity: 50,
				spread: 360,
				origin: { x: Math.random(), y: Math.random() - 0.2 }
			});

			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		})();
	}
</script>

<div class="-mt-15 flex min-h-screen flex-col items-center justify-center bg-white p-0">
	<!-- Stage 0 -->
	{#if stage === ''}
		<img
			src="/giftbox/giftbox.svg"
			alt="Gift Box"
			class="h-64 w-64 animate-bounce cursor-pointer transition-transform hover:scale-105"
			on:click={openGiftBox}
			transition:scale={{ duration: 500 }}
		/>
		<div class="text-center">
			<h2 class="mt-6 text-2xl font-bold text-purple-700" transition:fade>
				Click the Gift Box to Open Your Birthday Surprise!
			</h2>
		</div>
	{/if}

	<!-- Stage 1 -->
	{#if stage === 'message'}
		<div class="text-center">
			<h1 class="mb-6 animate-bounce text-7xl font-extrabold text-pink-600" transition:scale>
				Happy Birthday My Love
			</h1>
			<p class="mb-6 text-lg text-gray-700">
				I have a gift for you, but before you can see it, I have a little surprise planned.
			</p>
			<p class="mb-6 text-lg text-gray-500">Tap the button below to start.</p>
			<button
				on:click={() => (stage = 'arrange')}
				class="rounded-xl bg-pink-500 px-8 py-3 text-xl text-white shadow-lg transition hover:bg-pink-600"
			>
				Click here to start
			</button>
		</div>
	{/if}

	<!-- Arrange -->
	{#if stage === 'arrange'}
		<div class="text-center">
			<h2 class="mb-6 text-3xl font-bold text-pink-600" transition:fade>
				Hiee love!!! these are the birthday messages from your loved ones. Set the order to see them
				in the way you want.
			</h2>
			<p class="mb-6 text-lg text-gray-700">Drag and drop to arrange the order.</p>
			<div
				use:dndzone={{ items, flipDurationMs: 300 }}
				on:consider={handleDnd}
				on:finalize={handleDnd}
				class="mx-auto grid max-w-lg grid-cols-2 gap-4"
			>
				{#each items as item (item.id)}
					<div class="cursor-move rounded-xl bg-white p-6 text-center shadow-lg">
						{item.name}
					</div>
				{/each}
			</div>

			<button
				on:click={lockOrder}
				class="mt-8 rounded-lg bg-pink-500 px-6 py-3 text-white shadow transition hover:bg-pink-600"
			>
				Done
			</button>
		</div>
	{/if}

	<!-- Videos -->
	{#if stage === 'videos'}
		<div class="text-center">
			<h2 class="mb-4 text-2xl font-bold text-pink-700">
				Birthday wish from {items[currentVideo].name}!!!
			</h2>
			<div class="flex justify-center">
				<iframe
					src={items[currentVideo].video}
					allow="autoplay; encrypted-media"
					allowfullscreen
					class="h-108 w-108 max-w-5xl rounded-lg shadow-lg"
				></iframe>
			</div>

			<button
				on:click={nextVideo}
				disabled={!canClick}
				class="mt-6 rounded-lg px-6 py-3 shadow transition
                {canClick
					? 'bg-purple-500 text-white hover:bg-purple-600'
					: 'cursor-not-allowed bg-gray-300 text-gray-500'}"
			>
				{currentVideo < items.length - 1 ? 'Next' : "It's time for Olu bb now!"}
			</button>
		</div>
	{/if}

	<!-- Olu -->
	{#if stage === 'olu'}
		<div class="text-center">
			<h2 class="mb-4 text-2xl font-bold text-pink-700">Playing message from Olu bb!!!</h2>
			<div class="flex justify-center">
				<iframe
					src="https://drive.google.com/file/d/1S7MMtxfXMUxsuO5kBX1h3h1ftcfosXD5/preview"
					allow="autoplay; encrypted-media"
					allowfullscreen
					class="h-108 w-108 max-w-5xl rounded-lg shadow-lg"
				>
					This is Your Handsome HUSBAND.
				</iframe>
			</div>

			<button
				on:click={reveal}
				disabled={!canClick}
				class="mt-6 rounded-lg px-6 py-3 shadow transition
                {canClick
					? 'bg-purple-500 text-white hover:bg-purple-600'
					: 'cursor-not-allowed bg-gray-300 text-gray-500'}"
			>
				Reveal Gift
			</button>
		</div>
	{/if}

	<!-- Reveal -->
	{#if stage === 'reveal'}
		<div
			class="relative -mt-50 flex h-[80vh] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-pink-100 to-white p-0"
		>
			<div class="curtain curtain-left absolute top-0 left-0 h-full w-1/2 bg-pink-400"></div>
			<div class="curtain curtain-right absolute top-0 right-0 h-full w-1/2 bg-pink-400"></div>
			<div class="animate-fadeIn z-10 text-center opacity-0 [animation-delay:2s]">
				<h1 class="mb-6 animate-bounce text-5xl font-extrabold text-slate-700">
					Here’s Your Birthday Gift !!!
				</h1>
				<p class="mb-6 text-lg text-gray-700">Click the button below to see your special gift.</p>
				<a
					href="https://oludezenla.vercel.app/"
					class="rounded-2xl bg-gradient-to-r from-pink-500 to-green-500 px-10 py-4 text-2xl font-bold text-white shadow-xl transition hover:scale-105"
				>
					Reveal Gift
				</a>
			</div>
		</div>
	{/if}
</div>

<style>
	@keyframes slideLeft {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-100%);
		}
	}
	@keyframes slideRight {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(100%);
		}
	}
	.curtain-left {
		animation: slideLeft 2s ease-in-out forwards;
	}
	.curtain-right {
		animation: slideRight 2s ease-in-out forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	.animate-fadeIn {
		animation: fadeIn 1s ease-out forwards;
	}
</style>
