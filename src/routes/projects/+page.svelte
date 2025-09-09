<svelte:head>
  <title>Puspa Kamal Rai | Projects</title>
  <meta name="description" content="Offical website of Puspa Kamal Rai — The Projects completed and worked on are here. These projects are the solutions of the practical problems of daily life" />
</svelte:head>

<script lang="ts">
  interface Project {
    title: string;
    description: string;
    link: string;
    imgSrc?: string;
  }
  import { content } from "$lib/data/content";

  const projects: Project[] = content.filter(item => item.category === "project");
</script>

<style>
  h1 {
    text-align: center;
    font-size: 3rem;
    margin: 2rem 0;
    color: #222;
    font-family: 'Arial Black', sans-serif;
    text-shadow: 1px 1px 4px rgba(0,0,0,0.3);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 0 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .card {
    background: linear-gradient(145deg, #8e9eab, #eef2f3);
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
    text-align: center;
  }

  .card:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 12px 30px rgba(0,0,0,0.3);
  }

  .title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .description {
    color: #555;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .img {
    display: block;
    margin: 0 auto 1rem auto; /* centers horizontally */
    width: 150px;
    height: 150px;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

    /* 🔹 Empty State */
  .empty-state {
    text-align: center;
    margin: 4rem auto;
    padding: 3rem 2rem;
    max-width: 500px;
    border-radius: 16px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    box-shadow: 0 8px 24px rgba(0,0,0,0.05);
  }

  .empty-state h2 {
    font-size: 1.6rem;
    font-weight: 700;
    margin: 1rem 0 0.5rem 0;
    color: #1f2937;
  }

  .empty-state p {
    font-size: 1rem;
    color: #6b7280;
  }

  .illustration {
    width: 80px;
    height: 80px;
    margin: 0 auto 1rem auto;
    display: block;
  }
</style>

<h1>Projects</h1>


{#if projects.length > 0}
  <div class="grid">
    {#each projects as project}
      <div class="card" on:click={() => window.location.href = project.link}>
        {#if project.imgSrc}
          <img class="img" src={project.imgSrc} alt={project.title} />
        {/if}
        <div class="title">{project.title}</div>
        <div class="description">{project.description}</div>
      </div>
    {/each}
  </div>
{:else}
  <div class="empty-state">
    <h2>Content Coming Soon</h2>
    <p>Please check back shortly!</p>
  </div>
{/if}
