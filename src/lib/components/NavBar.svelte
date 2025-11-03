<script lang="ts">
	import { content, type ContentItem } from '$lib/data/content';
	import { onMount } from 'svelte';

	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Blogs', href: '/blogs' },
		{ name: 'Games', href: '/games' },
		{ name: 'Physics', href: '/physics' },
		{ name: 'Projects', href: '/projects' }
	];

	let query = '';
	let results: ContentItem[] = [];

	function searchContent() {
		const q = query.toLowerCase().trim();

		if (!q) {
			results = [];
			return;
		}

		results = content.filter(
			(item) =>
				item.title.toLowerCase().includes(q) ||
				item.description.toLowerCase().includes(q) ||
				item.category.toLowerCase().includes(q)
		);
	}
</script>

<header class="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-gray-50 shadow-sm">
	<div class="flex flex-col items-center px-6 py-4">
		<!-- Title -->
		<h1 class="item-right font-serif text-2xl font-bold tracking-wide md:text-3xl">
			Puspa Kamal Rai
		</h1>

		<!-- Nav links -->
		<ul class="mt-2 flex space-x-6">
			{#each navLinks as link}
				<li>
					<a href={link.href} class="relative transition-colors duration-200 hover:text-gray-900">
						{link.name}
						<span
							class="absolute -bottom-1 left-0 h-0.5 w-0 bg-gray-800 transition-all duration-300 hover:w-full"
						></span>
					</a>
				</li>
			{/each}
		</ul>

		<!-- Search bar -->
		<div class="relative mt-4 w-full max-w-md">
			<input
				type="text"
				placeholder="Search..."
				bind:value={query}
				on:input={searchContent}
				class="w-full rounded-full border border-gray-300 px-4 py-2 transition focus:border-gray-500 focus:outline-none"
			/>

			<!-- Results dropdown -->
			{#if results.length > 0}
				<ul
					class="absolute left-0 z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg"
				>
					{#each results as item}
						<li>
							<a href={item.link} class="block px-4 py-2 transition hover:bg-gray-100">
								<div class="font-medium">{item.title}</div>
								<div class="text-sm text-gray-500">{item.category}</div>
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</header>
