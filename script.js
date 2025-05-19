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
   let score = 0;
   affirmations.forEach((a, index) => {
       const selected = document.querySelector(`input[name="q${index}"]:checked`);
       if (selected && selected.value === a.correcte) {
           score++;
       }
   });
   const resultat = document.getElementById("resultat");
   if (score === affirmations.length) {
       resultat.innerHTML = "<h3>🎉 Bravo, toutes les réponses sont correctes !</h3>";
   } else {
       resultat.innerHTML = `<h3>❌ Vous avez ${score} bonne(s) réponse(s) sur ${affirmations.length}.</h3>`;
   }
}
window.onload = function () {
   genererTableau();
   startCountdown(15);
};
