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
	<title>Puspa Kamal Rai - Physicist, Developer & Musician</title>

	<meta
		name="description"
		content="Official website of Puspa Kamal Rai — Physicist, developer, and musician. Physics postgraduate passionate about electronics, semiconductors, optics, embedded systems, and programming."
	/>

	<meta
		name="keywords"
		content="Puspa Kamal Rai, puspakamalrai, puspakamal rai, Pushpa Kamal Rai, Pushpakamal Rai, Pusphakamal Rai, Puspa Kamal Dahal, Pushpa Kamal Dahal, Puspakamal, Pushpakamal, Physics, Physicist, Developer, Musician, Flutist, SSSIHL, Semiconductors, Optics, Embedded Systems, SSSIHL Physics, sssihl, Sri Sathya Sai, Sai Baba, Sathya Sai, Prashanti Nilayam, Puspa Kamal Wooden Furnitures, Mirik, Darjeeling, Piccolo, flute, Brass Band, Rhthymic Energy, RE"
	/>

	<meta name="author" content="Puspa Kamal Rai" />

	<!-- Canonical link to tell Google your preferred URL -->
	<link rel="canonical" href="https://puspa-opal.vercel.app/" />

	<!-- Open Graph (for link previews on social media) -->
	<meta property="og:title" content="Puspa Kamal Rai - Physicist, Developer & Musician" />
	<meta property="og:description" content="Physicist and developer passionate about semiconductors, optics, and embedded systems." />
	<meta property="og:image" content="https://puspa-opal.vercel.app/flautist.png" />
	<meta property="og:url" content="https://puspa-opal.vercel.app/" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Puspa Kamal Rai - Physicist, Developer & Musician" />
	<meta name="twitter:description" content="Official website of Puspa Kamal Rai, Physicist, Developer, and Musician." />
	<meta name="twitter:image" content="https://puspa-opal.vercel.app/flautist.png" />

	<link rel="icon" href={favicon} />
</svelte:head>


<div class="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
	<NavBar />

	<main class="flex-1 pt-20 md:pt-24">
		{@render children?.()}
	</main>
	
	<Footer />
</div>

<ScrollToTop />
