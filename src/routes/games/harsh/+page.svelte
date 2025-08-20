<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  function goToGames() {
    goto('/games');
  }

  let canvas: HTMLCanvasElement;
  let ctx!: CanvasRenderingContext2D;  // definite assignment (!)

  const baseWidth = 800;
  const baseHeight = 600;
  let canvasWidth = baseWidth;
  let canvasHeight = baseHeight;

  // Game state
  let player = { x: 350, y: 520, width: 100, height: 50, speed: 60 };
  let obstacles: { x: number; y: number; width: number; height: number; speed: number }[] = [];
  let score = 0;
  let missed = 0;
  let level = 1;
  let gameOver = false;
  let isRunning = false;
  let animationId: number;

  // Intro state
  let showIntro = true;
  let introText = "Hello! I am Harsh, and I love mangoes. But there is a problem... The ground is slippery so I need to avoid falling and breaking my back! Can you help me catch the mangoes before I fall?";
  let displayedText = "";
  let textIndex = 0;
  let typingSpeed = 1;

  // Images
  let basketImg: HTMLImageElement;
  let mangoImg: HTMLImageElement;
  let harshImg: HTMLImageElement;

  onMount(() => {
    basketImg = new Image();
    basketImg.src = '/games/harsh/basket.png';

    mangoImg = new Image();
    mangoImg.src = '/games/harsh/mango.png';

    harshImg = new Image();
    harshImg.src = '/games/harsh/harsh.png';

    const context = canvas.getContext("2d");
    if (!context) {
      console.error("Canvas context not found!");
      return;
    }
    ctx = context;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("keydown", handleKey);

    typeIntroText();
    draw();
    gameLoop();
  });

  function resizeCanvas() {
    const container = canvas.parentElement as HTMLElement;
    if (!container) return;
    const scale = Math.min(container.clientWidth / baseWidth, container.clientHeight / baseHeight);
    canvasWidth = baseWidth * scale;
    canvasHeight = baseHeight * scale;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.setTransform(scale, 0, 0, scale, 0, 0); // scale drawing
  }

  // Typing animation
  function typeIntroText() {
    if (textIndex < introText.length) {
      displayedText += introText[textIndex];
      textIndex += typingSpeed;
      requestAnimationFrame(typeIntroText);
    }
  }

  // Spawn mangoes
  function spawnObstacle() {
    const width = 50;
    const x = Math.random() * (baseWidth - width);
    let speed = 0;
    switch(level) {
      case 1: speed = Math.random() * 1 + 2; break;
      case 2: speed = Math.random() * 2 + 3; break;
      case 3: speed = Math.random() * 3 + 4; break;
      default: speed = Math.random() * 5 + 6;
    }
    obstacles.push({ x, y: -50, width, height: 50, speed });
  }

  // Key handling
  function handleKey(e: KeyboardEvent) {
    if (showIntro) return;
    if (e.code === "Space") {
      isRunning = !isRunning;
      return;
    }
    if (!isRunning) return;
    movePlayer(e.key.toLowerCase());
  }

  // Move player (keyboard + on-screen buttons)
  function movePlayer(dir: string) {
    switch(dir) {
      case 'a': case 'arrowleft': if (player.x > 0) player.x -= player.speed; break;
      case 'd': case 'arrowright': if (player.x + player.width < baseWidth) player.x += player.speed; break;
      case 'w': case 'arrowup': if (player.y > 0) player.y -= player.speed; break;
      case 's': case 'arrowdown': if (player.y + player.height < baseHeight) player.y += player.speed; break;
    }
  }

  // Game logic
  function update() {
    if (!isRunning || gameOver) return;
    obstacles.forEach((obs, i) => {
      obs.y += obs.speed;
      if (
        player.x < obs.x + obs.width &&
        player.x + player.width > obs.x &&
        player.y < obs.y + obs.height &&
        player.y + player.height > obs.y
      ) {
        score += 1;
        obstacles.splice(i, 1);
      }
      if (obs.y > baseHeight) {
        missed += 1;
        obstacles.splice(i, 1);
        if (missed >= 4) {
          gameOver = true;
          isRunning = false;
        }
      }
    });
    if (Math.random() < 0.005 * level) spawnObstacle();
    if (score < 5) level = 1;
    else if (score < 15) level = 2;
    else if (score < 30) level = 3;
    else level = 4;
  }

  function wrapText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  function draw() {
    ctx.clearRect(0, 0, baseWidth, baseHeight);

    const gradient = ctx.createLinearGradient(0,0,0,baseHeight);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(0.7, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,baseWidth,baseHeight);

    ctx.fillStyle = '#333';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('The Tale of Harsh and Mangoes', baseWidth / 2, 50);
    ctx.textAlign = 'start';

    if (showIntro) {
      const harshWidth = harshImg.width * 0.5;
      const harshHeight = harshImg.height * 0.5;
      const bounce = Math.sin(Date.now() / 200) * 10;
      ctx.drawImage(harshImg, baseWidth / 2 - harshWidth / 2, baseHeight / 2 - harshHeight / 2 + bounce, harshWidth, harshHeight);

      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillRect(50, baseHeight - 180, 700, 120);
      ctx.strokeStyle = '#333';
      ctx.strokeRect(50, baseHeight - 180, 700, 120);

      ctx.fillStyle = '#333';
      ctx.font = '22px Arial';
      wrapText(ctx, displayedText, 60, baseHeight - 150, 680, 28);
      return;
    }

    ctx.drawImage(basketImg, player.x, player.y, player.width, player.height);
    obstacles.forEach(obs => ctx.drawImage(mangoImg, obs.x, obs.y, obs.width, obs.height));

    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Missed: ${missed}/4`, 10, 60);
    ctx.fillText(`Level: ${level}`, 10, 90);

    if (!isRunning && !gameOver) {
      ctx.fillStyle = 'black';
      ctx.font = '28px Arial';
      ctx.fillText('Press Start to play!', 270, 280);
    }
    if (gameOver) {
      ctx.fillStyle = 'red';
      ctx.font = '48px Arial';
      ctx.fillText('Oh no! Harsh fell Down!', 230, 300);
    }
  }

  function gameLoop() {
    update();
    draw();
    animationId = requestAnimationFrame(gameLoop);
  }

  function startGame() {
    if (showIntro) {
      showIntro = false;
      isRunning = true;
    } else if (!isRunning) isRunning = true;
    if (!animationId) gameLoop();
  }

  function pauseGame() { isRunning = false; }

  function restartGame() {
    isRunning = false;
    gameOver = false;
    obstacles = [];
    score = 0;
    missed = 0;
    level = 1;
    player.x = baseWidth / 2 - player.width / 2;
    player.y = baseHeight - player.height - 10;
    displayedText = "";
    textIndex = 0;
    showIntro = true;
    typeIntroText();
    startGame();
  }
</script>

<style>
  h1.page-title {
    font-weight: 900;
    font-size: 3rem;
    text-align: center;
    margin: 2rem 0;
    color: #222;
  }
  .back-button-container { display:flex; justify-content:center; margin-bottom:1.5rem; }
  .back-button {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    background: #242424;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .game-container { display:flex; flex-direction:column; align-items:center; justify-content:center; }
  canvas { border:3px solid #333; border-radius:10px; max-width:95vw; height:auto; }
  .buttons, .dpad { margin-top:20px; display:flex; gap:15px; flex-wrap:wrap; justify-content:center; }
  button {
    padding:12px 25px; font-size:16px; cursor:pointer;
    background:#0288d1; color:#fff; border:none; border-radius:5px;
  }
  .dpad { display:grid; grid-template-areas:
      ". up ."
      "left center right"
      ". down ."; gap:8px; }
  .dpad button { width:60px; height:60px; font-size:20px; font-weight:bold; }
  .up { grid-area:up; }
  .down { grid-area:down; }
  .left { grid-area:left; }
  .right { grid-area:right; }
</style>

<h1 class="page-title">Harsh's Mango Adventure</h1>
<div class="back-button-container">
  <button class="back-button" on:click={goToGames}>← Back to Games</button>
</div>

<div class="game-container">
  <canvas bind:this={canvas}></canvas>

  <!-- Start/Pause/Restart -->
  <div class="buttons">
    <button on:click={startGame}>Start</button>
    <button on:click={pauseGame}>Pause</button>
    <button on:click={restartGame}>Restart</button>
  </div>

  <!-- Game Boy style D-pad -->
  <div class="dpad">
    <button class="up" on:click={() => movePlayer('arrowup')}>▲</button>
    <button class="left" on:click={() => movePlayer('arrowleft')}>◀</button>
    <button class="right" on:click={() => movePlayer('arrowright')}>▶</button>
    <button class="down" on:click={() => movePlayer('arrowdown')}>▼</button>
  </div>

  <p>Score: {score}</p>
  <p>Missed: {missed}/4</p>
</div>
