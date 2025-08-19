<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
	<NavBar />

	<main class="flex-1 pt-[220px]"> <!-- Adjust padding to match navbar height -->
		{@render children?.()}
	</main>
</div>
<Footer />