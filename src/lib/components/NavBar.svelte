<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import { page } from '$app/stores';

	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Blogs', href: '/blogs' },
		{ name: 'Games', href: '/games' },
		{ name: 'Physics', href: '/physics' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Resume', href: '/resume' }
	];

	let query = $state('');
	let results: ContentItem[] = $state([]);
	let mobileMenuOpen = $state(false);
	let searchFocused = $state(false);

	function searchContent() {
		const q = query.toLowerCase().trim();
		results = q
			? content.filter(
					(item) =>
						item.title.toLowerCase().includes(q) ||
						item.description.toLowerCase().includes(q) ||
						item.category.toLowerCase().includes(q)
			  )
			: [];
	}

	function toggleTheme() {
		currentTheme = currentTheme === 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', currentTheme);
		document.documentElement.classList.toggle('dark', currentTheme === 'dark');
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function closeSearch() {
		query = '';
		results = [];
		searchFocused = false;
	}

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest('.search-container')) {
				closeSearch();
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<!-- Desktop Navbar -->
<header class="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm dark:border-gray-700 dark:bg-gray-900/95 transition-all duration-300">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 md:h-20 items-center justify-between">
			<!-- Logo/Title -->
			<a href="/" class="flex items-center space-x-2 group">
				<h1 class="font-serif text-xl md:text-2xl font-bold tracking-wide text-gray-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
					Puspa Kamal Rai
				</h1>
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden lg:flex items-center space-x-1">
				{#each navLinks as link}
					<a
						href={link.href}
						class="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
					>
						{link.name}
					</a>
				{/each}
			</nav>

			<!-- Right side: Search + Theme + Mobile Menu -->
			<div class="flex items-center space-x-2 md:space-x-4">
				<!-- Search (Desktop) -->
				<div class="hidden md:block relative search-container">
					<input
						type="text"
						placeholder="Search..."
						bind:value={query}
						oninput={searchContent}
						onfocus={() => searchFocused = true}
						class="w-48 lg:w-64 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
					/>

					<!-- Search Results Dropdown -->
					{#if results.length > 0 && searchFocused}
						<div class="absolute right-0 left-0 mt-2 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 animate-in fade-in slide-in-from-top-2 duration-200">
							{#each results as item}
								<a
									href={item.link}
									onclick={closeSearch}
									class="block px-4 py-3 transition hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
								>
									<div class="font-medium text-gray-900 dark:text-white">{item.title}</div>
									<div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.category}</div>
								</a>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Theme Toggle -->
				<button
					onclick={toggleTheme}
					class="rounded-full p-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110"
					aria-label="Toggle theme"
				>
					{#if $theme === 'light'}
						<svg class="h-5 w-5 md:h-6 md:w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
						</svg>
					{:else}
						<svg class="h-5 w-5 md:h-6 md:w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					{/if}
				</button>

				<!-- Mobile Menu Button -->
				<button
					onclick={toggleMobileMenu}
					class="lg:hidden rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
					aria-label="Toggle menu"
				>
					{#if !mobileMenuOpen}
						<svg class="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{:else}
						<svg class="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>
</header>

<!-- Mobile Sidebar -->
{#if mobileMenuOpen}
	<!-- Overlay -->
	<div
		class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
		onclick={closeMobileMenu}
		role="button"
		tabindex="0"
		aria-label="Close menu"
	></div>

	<!-- Sidebar -->
	<aside class="fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl lg:hidden animate-in slide-in-from-left duration-300">
		<div class="flex h-full flex-col">
			<!-- Sidebar Header -->
			<div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
				<h2 class="font-serif text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
				<button
					onclick={closeMobileMenu}
					class="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
					aria-label="Close menu"
				>
					<svg class="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Mobile Search -->
			<div class="p-4 border-b border-gray-200 dark:border-gray-700 search-container">
				<input
					type="text"
					placeholder="Search..."
					bind:value={query}
					oninput={searchContent}
					class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
				/>

				<!-- Mobile Search Results -->
				{#if results.length > 0}
					<div class="mt-2 max-h-64 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
						{#each results as item}
							<a
								href={item.link}
								onclick={() => { closeMobileMenu(); closeSearch(); }}
								class="block px-3 py-2 transition hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
							>
								<div class="font-medium text-sm text-gray-900 dark:text-white">{item.title}</div>
								<div class="text-xs text-gray-500 dark:text-gray-400">{item.category}</div>
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Navigation Links -->
			<nav class="flex-1 overflow-y-auto p-4">
				<ul class="space-y-2">
					{#each navLinks as link}
						<li>
							<a
								href={link.href}
								onclick={closeMobileMenu}
								class="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400"
							>
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Sidebar Footer -->
			<div class="border-t border-gray-200 dark:border-gray-700 p-4">
				<p class="text-xs text-center text-gray-500 dark:text-gray-400">
					© {new Date().getFullYear()} Puspa Kamal Rai
				</p>
			</div>
		</div>
	</aside>
{/if}

<style>
	@keyframes slide-in-from-left {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes slide-in-from-top-2 {
		from {
			transform: translateY(-0.5rem);
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

	.slide-in-from-left {
		animation-name: slide-in-from-left;
	}

	.slide-in-from-top-2 {
		animation-name: slide-in-from-top-2;
	}

	.fade-in {
		animation-name: fade-in;
	}

	.duration-200 {
		animation-duration: 200ms;
	}

	.duration-300 {
		animation-duration: 300ms;
	}
</style>
