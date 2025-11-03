<script lang="ts">
	import { onMount } from 'svelte';

	let pdfExists = false;
	let loading = true;

	onMount(async () => {
		try {
			const response = await fetch('/resume.pdf', { method: 'HEAD' });
			pdfExists = response.ok;
		} catch (error) {
			pdfExists = false;
		} finally {
			loading = false;
		}
	});

	function downloadResume() {
		const link = document.createElement('a');
		link.href = '/Resume.pdf';
		link.download = 'Puspa_Kamal_Rai_Resume.pdf';
		link.click();
	}
</script>

<svelte:head>
	<title>Resume - Puspa Kamal Rai</title>
	<meta name="description" content="View and download the resume of Puspa Kamal Rai" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
	<div class="mx-auto max-w-6xl px-6 py-16">
		<div class="mb-8 text-center">
			<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">Resume</h1>
			<p class="text-lg text-gray-600 dark:text-gray-400">
				Puspa Kamal Rai - Physicist, Developer & Musician
			</p>
		</div>

		{#if loading}
			<div class="flex items-center justify-center py-20">
				<div class="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
			</div>
		{:else if pdfExists}
			<div class="space-y-6">
				<!-- Download Button -->
				<div class="flex justify-center">
					<button
						on:click={downloadResume}
						class="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						Download Resume
					</button>
				</div>

				<!-- PDF Viewer -->
				<div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
					<iframe
						src="/resume.pdf"
						title="Resume PDF"
						class="h-[800px] w-full"
						style="border: none;"
					></iframe>
				</div>

				<!-- Alternative: Object tag for better compatibility -->
				<!-- <object
					data="/resume.pdf"
					type="application/pdf"
					class="h-[800px] w-full rounded-2xl"
				>
					<p class="p-8 text-center text-gray-600 dark:text-gray-400">
						Your browser doesn't support PDF viewing. Please
						<button on:click={downloadResume} class="text-blue-600 underline hover:text-blue-700">
							download the PDF
						</button>
						to view it.
					</p>
				</object> -->
			</div>
		{:else}
			<div class="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-lg dark:border-gray-700 dark:bg-gray-800">
				<svg
					class="mx-auto mb-6 h-24 w-24 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
				<h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Resume Not Available</h2>
				<p class="mb-6 text-gray-600 dark:text-gray-400">
					The resume PDF is not currently uploaded. Please upload a file named <code
						class="rounded bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-700">resume.pdf</code
					> to the <code class="rounded bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-700"
						>static/</code
					> folder.
				</p>
				<div class="rounded-lg bg-blue-50 p-4 text-left dark:bg-blue-900/20">
					<p class="text-sm text-gray-700 dark:text-gray-300">
						<strong>Instructions:</strong><br />
						1. Place your resume PDF in: <code
							class="rounded bg-white px-2 py-1 font-mono text-xs dark:bg-gray-800"
							>/vercel/sandbox/static/resume.pdf</code
						><br />
						2. Refresh this page to view your resume
					</p>
				</div>
			</div>
		{/if}
	</div>
</div>
