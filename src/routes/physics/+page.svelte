<svelte:head>
  <title>Puspa Kamal Rai | Physics</title>
  <meta name="description" content="Offical website of Puspa Kamal Rai — The Physcist born ready with the explanations and equations." />
</svelte:head>
<script lang="ts">
  // Define type for your content
  interface Game {
    title: string;
    description: string;
    link: string; // route to the game's page
    imgSrc?: string; // optional image for the game card
    category?: string; // in case content has more fields
  }

  // Import your content
  import { content } from "$lib/data/content";

  // Ensure it's typed correctly & filter games
  const games: Game[] = (content as Game[]).filter(
    (item) => item.category === "game"
  );

  // Fallback (if empty)
  const hasGames = games.length > 0;
</script>