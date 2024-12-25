const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

const catchButton = document.getElementById('catchButton');

let isTextVisible = false; // État du texte
let currentColor = '#00ff00'; // Couleur par défaut (vert)

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = currentColor; // Utiliser la couleur actuelle
  ctx.font = `${fontSize}px Orbitron`;

  drops.forEach((y, x) => {
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
      currentColor = '#ff0000'; // Changer la couleur à rouge
    } else if (color === 'blue') {
      result.innerHTML = "🎄 Retour au confort de Noël traditionnel !";
      currentColor = '#0000ff'; // Changer la couleur à bleu
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

// Écoutez les clics sur le document
document.addEventListener('click', (event) => {
  // Vérifiez si le clic n'est pas sur un bouton
  if (!event.target.classList.contains('pill') && event.target.id !== 'catchButton') {
    currentColor = '#00ff00'; // Réinitialiser la couleur à vert
  }
});
