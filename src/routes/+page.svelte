<script lang="ts">
	import { onMount } from 'svelte';
	import { content } from '$lib/data/content';
	import WhatsAppButton from '$lib/components/WhatsAppButton.svelte';

	let isVisible = false;
	let sectionsVisible: { [key: string]: boolean } = {};

	onMount(() => {
		isVisible = true;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						sectionsVisible[entry.target.id] = true;
					}
				});
			},
			{ threshold: 0.1 }
		);

		document.querySelectorAll('.scroll-section').forEach((section) => {
			observer.observe(section);
		});

		return () => observer.disconnect();
	});

	const skills = [
		'Python',
		'SvelteKit',
		'Arduino',
		'LabVIEW',
		'LTSpice',
		'Circuit Design',
		'Embedded Systems',
		'Optics',
		'Semiconductors'
	];

	const featuredProjects = content.filter((item) => item.category === 'project').slice(0, 3);
	const featuredBlogs = content.filter((item) => item.category === 'blog').slice(0, 3);
	const featuredGames = content.filter((item) => item.category === 'game').slice(0, 3);
</script>

<svelte:head>
	<title>Puspa Kamal Rai - Physicist, Developer & Musician</title>
	<meta
		name="description"
		content="Physics postgraduate passionate about semiconductors, optics, embedded systems, and web development. Flutist and Piccolo player blending science with artistry."
	/>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
	<!-- Hero Section -->
	<section
		class="mx-auto max-w-5xl px-6 py-16 transition-all duration-1000 {isVisible
			? 'translate-y-0 opacity-100'
			: 'translate-y-8 opacity-0'}"
	>
		<!-- Main Heading -->
		<div class="mb-8">
			<h1
				class="mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-5xl leading-tight font-bold text-transparent dark:from-gray-100 dark:via-gray-300 dark:to-gray-100 md:text-6xl lg:text-7xl"
			>
				Physicist, Developer & Musician
			</h1>
			<div class="flex flex-wrap gap-3 text-lg font-medium text-gray-600 md:text-xl">
				<span class="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 dark:border-blue-800 dark:bg-blue-900 dark:text-blue-200">Physicronics</span>
				<span class="rounded-full border border-purple-200 bg-purple-50 px-4 py-2 dark:border-purple-800 dark:bg-purple-900 dark:text-purple-200">Codelian</span>
				<span class="rounded-full border border-pink-200 bg-pink-50 px-4 py-2 dark:border-pink-800 dark:bg-pink-900 dark:text-pink-200">Musicologist</span>
			</div>
		</div>

		<!-- Introduction -->
		<div class="prose prose-lg mb-12 max-w-none">
			<p class="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
				I'm a Physics postgraduate at
				<span class="font-semibold text-gray-900 dark:text-white">Sri Sathya Sai Institute of Higher Learning</span
				>, passionate about research, design, and technology-driven innovation. I integrate physics
				and programming to transform innovative ideas into practical solutions.
			</p>
		</div>

		<!-- Divider -->
		<div class="my-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>

		<!-- About Section -->
		<div class="mb-16 space-y-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
			<div
				class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
			>
				<h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Research & Innovation</h2>
				<p>
					My interests span <strong>semiconductors</strong>, <strong>optics</strong>,
					<strong>electronics</strong>, <strong>embedded systems</strong>, and
					<strong>automation using microcontrollers</strong> — where I love turning theoretical concepts
					into real-world solutions. I thrive at the intersection of physics and engineering, creating
					systems that bridge theory and practice.
				</p>
			</div>

			<div
				class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
			>
				<h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Musical Journey</h2>
				<p>
					Beyond science, I'm a <strong>Flutist and Piccolo player</strong> in the University Brass
					Band — <span class="font-semibold text-gray-900 dark:text-white">Rhythmic Energy</span>. Music sharpens my
					focus and creativity. I have a strong passion for composing and arranging music tailored
					for brass ensembles, quintets, and more. As a leader and collaborator, I strive to bring
					clarity, innovation, and purpose to everything I do — blending logic with artistry to
					create meaningful impact.
				</p>
			</div>
		</div>

		<!-- Skills Section -->
		<div class="mb-16 scroll-section" id="skills">
			<h2 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Technical Skills</h2>
			<div class="flex flex-wrap gap-3">
				{#each skills as skill}
					<span
						class="cursor-default rounded-full border border-gray-300 bg-gradient-to-r from-gray-100 to-gray-50 px-5 py-2.5 font-medium text-gray-800 transition-all duration-300 hover:border-gray-400 hover:shadow-md dark:border-gray-600 dark:from-gray-700 dark:to-gray-800 dark:text-gray-200"
					>
						{skill}
					</span>
				{/each}
			</div>
		</div>

		<!-- Featured Projects Section -->
		<div class="mb-16 scroll-section" id="projects">
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
				<a
					href="/projects"
					class="text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
				>
					View All →
				</a>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each featuredProjects as project}
					<a
						href={project.link}
						class="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
					>
						{#if project.imgSrc}
							<img
								src={project.imgSrc}
								alt={project.title}
								class="mb-4 h-32 w-full rounded-lg object-cover"
							/>
						{/if}
						<h3
							class="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400"
						>
							{project.title}
						</h3>
						<p class="leading-relaxed text-gray-600 dark:text-gray-400">
							{project.description}
						</p>
					</a>
				{/each}
			</div>
		</div>

		<!-- Featured Blogs Section -->
		<div class="mb-16 scroll-section" id="blogs">
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white">Latest Blogs</h2>
				<a
					href="/blogs"
					class="text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
				>
					View All →
				</a>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each featuredBlogs as blog}
					<a
						href={blog.link}
						class="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
					>
						{#if blog.imgSrc}
							<img
								src={blog.imgSrc}
								alt={blog.title}
								class="mb-4 h-32 w-full rounded-lg object-cover"
							/>
						{/if}
						<h3
							class="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400"
						>
							{blog.title}
						</h3>
						<p class="line-clamp-3 leading-relaxed text-gray-600 dark:text-gray-400">
							{blog.description}
						</p>
					</a>
				{/each}
			</div>
		</div>

		<!-- Featured Games Section -->
		<div class="mb-16 scroll-section" id="games">
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white">Fun Games</h2>
				<a
					href="/games"
					class="text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
				>
					View All →
				</a>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each featuredGames as game}
					<a
						href={game.link}
						class="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
					>
						{#if game.imgSrc}
							<img
								src={game.imgSrc}
								alt={game.title}
								class="mb-4 h-32 w-full rounded-lg object-cover"
							/>
						{/if}
						<h3
							class="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400"
						>
							{game.title}
						</h3>
						<p class="leading-relaxed text-gray-600 dark:text-gray-400">
							{game.description}
						</p>
					</a>
				{/each}
			</div>
		</div>

		<!-- Call to Action -->
		<div
			class="rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-center text-white shadow-lg dark:from-gray-800 dark:to-gray-900"
		>
			<h2 class="mb-4 text-3xl font-bold">Let's Connect</h2>
			<p class="mb-6 text-lg text-gray-300">
				Interested in collaboration, research opportunities, or just want to chat about physics,
				code, or music?
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				<a
					href="https://www.linkedin.com/in/puspa-kamal-rai-48824b364/"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-100"
				>
					LinkedIn
				</a>
				<a
					href="mailto:rpuspakamal@gmail.com"
					class="rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-100"
				>
					Email Me
				</a>
				<a
					href="https://github.com/puspkml"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-100"
				>
					GitHub
				</a>
			</div>
		</div>
	</section>
</div>

<WhatsAppButton />
