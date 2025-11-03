<script lang="ts">
	import { onMount } from 'svelte';

	let showButton = $state(false);
	let lastScrollY = $state(0);

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	onMount(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			
			// Show button when:
			// 1. User has scrolled down at least 300px
			// 2. User is scrolling up (trying to go back to top)
			if (currentScrollY > 300 && currentScrollY < lastScrollY) {
				showButton = true;
			} else if (currentScrollY <= 100) {
				// Hide when near top
				showButton = false;
			} else if (currentScrollY > lastScrollY) {
				// Hide when scrolling down
				showButton = false;
			}
			
			lastScrollY = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

{#if showButton}
	<button
		onclick={scrollToTop}
		class="fixed top-15 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-zinc-500 to-zinc-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:from-zinc-600 hover:to-zinc-700 dark:from-zinc-600 dark:to-zinc-700 dark:hover:from-zinc-700 dark:hover:to-zinc-800 animate-in fade-in slide-in-from-bottom-4"
		aria-label="Scroll to top"
	>
		<svg
			class="h-6 w-6"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="5"
				d="M5 10l7-7m0 0l7 7m-7-7v18"
			/>
		</svg>
	</button>
{/if}

<style>
	@keyframes slide-in-from-bottom-4 {
		from {
			transform: translateY(1rem);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-in {
		animation-fill-mode: both;
	}

	.slide-in-from-bottom-4 {
		animation-name: slide-in-from-bottom-4;
		animation-duration: 300ms;
	}

	.fade-in {
		animation-name: fade-in;
		animation-duration: 200ms;
	}

	button {
		-webkit-tap-highlight-color: transparent;
	}
</style>
