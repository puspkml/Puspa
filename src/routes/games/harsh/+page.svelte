

<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  function goToGames() {
    goto('/games');
  }

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  const canvasWidth = 800;
  const canvasHeight = 600;

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
  let typingSpeed = 1; // characters per frame

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
  });


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
    const x = Math.random() * (canvasWidth - width);
    let speed = 0;
    switch(level) {
      case 1: speed = Math.random() * 1 + 2; break;
      case 2: speed = Math.random() * 2 + 3; break;
      case 3: speed = Math.random() * 3 + 4; break;
      case 4: speed = Math.random() * 4 + 5; break;
      default: speed = Math.random() * 5 + 6;
    }
    obstacles.push({ x, y: -50, width, height: 50, speed });
  }

  // Key handling
  function handleKey(e: KeyboardEvent) {
    if (showIntro) return;
    if (e.code === "Space") {
      isRunning = !isRunning; // pause/resume with space
      return;
    }
    if (!isRunning) return;
    switch(e.key.toLowerCase()) {
      case 'a': case 'arrowleft': if (player.x > 0) player.x -= player.speed; break;
      case 'd': case 'arrowright': if (player.x + player.width < canvasWidth) player.x += player.speed; break;
      case 'w': case 'arrowup': if (player.y > 0) player.y -= player.speed; break;
      case 's': case 'arrowdown': if (player.y + player.height < canvasHeight) player.y += player.speed; break;
    }
  }

  // Game logic
  function update() {
    if (!isRunning || gameOver) return;

    obstacles.forEach((obs, i) => {
      obs.y += obs.speed;

      // Catch mango
      if (
        player.x < obs.x + obs.width &&
        player.x + player.width > obs.x &&
        player.y < obs.y + obs.height &&
        player.y + player.height > obs.y
      ) {
        score += 1;
        obstacles.splice(i, 1);
      }

      // Missed mango
      if (obs.y > canvasHeight) {
        missed += 1;
        obstacles.splice(i, 1);
        if (missed >= 4) {
          gameOver = true;
          isRunning = false;
        }
      }
    });

    // Spawn new mangoes more frequently as level increases
    if (Math.random() < 0.005 * level) spawnObstacle();

    // Update level based on score
    if (score < 5) level = 1;
    else if (score < 15) level = 2;
    else if (score < 30) level = 3;
    else level = 4;
  }

  // Draw multi-line text
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

  // Draw everything
  // Draw everything
function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Background gradient (sky + field)
    const gradient = ctx.createLinearGradient(0,0,0,canvasHeight);
    gradient.addColorStop(0, '#87CEEB'); // sky
    gradient.addColorStop(0.7, '#87CEEB');
    gradient.addColorStop(1, '#98FB98'); // green field
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvasWidth,canvasHeight);

    // Draw game title
    ctx.fillStyle = '#333';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('The Tale of Harsh and mangoes', canvasWidth / 2, 50);
    ctx.textAlign = 'start'; // reset for other text

    if (showIntro) {
      // Draw Harsh smaller
      const harshWidth = harshImg.width * 0.5;
      const harshHeight = harshImg.height * 0.5;
      const bounce = Math.sin(Date.now() / 200) * 10;
      ctx.drawImage(harshImg, canvasWidth / 2 - harshWidth / 2, canvasHeight / 2 - harshHeight / 2 + bounce, harshWidth, harshHeight);

      // Dialog box
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillRect(50, canvasHeight - 180, 700, 120);
      ctx.strokeStyle = '#333';
      ctx.strokeRect(50, canvasHeight - 180, 700, 120);

      ctx.fillStyle = '#333';
      ctx.font = '22px Arial';
      wrapText(ctx, displayedText, 60, canvasHeight - 150, 680, 28);
      return;
    }

    // Draw basket
    ctx.drawImage(basketImg, player.x, player.y, player.width, player.height);

    // Draw mangoes
    obstacles.forEach(obs => ctx.drawImage(mangoImg, obs.x, obs.y, obs.width, obs.height));

    // Stats
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Missed: ${missed}/4`, 10, 60);
    ctx.fillText(`Level: ${level}`, 10, 90);

    if (!isRunning && !gameOver) {
      ctx.fillStyle = 'black';
      ctx.font = '28px Arial';
      ctx.fillText('Press Start to play!', 270, 280);
      ctx.font = '20px Arial';
      ctx.fillText('Use WASD or Arrow keys to move the basket', 230, 320);
      ctx.fillText('Press SPACE to pause/resume', 250, 350);
    }

    if (gameOver) {
      ctx.fillStyle = 'red';
      ctx.font = '48px Arial';
      ctx.fillText('Oh no! Harsh fell Down!', 230, 300);
      ctx.font = '28px Arial';
      ctx.fillText('He broke his back! Press Restart to try again.', 140, 340);
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
    player.x = canvasWidth / 2 - player.width / 2;
    player.y = canvasHeight - player.height - 10;
    displayedText = "";
    textIndex = 0;
    showIntro = true;
    typeIntroText();
    startGame();
  }

  onMount(() => {
    const context = canvas.getContext('2d');
    if (!context) return console.error('Canvas context not found!');
    ctx = context;
    window.addEventListener('keydown', handleKey);
    typeIntroText();
    draw();
    gameLoop();
  });
</script>



<style>
  h1.page-title {
    font-weight: 900;        /* Makes it very bold */
    font-size: 3rem;         /* Adjust size */
    text-align: center;      /* Center it horizontally */
    margin-top: 2rem;        /* Space from top */
    margin-bottom: 2rem;     /* Space below */
    color: #222;             /* Dark color */
    font-family: 'Arial Black', sans-serif;  /* Optional bold font */
    text-shadow: 1px 1px 4px rgba(0,0,0,0.3); /* Optional shadow */
  }
  .back-button-container {
    display: flex;
    justify-content: center; /* centers horizontally */
    margin-bottom: 1.5rem;  /* spacing from the title */
  }
  .back-button {
    padding: 10px 20px;
    margin: 1rem 0;
    font-size: 16px;
    font-weight: bold;
    background: #242424;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,0.2);
    transition: all 0.2s;
  }

  .back-button:hover {
    background: #444444;
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0,0,0,0.3);
  }

  body { margin:0; font-family:sans-serif; background:#e0f7fa; }
  .game-container { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; }
  canvas { border:3px solid #333; border-radius:10px; box-shadow:0 5px 15px rgba(0,0,0,0.3); }
  .buttons { margin-top:20px; display:flex; gap:15px; }
  button {
    padding:12px 25px; font-size:16px; cursor:pointer;
    background:#0288d1; color:#fff; border:none; border-radius:5px;
    box-shadow:0 3px 6px rgba(0,0,0,0.2); transition: all 0.2s;
  }
  button:hover { background:#026fa1; transform:translateY(-2px); box-shadow:0 5px 10px rgba(0,0,0,0.3); }
  p { font-size:18px; margin:5px; }
</style>
<h1 class="page-title">Harsh's Mango Adventure</h1>
<div class="back-button-container">
  <button class="back-button" on:click={goToGames}>← Back to Games</button>
</div>
<div class="game-container">
  <canvas bind:this={canvas} width={canvasWidth} height={canvasHeight}></canvas>
  <div class="buttons">
    <button on:click={startGame}>Start</button>
    <button on:click={pauseGame}>Pause</button>
    <button on:click={restartGame}>Restart</button>
  </div>
  <p>Score: {score}</p>
  <p>Missed: {missed}/4</p>
</div>
