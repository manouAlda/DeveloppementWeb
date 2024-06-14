// Appelle la fonction pour afficher les achats existants lorsque la page est chargée

var divAchats = document.querySelector("#divAchats");
var totalGlobal = 0;

// Fonction pour mettre à jour le total global et l'afficher
const mettreAJourTotalGlobal = () => {
    const totalAchat = document.querySelector(".totalAchat");
    totalAchat.textContent = `$${totalGlobal.toFixed(2)}`;
    localStorage.setItem('totalGlobal', totalGlobal.toString());
};

const miseAjourLocalStorage = (achatsExistant) => {
    localStorage.setItem("tabAchat", JSON.stringify(achatsExistant));
    divAchats.innerHTML = "";
    afficherAchats(); 
    mettreAJourTotalGlobal();
};

// Fonction pour récupérer et afficher les achats existants
const afficherAchats = () => {
    total = 0;
    totalGlobal = 0;

    const achatsExistant = JSON.parse(localStorage.getItem("tabAchat")) || [];


    const enteteAchat = creationEntete();

    divAchats.appendChild(enteteAchat);

    if (achatsExistant.length == 0) {
        const achatDiv = achatVide();
        divAchats.appendChild(achatDiv);
    } else {
  
        achatsExistant.forEach((achat, index) => {
          const achatDiv = ligneAchat(achat, index, achatsExistant);
          divAchats.appendChild(achatDiv);
          
        });

        miseAjourChangement(achatsExistant);
    }
    mettreAJourTotalGlobal();
};

document.addEventListener("DOMContentLoaded", afficherAchats);

const creationEntete = () => {
  const enteteAchat = document.createElement("div");
  enteteAchat.classList.add("tabEntete", "ligne");

  const enteteProduit = document.createElement("div");
  enteteProduit.classList.add("produit");
  enteteProduit.textContent = "Product";

  const enteteInfosAchat = document.createElement("div");
  enteteInfosAchat.classList.add("infosAchat");
  enteteInfosAchat.textContent = "Price";

  const enteteQuantite = document.createElement("div");
  enteteQuantite.classList.add("infosAchat");
  enteteQuantite.textContent = "Quantity";

  const enteteTotal = document.createElement("div");
  enteteTotal.classList.add("total", "infosAchat");
  enteteTotal.textContent = "Total";

  enteteAchat.appendChild(enteteProduit);
  enteteAchat.appendChild(enteteInfosAchat);
  enteteAchat.appendChild(enteteQuantite);
  enteteAchat.appendChild(enteteTotal);

  return enteteAchat;
};

const ligneAchat = (achat, index, achatsExistant) => {
  // Crée un conteneur pour chaque achat
  const achatDiv = document.createElement("div");
  achatDiv.classList.add("ligne");

  const divPanier = document.createElement("div");
  divPanier.classList.add("infosPanier");

  const divInfos = document.createElement("div");
  divInfos.classList.add("ligneInfos");

  const divProduit = document.createElement("div");
  divProduit.classList.add("produit");

  // Ajoute l'image du produit
  const image = document.createElement("img");
  image.setAttribute("src", achat.image);
  image.setAttribute("alt", achat.titre);
  image.setAttribute("width", "15%");
  image.setAttribute("height", "20%");

  const div = document.createElement("div");

  const pTitre = document.createElement("p");
  pTitre.classList.add("sous-titre");
  pTitre.textContent = achat.titre;

  const pFormat = document.createElement("p");
  pFormat.textContent = `Format: ${achat.format}`;

  const btnRemove = document.createElement("button");
  btnRemove.classList.add("removeBtn");
  btnRemove.textContent = "Remove";

  const prixAchat = document.createElement("div");
  prixAchat.classList.add("prixAchat", "infosAchat");
  prixAchat.textContent = achat.prix;

  const qtt = document.createElement("div");
  qtt.classList.add("quantite", "infosAchat");

  const entreeQtt = document.createElement("input");
  entreeQtt.setAttribute("name", "nbrAchatCarte");
  entreeQtt.setAttribute("id", "nbrAchatCarte");
  entreeQtt.setAttribute("type", "number");
  entreeQtt.setAttribute("min", "1");
  entreeQtt.setAttribute("max", "30");
  entreeQtt.setAttribute("value", `${achat.quantite}`);
  entreeQtt.classList.add("nbrLivre");

  const total = document.createElement("div");
  total.classList.add("prixTotal", "infosAchat");
  total.textContent = achat.prixTotal;

  const btnRemove2 = document.createElement("button");
  btnRemove2.classList.add("removeBtnPanier");
  btnRemove2.textContent = "Remove";

  const qtt2 = document.createElement("div");
  qtt2.classList.add("quantitePanier");

  const entreeQtt2 = document.createElement("input");
  entreeQtt2.setAttribute("name", "nbrAchatCarte");
  entreeQtt2.setAttribute("id", "nbrAchatCarte");
  entreeQtt2.setAttribute("type", "number");
  entreeQtt2.setAttribute("min", "1");
  entreeQtt2.setAttribute("max", "30");
  entreeQtt2.setAttribute("value", `${achat.quantite}`);
  entreeQtt2.classList.add("nbrLivre2");

  qtt.appendChild(entreeQtt);

  div.appendChild(pTitre);
  div.appendChild(pFormat);
  div.appendChild(btnRemove);

  divProduit.appendChild(image);
  divProduit.appendChild(div);

  divInfos.appendChild(divProduit);
  divInfos.appendChild(prixAchat);
  divInfos.appendChild(qtt);
  divInfos.appendChild(total);

  qtt2.textContent = "Quantity: ";
  qtt2.appendChild(entreeQtt2);

  divPanier.appendChild(btnRemove2);
  divPanier.appendChild(qtt2);

  achatDiv.appendChild(divInfos);
  achatDiv.appendChild(divPanier);

  supprimerLigne(btnRemove, achatsExistant, index);
  supprimerLigne(btnRemove2, achatsExistant, index);

  totalGlobal += parseFloat(achat.prixTotal);

  return achatDiv;
};

const achatVide = () => {
  const vide = document.createElement("h1");
  vide.classList.add("h1", "titre");
  vide.textContent = "Your cart is empty";
  vide.style.paddingBlock = "var(--padding)";
  return vide;
};

const supprimerLigne = (btnRemove, achatsExistant, index) => {
  btnRemove.addEventListener("click", () => {
    achatsExistant.splice(index, 1);

    miseAjourLocalStorage(achatsExistant);
    mettreAJourTotalGlobal();
    modifierPanier(-1);
  });
};

const modifierPanier = (add) => {
  const nbrLivre = document.querySelector(".nbrAchat");
  let valeur = parseInt(nbrLivre.innerText) + add;
  localStorage.setItem("valeurCarte", valeur.toString());
  nbrLivre.innerText = valeur;
};

const miseAjourChangement = (achatsExistant) => {
  let line = document.querySelectorAll('.nbrLivre');
  let line2 = document.querySelectorAll('.nbrLivre2');
  let total = document.querySelectorAll('.prixTotal');
  const totalAchat = document.querySelector(".totalAchat");
  totalAchat.textContent = totalGlobal;

  let tab = [line, line2];
  var option = 0;
  
  for(let j=0; j<tab.length; j++) {
    for(let i=0; i<line.length; i++){
      tab[j][i].addEventListener('change', () => {
          option = tab[j][i].value - achatsExistant[i].quantite;

          [,prix] = achatsExistant[i].prix.split('$');

          achatsExistant[i].quantite = parseInt(tab[j][i].value);
          
          achatsExistant[i].prixTotal = (prix * achatsExistant[i].quantite).toFixed(2);
          total[i].textContent = `$${achatsExistant[i].prixTotal}`;

          miseAjourLocalStorage(achatsExistant);

          totalGlobal = 0; 
          for (let j = 0; j < line.length; j++) {
              totalGlobal += parseFloat(achatsExistant[j].prixTotal);
          }
          mettreAJourTotalGlobal();

          modifierPanier(option);
      });
    }
  }
  
}
