<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	injectSpeedInsights();
	injectAnalytics();

	let { children } = $props();

	onMount(() => {
		theme.init();
	});
</script>

<svelte:head>
	<title>Puspa Kamal Rai</title>
	<meta
		name="description"
		content="Physics postgraduate student passionate about electronics, semiconductors, optics, embedded systems, programming, and web development. Flutist and Piccolo player. Music Composer and Brass ensemble Arranger"
	/>
	<meta name="author" content="Puspa Kamal Rai" />
	<link rel="icon" href={favicon} />
	<meta name="msvalidate.01" content="53818719FC350BBFCFC7DB53DBA811B3" />
</svelte:head>

<div class="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
	<NavBar />

	<main class="flex-1 pt-20 md:pt-24">
		{@render children?.()}
	</main>
	
	<Footer />
</div>

<ScrollToTop />
