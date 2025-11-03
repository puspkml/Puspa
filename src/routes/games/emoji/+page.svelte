<script lang="ts">
	import { onMount } from 'svelte';
	import { emoji } from '$lib/data/emoji';
	import { goto } from '$app/navigation';

	function goToGames() {
		goto('/games');
	}

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let size = 400; // Fixed board size
	let gridCols = 4;
	let gridRows = 4;
	let timerLimit = 60; // seconds
	let level = 1;
	let timer = 0;
	let stars = 3;
	let timerInterval: any;
	let gameOver = false;

	let showModal = false;
	let modalTitle = '';
	let modalMessage = '';
	let modalType: 'success' | 'fail' = 'success';

	let cards: {
		emoji: string;
		flipped: boolean;
		animating: boolean;
		progress: number;
		x: number;
		y: number;
	}[] = [];

	let firstCard: any = null;
	let secondCard: any = null;
	let lockBoard = false;

	function startTimer() {
		clearInterval(timerInterval);
		timer = 0;
		gameOver = false;
		timerInterval = setInterval(() => {
			if (!gameOver) {
				timer++;
				if (timer > timerLimit) {
					gameOver = true;
					clearInterval(timerInterval);
					showResultModal('Time Up!', '⏳ You failed this level.', 'fail');
				}
			}
		}, 1000);
	}

	function calculateStars() {
		if (timer <= timerLimit * 0.5) return 3;
		if (timer <= timerLimit * 0.75) return 2;
		if (timer <= timerLimit) return 1;
		return 0;
	}

	function showResultModal(title: string, message: string, type: 'success' | 'fail') {
		modalTitle = title;
		modalMessage = message;
		modalType = type;
		showModal = true;
	}

	function nextLevel() {
		showModal = false;
		level++;
		timerLimit = 60 + (level - 1) * 15; // Increase time limit
		if (gridCols < 8) {
			gridCols++;
			gridRows++;
		}
		resetGame();
	}

	function resetGame() {
		clearInterval(timerInterval);
		gameOver = false;
		firstCard = null;
		secondCard = null;
		lockBoard = false;

		const totalCards = gridCols * gridRows;
		const neededEmojis = totalCards / 2;

		const selected = [...emoji].sort(() => Math.random() - 0.5).slice(0, neededEmojis);
		const doubled = [...selected, ...selected];

		cards = doubled
			.sort(() => Math.random() - 0.5)
			.map((emoji, i) => ({
				emoji,
				flipped: false,
				animating: false,
				progress: 0,
				x: (i % gridCols) * (size / gridCols),
				y: Math.floor(i / gridCols) * (size / gridCols)
			}));

		drawBoard();
		startTimer();
	}

	function drawBoard() {
		ctx.clearRect(0, 0, size, size);
		cards.forEach((card) => {
			ctx.save();
			const cardW = size / gridCols - 10;
			const cardH = size / gridCols - 10;
			const centerX = card.x + cardW / 2 + 5;
			const centerY = card.y + cardH / 2 + 5;

			ctx.translate(centerX, centerY);
			let scaleX = 1;
			if (card.animating) {
				scaleX = Math.cos(card.progress * Math.PI);
			} else if (card.flipped) {
				scaleX = -1;
			}
			ctx.scale(scaleX, 1);
			ctx.translate(-centerX, -centerY);

			ctx.fillStyle = card.flipped ? '#eee' : '#444';
			ctx.fillRect(card.x + 5, card.y + 5, cardW, cardH);

			if (card.flipped || (card.animating && card.progress > 0.5)) {
				const fontSize = Math.floor(cardW * 0.6);
				ctx.font = `${fontSize}px Arial`;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(card.emoji, card.x + size / (gridCols * 2), card.y + size / (gridCols * 2));
			}
			ctx.restore();
		});
	}

	function animate() {
		let animating = false;
		cards.forEach((card) => {
			if (card.animating) {
				card.progress += 0.05;
				if (card.progress >= 1) {
					card.progress = 0;
					card.animating = false;
					card.flipped = !card.flipped;
				}
				animating = true;
			}
		});
		if (animating) {
			drawBoard();
			requestAnimationFrame(animate);
		} else {
			drawBoard();
		}
	}

	function getCardAt(x: number, y: number) {
		return cards.find(
			(c) =>
				x > c.x + 5 && x < c.x + size / gridCols - 5 && y > c.y + 5 && y < c.y + size / gridCols - 5
		);
	}

	function flipCard(card: any) {
		card.animating = true;
		card.progress = 0;
		animate();
	}

	function handleClick(e: MouseEvent) {
		if (lockBoard || gameOver) return;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const card = getCardAt(x, y);

		if (!card || card.flipped || card.animating) return;

		flipCard(card);

		if (!firstCard) {
			firstCard = card;
		} else if (!secondCard) {
			secondCard = card;
			lockBoard = true;
			setTimeout(checkMatch, 400);
		}
	}

	function checkMatch() {
		if (firstCard.emoji === secondCard.emoji) {
			firstCard = null;
			secondCard = null;
			lockBoard = false;

			if (cards.every((c) => c.flipped)) {
				gameOver = true;
				clearInterval(timerInterval);
				stars = calculateStars();
				if (stars > 0) {
					showResultModal(
						`Level ${level} Complete!`,
						`You finished in ${timer}s ⭐ x${stars}`,
						'success'
					);
				} else {
					showResultModal('You failed!', '❌ Try again.', 'fail');
				}
			}
		} else {
			setTimeout(() => {
				flipCard(firstCard);
				flipCard(secondCard);
				firstCard = null;
				secondCard = null;
				lockBoard = false;
			}, 500);
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		resetGame();
		canvas.addEventListener('click', handleClick);
	});
</script>

<div class="flex h-screen flex-col items-center justify-center space-y-6 bg-gray-100">
	<h1 class="text-4xl font-bold text-zinc-900">Memory Match</h1>

	<div class="text-lg font-semibold">
		Level: {level} | Time: {timer}s | ⭐: {stars}
	</div>

	<canvas
		bind:this={canvas}
		width={size}
		height={size}
		class="rounded-lg border border-gray-500 shadow-lg"
	></canvas>

	<button
		on:click={resetGame}
		class="rounded-xl bg-zinc-500 px-6 py-2 text-white shadow transition hover:bg-zinc-600"
	>
		Restart
	</button>

	{#if showModal}
		<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
			<div class="w-80 rounded-2xl bg-white p-6 text-center shadow-xl">
				<h2 class="mb-2 text-2xl font-bold">{modalTitle}</h2>
				<p class="mb-4 text-gray-700">{modalMessage}</p>
				{#if modalType === 'success'}
					<button
						class="mr-2 rounded-xl bg-green-500 px-6 py-2 text-white hover:bg-green-600"
						on:click={nextLevel}
					>
						Next Level
					</button>
				{/if}
				<button
					class="rounded-xl bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
					on:click={() => {
						showModal = false;
						resetGame();
					}}
				>
					Restart
				</button>
			</div>
		</div>
	{/if}
</div>

<div class="items-center bg-zinc-300 px-6 py-4" on:click={goToGames} style="cursor: pointer;">
	&#8592; Back to Games
</div>
