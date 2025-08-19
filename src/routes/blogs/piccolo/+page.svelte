<script lang="ts">
  // No client JS required for this static blog page.
  // If you want to fetch related posts or enable comments, add logic here later.
</script>

<svelte:head>
  <title>From Flute Fumbles to Piccolo Dreams — Rhythmic Energy</title>
  <meta name="description" content="My personal story of joining Rhythmic Energy, learning flute from scratch, dreaming of piccolo and finally playing piccolo for two years." />
</svelte:head>

<main class="min-h-screen bg-gray-50 text-slate-800 font-sans">
  <div class="max-w-4xl mx-auto px-6 py-12">
    <!-- Header / Hero -->
    <header class="mb-10 flex items-start gap-6">
      <div class="flex-shrink-0">
        
      </div>

      <div>
        <h1 class="text-3xl md:text-4xl font-serif font-semibold leading-tight text-slate-900">
          From Flute Fumbles to Piccolo Dreams
        </h1>
        <p class="text-sm text-slate-500 mt-2">
          My journey with <strong>Rhythmic Energy</strong> — how I started with zero flute experience, dreamt of piccolo, and now two years later I still love the tiny, mighty instrument.
        </p>

        <div class="mt-3 text-xs text-slate-400">
          <span>Category</span>
          <span class="mx-2">•</span>
          <span>Personal • Band • Piccolo</span>
        </div>
      </div>
    </header>

    <!-- Content -->
    <article class="prose prose-slate max-w-none">
      <p><em>If you had told me a few years ago that I’d be playing the piccolo in a university brass band, I would have laughed, coughed, and probably asked, “Wait, what’s a piccolo?”</em></p>

      <p>But life is funny like that.</p>

      <p>I’m part of the University Brass Band, <strong>Rhythmic Energy</strong>. And it’s been two years since I started playing the piccolo—though, honestly, this whole journey began with me not even knowing how to hold a flute.</p>

      <h2>The Audition: How It All Began</h2>

      <p>So here’s the thing: I only started playing the flute <strong>after</strong> I joined the band. Yes, you read that right. Zero experience. Nada. Before joining, I didn’t know how to play a single note.</p>

      <p>During the audition, they asked me the most terrifying question ever:</p>
      <blockquote><strong>“Which instrument do you want to play?”</strong></blockquote>

      <p>At that time, I didn’t know much about what instruments even <em>existed</em> in a brass band — trumpet, trombone, euphonium, tuba, clarinet, percussion… the list goes on. But the only word I could remember was <strong>flute</strong>. So, confidently and cluelessly, I said: “Flute.”</p>

      <p>They assigned me to the flute section and the crash course started: how to hold it, how to breathe properly, and how not to faint after playing three notes. The basics that nobody warns you about until your lungs are burning.</p>

      <h2>The Forbidden Fruit: Piccolo</h2>

      <p>In my first year I began to hear whispers about the piccolo — the tiny, mischievous cousin of the flute that everyone said was difficult. My section leader even had one, but hardly dared to play it because it was “too tough.” Naturally, my reaction was, “Next year, I want to play that.”</p>

      <p>Fate intervened. In my second year, my teacher deemed me not quite eligible for piccolo duties and instead made me the flute <em>section leader</em>. With leadership came responsibilities — teaching juniors, running rehearsals — and the piccolo had to wait.</p>

      <h2>Finally, the Piccolo</h2>

      <p>Then, in my third year, someone casually handed me the piccolo and said, “You play this now.” That was the start. Two years in, and it’s been a rollercoaster: sometimes infuriating, sometimes hilarious, often rewarding. The piccolo has a personality — tiny, feisty, and mercurial — and you quickly learn to adapt.</p>

      <h2>Funny Things Nobody Tells You About the Piccolo</h2>

      <ul>
        <li><strong>The Squeaks:</strong> The piccolo has an uncanny ability to squeak at the worst possible moments — silent rehearsal, dramatic phrase, you name it.</li>
        <li><strong>The Volume Problem:</strong> It’s small but behaves like a natural megaphone. Even soft attempts can cut through the band, earning you “the look”.</li>
        <li><strong>The Teasing:</strong> Bandmates will joke relentlessly — “Flute for ants?”, “Don’t lose it in your pocket!” — but it’s all affectionate.</li>
        <li><strong>That One Note:</strong> Every player has that stubborn high note that defies all logic and sounds like you’ve stepped on a balloon.</li>
      </ul>

      <h2>Why I Love It Anyway</h2>

      <p>Now, after two years of playing piccolo with Rhythmic Energy, I understand why I wanted it from that very first flute lesson. The piccolo is tiny but mighty — it can pierce through an ensemble like a laser and, in the best moments, add an effortless sparkle to the music.</p>

      <p>It’s not easy, but it’s worth it. The piccolo challenged me, made me laugh often, and pushed my musicality in ways the flute never did. It found a way to become part of who I am as a musician.</p>

      <p><strong>One lesson I’ve learned:</strong>  </p>
      <p><em>Sometimes the instrument chooses you — and the journey becomes the point.</em></p>

      <hr />

      <p class="text-sm text-slate-500">If you hear an unexpectedly bright note cutting through rehearsal, that’s probably me and my piccolo — saying hello.</p>
    </article>

    <!-- Footer / Meta -->
    <footer class="mt-12 border-t border-slate-100 pt-6 flex items-center justify-between text-sm text-slate-500">
      <div>
        <span>Written by <strong>Puspa Kamal Rai</strong></span>
        <span class="mx-2">•</span>
        <span>Member, Rhythmic Energy</span>
      </div>
      <div>
        <time datetime={new Date().toISOString().split('T')[0]}>{new Date().toLocaleDateString()}</time>
      </div>
    </footer>
  </div>
</main>

<style>
  /* Additional subtle polish for non-tailwind setups or extra styles */
  :global(.prose) {
    line-height: 1.6;
  }

  /* small accessible focus style for links if added later */
  :global(a:focus) {
    outline: 3px solid rgba(99,102,241,0.18);
    outline-offset: 3px;
  }
</style>
