 /* ---------- Navigation ---------- */
  function go(name){
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + name).classList.add('active');
    document.querySelectorAll('.mainnav button').forEach(b => {
      b.classList.toggle('active', b.dataset.screen === name);
    });
    window.scrollTo(0,0);
  }
  go('landing');

  /* ---------- Game logic ---------- */
  const ICONS = {
    rock: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="24" cy="27" r="14"/><path d="M14 22a10 10 0 0 1 20 0"/></svg>',
    paper: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="12" y="8" width="24" height="32" rx="3"/><path d="M18 16h12M18 24h12M18 32h8"/></svg>',
    scissors: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="17" cy="35" r="5"/><circle cx="31" cy="35" r="5"/><path d="M20 32 36 10M28 32 12 10"/></svg>'
  };
  const BEATS = { rock:'scissors', paper:'rock', scissors:'paper' };
  const REASON = {
    'rock-scissors':'Rock crushes Scissors',
    'paper-rock':'Paper covers Rock',
    'scissors-paper':'Scissors cuts Paper'
  };

  let playerScore = 0, opponentScore = 0, rounds = 0, playing = false;

  const playerHandEl = document.getElementById('playerHand');
  const opponentHandEl = document.getElementById('opponentHand');
  const resultEl = document.getElementById('resultMessage');
  const throwButtons = document.querySelectorAll('.throw');

  /* ---------- Audio ---------- */
  const bgMusic   = new Audio('background-upbeat-jazz.mp3');
  const winAudio  = new Audio('winning-horn.mp3');
  const loseAudio = new Audio('losing-horn.mp3');
  const drawAudio = new Audio('draw-clash-sound.mp3');

  bgMusic.loop = true;
  bgMusic.volume = 0.25;

  // Browsers block autoplay until the user interacts with the page,
  // so start the background track on the first click anywhere.
  document.addEventListener('click', function startBgMusic(){
    bgMusic.play().catch(() => {});
    document.removeEventListener('click', startBgMusic);
  }, { once: true });

  function playClip(audio){
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  const sounds = {
    win: () => playClip(winAudio),
    lose: () => playClip(loseAudio),
    draw: () => playClip(drawAudio)
  };

  function playGame(playerChoice){
    if (playing) return;
    playing = true;
    throwButtons.forEach(b => b.disabled = true);

    playerHandEl.classList.add('shaking');
    opponentHandEl.classList.add('shaking');
    resultEl.textContent = '...';
    resultEl.className = 'result';

    setTimeout(() => {
      playerHandEl.classList.remove('shaking');
      opponentHandEl.classList.remove('shaking');

      const opponentChoice = ['rock','paper','scissors'][Math.floor(Math.random()*3)];
      playerHandEl.innerHTML = ICONS[playerChoice];
      opponentHandEl.innerHTML = ICONS[opponentChoice];
      rounds++;
      document.getElementById('roundCount').textContent = rounds;

      if (playerChoice === opponentChoice){
        resultEl.innerHTML = "It's a draw <span class='reason'>Both threw " + playerChoice + "</span>";
        resultEl.classList.add('draw');
        sounds.draw();
      } else if (BEATS[playerChoice] === opponentChoice){
        playerScore++;
        document.getElementById('playerScore').textContent = playerScore;
        resultEl.innerHTML = "You win <span class='reason'>" + REASON[playerChoice+'-'+opponentChoice] + "</span>";
        resultEl.classList.add('win');
        sounds.win();
      } else {
        opponentScore++;
        document.getElementById('opponentScore').textContent = opponentScore;
        resultEl.innerHTML = "You lose <span class='reason'>" + REASON[opponentChoice+'-'+playerChoice] + "</span>";
        resultEl.classList.add('lose');
        sounds.lose();
      }

      throwButtons.forEach(b => b.disabled = false);
      playing = false;
    }, 550);
  }

  function resetGame(){
    playerScore = 0; opponentScore = 0; rounds = 0;
    document.getElementById('playerScore').textContent = 0;
    document.getElementById('opponentScore').textContent = 0;
    document.getElementById('roundCount').textContent = 0;
    resultEl.textContent = 'Choose your throw';
    resultEl.className = 'result';
    playerHandEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8" opacity=".35"/></svg>';
    opponentHandEl.innerHTML = playerHandEl.innerHTML;
  }