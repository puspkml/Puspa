<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import { content, type ContentItem } from '$lib/data/content';

	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Blogs', href: '/blogs' },
		{ name: 'Games', href: '/games' },
		{ name: 'Physics', href: '/physics' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Resume', href: '/resume' }
	];

	let query = '';
	let results: ContentItem[] = [];
	let currentTheme: 'light' | 'dark' = 'light';

	// Initialize theme and sync state
	onMount(() => {
		theme.init();
		const stored = localStorage.getItem('theme');
		currentTheme = stored === 'dark' ? 'dark' : 'light';
		document.documentElement.classList.toggle('dark', currentTheme === 'dark');
	});

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
</script>

<header
	class="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-gray-50 shadow-sm dark:border-gray-700 dark:bg-gray-900 transition-colors duration-300"
>
	<div class="flex flex-col items-center px-6 py-4">
		<div class="flex w-full items-center justify-between">
			<!-- Title -->
			<h1 class="font-serif text-2xl font-bold tracking-wide dark:text-white md:text-3xl">
				Puspa Kamal Rai
			</h1>

			<!-- Theme Toggle Button -->
			<button
				on:click={toggleTheme}
				class="rounded-full p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
				aria-label="Toggle theme"
			>
				{#if currentTheme === 'light'}
					<!-- Moon Icon -->
					<svg
						class="h-6 w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>
				{:else}
					<!-- Sun Icon -->
					<svg
						class="h-6 w-6 text-yellow-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
				{/if}
			</button>
		</div>

		<!-- Navigation -->
		<nav>
			<ul class="mt-2 flex flex-wrap justify-center gap-4 md:space-x-6">
				{#each navLinks as link}
					<li>
						<a
							href={link.href}
							class="relative font-medium transition-colors duration-200 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
						>
							{link.name}
							<span
								class="absolute -bottom-1 left-0 h-0.5 w-0 bg-gray-800 transition-all duration-300 hover:w-full dark:bg-gray-300"
							></span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- Search bar -->
		<div class="relative mt-4 w-full max-w-md">
			<input
				type="text"
				placeholder="Search..."
				bind:value={query}
				on:input={searchContent}
				class="w-full rounded-full border border-gray-300 bg-white px-4 py-2 transition focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-400"
			/>

			<!-- Search Results -->
			{#if results.length > 0}
				<ul
					class="absolute left-0 z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
				>
					{#each results as item}
						<li>
							<a
								href={item.link}
								class="block px-4 py-2 transition hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<div class="font-medium dark:text-white">{item.title}</div>
								<div class="text-sm text-gray-500 dark:text-gray-400">
									{item.category}
								</div>
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</header>
