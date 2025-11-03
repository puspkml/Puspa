<script lang="ts">
	import { onMount } from 'svelte';

	let isVisible = false;

	onMount(() => {
		isVisible = true;
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

	const projects = [
		{
			title: '3D-Printed Smartphone Spectrometer',
			description: 'Developed at IIT Kharagpur, combining 3D printing with optical physics',
			tags: ['Optics', 'Research', '3D Printing']
		},
		{
			title: 'Wireless Automated Bell System',
			description: 'IoT-based automation system for institutional bell management',
			tags: ['IoT', 'Arduino', 'Automation']
		},
		{
			title: 'DREAM Assay Based Colorimeter',
			description: 'Precision colorimetric analysis tool for biochemical applications',
			tags: ['Optics', 'Electronics', 'Research']
		},
		{
			title: 'Custom UPS System',
			description: 'Designed and built a custom uninterruptible power supply',
			tags: ['Electronics', 'Circuit Design', 'Power Systems']
		}
	];
</script>

<svelte:head>
	<title>Puspa Kamal Rai - Physicist, Developer & Musician</title>
	<meta
		name="description"
		content="Physics postgraduate passionate about semiconductors, optics, embedded systems, and web development. Flutist and Piccolo player blending science with artistry."
	/>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
	<!-- Hero Section -->
	<section
		class="mx-auto max-w-5xl px-6 py-16 transition-all duration-1000 {isVisible
			? 'translate-y-0 opacity-100'
			: 'translate-y-8 opacity-0'}"
	>
		<!-- Main Heading -->
		<div class="mb-8">
			<h1
				class="mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-5xl leading-tight font-bold text-transparent md:text-6xl lg:text-7xl"
			>
				Physicist, Developer & Musician
			</h1>
			<div class="flex flex-wrap gap-3 text-lg font-medium text-gray-600 md:text-xl">
				<span class="rounded-full border border-blue-200 bg-blue-50 px-4 py-2">Physicronics</span>
				<span class="rounded-full border border-purple-200 bg-purple-50 px-4 py-2">Codelian</span>
				<span class="rounded-full border border-pink-200 bg-pink-50 px-4 py-2">Musicologist</span>
			</div>
		</div>

		<!-- Introduction -->
		<div class="prose prose-lg mb-12 max-w-none">
			<p class="text-xl leading-relaxed text-gray-700">
				I'm a Physics postgraduate at
				<span class="font-semibold text-gray-900">Sri Sathya Sai Institute of Higher Learning</span
				>, passionate about research, design, and technology-driven innovation. I integrate physics
				and programming to transform innovative ideas into practical solutions.
			</p>
		</div>

		<!-- Divider -->
		<div class="my-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

		<!-- About Section -->
		<div class="mb-16 space-y-8 text-lg leading-relaxed text-gray-700">
			<div
				class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
			>
				<h2 class="mb-4 text-2xl font-bold text-gray-900">Research & Innovation</h2>
				<p>
					My interests span <strong>semiconductors</strong>, <strong>optics</strong>,
					<strong>electronics</strong>, <strong>embedded systems</strong>, and
					<strong>automation using microcontrollers</strong> — where I love turning theoretical concepts
					into real-world solutions. I thrive at the intersection of physics and engineering, creating
					systems that bridge theory and practice.
				</p>
			</div>

			<div
				class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
			>
				<h2 class="mb-4 text-2xl font-bold text-gray-900">Musical Journey</h2>
				<p>
					Beyond science, I'm a <strong>Flutist and Piccolo player</strong> in the University Brass
					Band — <span class="font-semibold text-gray-900">Rhythmic Energy</span>. Music sharpens my
					focus and creativity. I have a strong passion for composing and arranging music tailored
					for brass ensembles, quintets, and more. As a leader and collaborator, I strive to bring
					clarity, innovation, and purpose to everything I do — blending logic with artistry to
					create meaningful impact.
				</p>
			</div>
		</div>

		<!-- Skills Section -->
		<div class="mb-16">
			<h2 class="mb-6 text-3xl font-bold text-gray-900">Technical Skills</h2>
			<div class="flex flex-wrap gap-3">
				{#each skills as skill}
					<span
						class="cursor-default rounded-full border border-gray-300 bg-gradient-to-r from-gray-100 to-gray-50 px-5 py-2.5 font-medium text-gray-800 transition-all duration-300 hover:border-gray-400 hover:shadow-md"
					>
						{skill}
					</span>
				{/each}
			</div>
		</div>

		<!-- Projects Section -->
		<div class="mb-16">
			<h2 class="mb-6 text-3xl font-bold text-gray-900">Featured Projects</h2>
			<div class="grid gap-6 md:grid-cols-2">
				{#each projects as project}
					<div
						class="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-xl"
					>
						<h3
							class="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600"
						>
							{project.title}
						</h3>
						<p class="mb-4 leading-relaxed text-gray-600">
							{project.description}
						</p>
						<div class="flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span
									class="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700"
								>
									{tag}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
			<div class="mt-8 text-center">
				<a
					href="/projects"
					class="inline-block rounded-full bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
				>
					View All Projects
				</a>
			</div>
		</div>

		<!-- Call to Action -->
		<div
			class="rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-center text-white shadow-lg"
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
