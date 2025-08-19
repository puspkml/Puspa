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

<header class="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm">
  <div class="flex flex-col items-center px-6 py-4">
    <!-- Title -->
    <h1 class="text-2xl md:text-3xl font-bold tracking-wide font-serif">Puspa Kamal Rai</h1>

    <!-- Nav links -->
    <ul class="flex space-x-6 mt-2">
      {#each navLinks as link}
        <li>
          <a
            href={link.href}
            class="relative hover:text-gray-900 transition-colors duration-200"
          >
            {link.name}
            <span
              class="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-800 transition-all duration-300 hover:w-full"
            ></span>
          </a>
        </li>
      {/each}
    </ul>

    <!-- Search bar -->
    <div class="mt-4 w-full max-w-md relative">
      <input
        type="text"
        placeholder="Search..."
        bind:value={query}
        on:input={searchContent}
        class="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-gray-500 transition"
      />

      <!-- Results dropdown -->
      {#if results.length > 0}
        <ul
          class="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          {#each results as item}
            <li>
              <a
                href={item.link}
                class="block px-4 py-2 hover:bg-gray-100 transition"
              >
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
