<script lang="ts">
  interface PhysicsNote {
    title: string;
    description: string;
    link: string;
    imgSrc?: string;
  }
  import { content } from "$lib/data/content";

  const physicsNotes: PhysicsNote[] = content.filter(item => item.category === "physics");
</script>

<h1>Physics</h1>

{#if physicsNotes.length > 0}
  <div class="grid">
    {#each physicsNotes as note}
      <div class="card" on:click={() => window.location.href = note.link}>
        {#if note.imgSrc}
          <img class="img" src={note.imgSrc} alt={note.title} />
        {/if}
        <div class="title">{note.title}</div>
        <div class="description">{note.description}</div>
      </div>
    {/each}
  </div>
{:else}
  <div class="empty-state">
    
    <h2>Content Coming Soon</h2>
    <p>Please check back shortly!</p>
  </div>
{/if}

<style>
  h1 {
    text-align: center;
    font-size: 2.5rem;
    margin: 2rem 0;
    font-weight: 700;
    color: #1f2937;
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
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    cursor: pointer;
    text-align: center;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  }

  .title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.3rem;
  }

  .description {
    color: #4b5563;
    font-size: 0.95rem;
  }

  .img {
    display: block;
    margin: 0 auto 1rem auto;
    width: 120px;
    height: 120px;
    object-fit: contain;
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
