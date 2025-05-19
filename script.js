const affirmations = [
   { texte: "Contrôle des rinçages des lignes après nettoyage de la nuit", correcte: "Conforme" },
   { texte: "Contrôle du surplus de graisse sur les machines au début de production pour les monteurs:", correcte: "Conforme" },
   { texte: "Contrôle d’utilisation d’encre adaptée pour impression sur emballages alimentaires ", correcte: "Non Conforme" },
   { texte: "Contrôle certificat alimentarité sur les joints, les produits de lubrification et les tapis", correcte: "Non Conforme" },
   { texte: "Contrôle de l’identification des bidons désinfectants pour les mains", correcte: "Conforme" },
];
function startCountdown(minutes) {
   const timerElement = document.getElementById("timer");
   let timeLeft = minutes * 60;
   const countdown = setInterval(() => {
       const min = Math.floor(timeLeft / 60);
       const sec = timeLeft % 60;
       timerElement.textContent = `⏳ Temps restant : ${min}:${sec < 10 ? "0" : ""}${sec} ⏳`;
       if (timeLeft <= 0) {
           clearInterval(countdown);
           timerElement.textContent = "⏳ Temps écoulé !";
           validerReponses();
       }
       timeLeft--;
   }, 1000);
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
   const bonnesReponses = {
       "Contrôle 1": "Conforme",
       "Contrôle 2": "Conforme",
       "Contrôle 3": "Non Conforme",
      "Contrôle 4": "Non Conforme",
       "Contrôle 5": "Conforme",
       // Ajoute ici toutes les bonnes réponses attendues
   };
   let toutBon = true;
   for (const nom in bonnesReponses) {
       const reponse = document.querySelector(`input[name="${nom}"]:checked`);
       if (!reponse || reponse.value !== bonnesReponses[nom]) {
           toutBon = false;
           break;
       }
   }
   if (toutBon) {
       // ✅ Tout est bon, on passe à la page suivante
       window.location.href = "association.html";
   } else {
       alert("Certaines réponses sont incorrectes. Essayez encore !");
   }
}
window.onload = function () {
   genererTableau();
   startCountdown(15);
};
