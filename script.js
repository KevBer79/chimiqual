const affirmations = [
  { texte: "Contrôle des rinçages des lignes après nettoyage de la nuit", correcte: "Conforme" },
  { texte: "Contrôle du surplus de graisse sur les machines au début de production pour les monteurs:", correcte: "Conforme" },
  { texte: "Contrôle d’utilisation d’encre adaptée pour impression sur emballages alimentaires", correcte: "Non Conforme" },
  { texte: "Contrôle certificat alimentarité sur les joints, les produits de lubrification et les tapis", correcte: "Conforme" },
  { texte: "Contrôle de l’identification des bidons désinfectants pour les mains", correcte: "Conforme" }
];

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
    window.location.href = "association.html";
  } else {
    alert("Certaines réponses sont incorrectes. Essayez encore !");
  }
}

window.onload = function () {
  genererTableau();
};
