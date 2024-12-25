const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

const catchButton = document.getElementById('catchButton');

let isTextVisible = false; // État du texte

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff00'; // Vert Matrix lumineux
  ctx.font = `${fontSize}px Orbitron`;

  drops.forEach((y, x) => {
    // const text = String.fromCharCode(0x30a0 + Math.random() * 96);
    // const text = letters[Math.floor(Math.random() * letters.length)];
    const text = Math.floor(Math.random() * 10);
    ctx.fillText(text, x * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[x] = 0;
    }

    drops[x]++;
  });
}

setInterval(draw, 50);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Appeler la fonction lors du chargement et du redimensionnement de la fenêtre
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// Handle pill choice
function choosePill(color) {
  const result = document.getElementById('result');
  if (isTextVisible) {
    result.innerHTML = ""; // Cacher le texte si déjà visible
    isTextVisible = false; // Mettre à jour l'état
  } else {
    if (color === 'red') {
      result.innerHTML = "🎅 Bienvenue dans la vérité de Noël futuriste !";
    } else if (color === 'blue') {
      result.innerHTML = "🎄 Retour au confort de Noël traditionnel !";
    }
    isTextVisible = true; // Mettre à jour l'état
  }
}

// Fonction pour déplacer le bouton à une position aléatoire
function moveButton() {
  const maxWidth = window.innerWidth - catchButton.offsetWidth;
  const maxHeight = window.innerHeight - catchButton.offsetHeight;

  const randomX = Math.floor(Math.random() * maxWidth);
  const randomY = Math.floor(Math.random() * maxHeight);

  catchButton.style.left = `${randomX}px`;
  catchButton.style.top = `${randomY}px`;
}

// Déplace le bouton toutes les 2 secondes
setInterval(moveButton, 2000);

// Événement de clic sur le bouton
catchButton.addEventListener('click', () => {
  alert('Vous avez attrapé le bouton !');
  moveButton(); // Déplace le bouton après avoir été attrapé
});

// Événement de clic sur le document
document.addEventListener('click', (event) => {
  const result = document.getElementById('result');
  const redPill = document.querySelector('.pill.red');
  const bluePill = document.querySelector('.pill.blue');

  // Vérifie si le clic est en dehors du texte et des pilules
  if (!result.contains(event.target) && !redPill.contains(event.target) && !bluePill.contains(event.target) && isTextVisible) {
    result.innerHTML = ""; // Cacher le texte si on clique en dehors
    isTextVisible = false; // Mettre à jour l'état
  }
});
