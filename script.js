const affirmations = [
  { texte: "Contrôle des rinçages des lignes après nettoyage de la nuit", correcte: "Conforme" },
  { texte: "Contrôle du surplus de graisse sur les machines au début de production pour les monteurs:", correcte: "Conforme" },
  { texte: "Contrôle d’utilisation d’encre adaptée pour impression sur emballages alimentaires", correcte: "Non Conforme" },
  { texte: "Contrôle certificat alimentarité sur les joints, les produits de lubrification et les tapis", correcte: "Conforme" },
  { texte: "Contrôle de l’identification des bidons désinfectants pour les mains", correcte: "Conforme" }
];

// Déclarer countdown en dehors de la fonction startCountdown
// pour qu'il soit accessible globalement et puisse être effacé.
let countdown; // Variable pour stocker l'ID de l'intervalle

function startCountdown(minutes) {
  const timerElement = document.getElementById("timer");
  let timeLeft = minutes * 60; // Durée initiale en secondes (15 minutes)

  // Charger le temps restant stocké s’il existe
  if (localStorage.getItem("timeLeft")) {
    timeLeft = parseInt(localStorage.getItem("timeLeft"), 10);
  }

  // Si un compte à rebours est déjà en cours, l'arrêter avant d'en démarrer un nouveau
  if (countdown) {
    clearInterval(countdown);
  }

  countdown = setInterval(() => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    timerElement.textContent = `⏳ Temps restant : ${min}:${sec < 10 ? "0" : ""}${sec} ⏳`;

    localStorage.setItem("timeLeft", timeLeft); // Sauvegarde à chaque tick

    if (timeLeft <= 0) {
      clearInterval(countdown);
      localStorage.removeItem("timeLeft"); // Nettoyage
      timerElement.textContent = "⏳ Temps écoulé !";
      validerReponses(); // ou rediriger automatiquement
    }

    timeLeft--;
  }, 1000);
}

// Nouvelle fonction pour réinitialiser le compte à rebours
function resetCountdown() {
    // Supprime le temps sauvegardé du localStorage
    localStorage.removeItem("timeLeft");
    // Arrête le compte à rebours en cours (si il y en a un)
    if (countdown) {
        clearInterval(countdown);
    }
    // Redémarre le compte à rebours à la durée initiale (15 minutes)
    startCountdown(15);
}


function genererTableau() {
  const tbody = document.getElementById("table-body");
  affirmations.forEach((a, index) => {
    const tr = document.createElement("tr");
    const tdTexte = document.createElement("td");
    tdTexte.textContent = a.texte;
    const tdVrai = document.createElement("td");
    const inputVrai = document.createElement("input");
    inputVrai.type = "radio";
    inputVrai.name = `q${index}`;
    inputVrai.value = "Conforme";
    tdVrai.appendChild(inputVrai);
    const tdFaux = document.createElement("td");
    const inputFaux = document.createElement("input");
    inputFaux.type = "radio";
    inputFaux.name = `q${index}`;
    inputFaux.value = "Non Conforme";
    tdFaux.appendChild(inputFaux);
    tr.appendChild(tdTexte);
    tr.appendChild(tdVrai);
    tr.appendChild(tdFaux);
    tbody.appendChild(tr);
  });
}

function validerReponses() {
  let toutBon = true;
  affirmations.forEach((a, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (!selected || selected.value !== a.correcte) {
      toutBon = false;
    }
  });

  if (toutBon) {
    // Supprime le temps du localStorage avant de rediriger si la partie est gagnée
    // localStorage.removeItem("timeLeft");
    window.location.href = "association.html";
  } else {
    alert("Certaines réponses sont incorrectes. Essayez encore !");
  }
}

window.onload = function () {
  genererTableau();
  startCountdown(15);

  // Ajouter l'écouteur d'événements pour le nouveau bouton de réinitialisation
  const resetButton = document.getElementById("resetCountdown");
  if (resetButton) { // Vérifie que le bouton existe avant d'ajouter l'écouteur
    resetButton.addEventListener("click", resetCountdown);
  }
};
