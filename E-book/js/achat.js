const [,idRecu] = window.location.href.split('?');
const [,idLivre] = idRecu.split('=');

let tabAchat = [];
let bouttonCarte;
let inputCheckbox;
let format;
let inputQte;
let select;
let detailPlusText;

fetch("/json/livres.json")
    .then(data => data.json())
    .then((donnees) => {
        const cadreVente = document.querySelector("#aVendre");
        const valeur = donnees.find((infos)=>infos.id == idLivre);

        const htmlLivre = creationContenantLivre(valeur);

        // Gestion de l'ajout d'un livre au panier
        bouttonCarte.addEventListener('click', ajoutPanier);

        // Changement des valeurs en fonction du format sélectionné
        select.addEventListener('change', (event) => {
            changementFormat(event.target.value, valeur.paperback, valeur.hardcover, valeur.ebook);
        });
       
        // Mise à jour du prix en fonction de la quantité choisie
        inputQte.addEventListener('input', PrixQuantite);

        // Ajout de la structure HTML du livre dans le cadre final
        cadreVente.appendChild(htmlLivre);
    });

const creationContenantLivre= (valeur) => {
    const div = document.createElement("div");
    div.classList.add("element");

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('livre-img');

    const image = document.createElement('img');
    image.setAttribute('src', `${valeur.image}` );
    image.setAttribute('alt', 'happily' );

    imageDiv.appendChild(image);

    const div2 = document.createElement('div');
    div2.classList.add('infos-img');

    const h2 = document.createElement('h2');
    h2.classList.add('h2', 'titre', 'titreLivre');
    h2.textContent = valeur.titre;

    const auteur = document.createElement('h2');
    auteur.textContent = "By Kiera Cass";

    const contenuText = document.createElement('div');

    const vendre = document.createElement('strong');
    vendre.textContent = "On Sale : " + valeur.vente;

    contenuText.appendChild(vendre);

    const prix = document.createElement('p');
    prix.classList.add('prix-text');
    prix.textContent = valeur.paperback.prix;

    const inputHidden = document.createElement('input');
    inputHidden.setAttribute('type', 'hidden');
    inputHidden.setAttribute('id', 'basePrix');
    inputHidden.setAttribute('value', valeur.paperback.prix);

    format = document.createElement('div');
    format.classList.add('format');

    const formater = document.createElement('strong');
    formater.textContent = "Format : ";

    select = document.createElement('select');
    select.setAttribute('name', 'format');
    select.setAttribute('id', 'format');
    
    const option1 = document.createElement('option');
    option1.value = "PaperBack";
    option1.textContent = "PaperBack";
    option1.selected = true;

    const option2 = document.createElement('option');
    option2.value = "Hardcover";
    option2.textContent = "Hardcover";

    const option3 = document.createElement('option');
    option3.value = "E-book";
    option3.textContent = "E-book";

    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);

    format.appendChild(formater);
    format.appendChild(select);

    const hr = document.createElement('hr');

    const achat = document.createElement('div');
    achat.classList.add('achat');

    const quantite = document.createElement('strong');
    quantite.textContent = "Qte : ";

    inputQte = document.createElement('input');
    inputQte.setAttribute('type', 'number');
    inputQte.setAttribute('name', 'quantite');
    inputQte.setAttribute('id', 'qte');
    inputQte.setAttribute('min', '1');
    inputQte.setAttribute('max', '10');
    inputQte.setAttribute('value', '1');

    const lienCarte = document.createElement('a');

    bouttonCarte = document.createElement('button');
    bouttonCarte.setAttribute('type','submit');
    bouttonCarte.setAttribute('class', 'btn premier-btn');
    bouttonCarte.setAttribute('id', 'ajoutCarte');
    bouttonCarte.textContent = "Add to cart";

    lienCarte.appendChild(bouttonCarte);

    achat.appendChild(quantite);
    achat.appendChild(inputQte);
    achat.appendChild(lienCarte);

    const infosSup = document.createElement('div');
    infosSup.classList.add('infosSuplementaire');

    const tabTitre = ["ABOUT", "PRODUCT DETAILS", "REVIEW"];
    const tabContenu = [ valeur.contenu, valeur.paperback.detail, valeur.revue];
    const tabId = ["checkId1", "checkId2", "checkId3"];

    for( let i=0; i<3; i++ ) {
        const propos = document.createElement('div');
        propos.classList.add('aPropos');

        const proposText = document.createElement('p');
        proposText.textContent = tabTitre[i];

        const divCheck = document.createElement('div');

        inputCheckbox = document.createElement('input');
        inputCheckbox.classList.add('checkInput');
        inputCheckbox.setAttribute('type', 'checkbox');
        inputCheckbox.setAttribute('id', tabId[i]);
        inputCheckbox.setAttribute('class', 'checkIdClass');
        inputCheckbox.setAttribute('name', 'checkPlus');

        const label = document.createElement('label');
        label.setAttribute('for', tabId[i] );

        const proposPlus = document.createElement('i');
        proposPlus.classList.add('fas', 'fa-plus', 'plus');
        proposPlus.setAttribute('id','cliquerPlus');
        proposPlus.style.cursor = "pointer";

        label.appendChild(proposPlus);

        divCheck.appendChild(inputCheckbox);
        divCheck.appendChild(label);

        propos.appendChild(proposText);
        propos.appendChild(divCheck);

        const detailPlus = document.createElement('div');
        detailPlus.classList.add('detailEnPlus');

        detailPlusText = document.createElement('pre');
        detailPlusText.style.fontSize = "medium";
        detailPlusText.style.wordWrap = "break-word";
        detailPlusText.style.whiteSpace = "pre-wrap";
        detailPlusText.style.padding = "10px";

        if(i==1) {
            detailPlusText.classList.add('preContenu');
        }

        detailPlusText.textContent = tabContenu[i];

        detailPlus.appendChild(detailPlusText);
    
        infosSup.appendChild(propos);
        infosSup.appendChild(detailPlus);

        // Affiche details
        inputCheckbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                detailPlus.classList.add('affiche');
            } 
            else {
                detailPlus.classList.remove('affiche');
            }
        });

    }
    
    div2.appendChild(h2);
    div2.appendChild(auteur);
    div2.appendChild(contenuText);
    div2.appendChild(prix);
    div2.appendChild(inputHidden);
    div2.appendChild(format);
    div2.appendChild(hr);
    div2.appendChild(achat);
    div2.appendChild(infosSup);

    // Ajout dans le cadre final
    div.appendChild(imageDiv);
    div.appendChild(div2);

    return div;
}

const ajoutPanier = (event) => {
    event.preventDefault();
    let [,prixUnitaire] = document.querySelector('#basePrix').value.split('$');

    const produit = {
        id: idLivre,
        titre: document.querySelector('.titreLivre').textContent,
        image: document.querySelector('.livre-img img').getAttribute('src'),
        prix: document.querySelector('#basePrix').value,
        quantite: document.getElementById('qte').value,
        prixTotal: parseFloat(prixUnitaire)*parseFloat(document.getElementById('qte').value,) ,
        format: document.querySelector('#format').value, 
    };

    console.log(produit);

    const achatsExistant = JSON.parse(localStorage.getItem('tabAchat')) || [];

    achatsExistant.push(produit);

    console.log('eto'+achatsExistant);

    // Mettre à jour le localStorage
    localStorage.setItem('tabAchat', JSON.stringify(achatsExistant));
    
    // Mettre à jour le nombre de produits dans le panier
    let valeurCarte = localStorage.getItem('valeurCarte') ? parseInt(localStorage.getItem('valeurCarte')) : 0;
    valeurCarte++;

    localStorage.setItem('valeurCarte', valeurCarte.toString());

    const nbrAchat = document.querySelector('.nbrAchat');
    nbrAchat.innerText = valeurCarte;
};

const changementFormat = (formatCheck, paperback, hardcover, ebook) => {
    const nouvelleFormat = formatCheck;
    const prixText = document.querySelector('.prix-text');
    const prixCache = document.querySelector('#basePrix'); 
    const pre = document.querySelector('.preContenu');

    if(nouvelleFormat == "Hardcover") {
        prixText.textContent = `${hardcover.prix}`;
        prixCache.value = hardcover.prix;
        pre.textContent = hardcover.detail;
    }
    else if (nouvelleFormat == "E-book") {
        prixText.textContent = `${ebook.prix}`;
        prixCache.value = ebook.prix;
        pre.textContent = ebook.detail;
    }
};

const PrixQuantite = () => {
    const qte = document.getElementById('qte').value;
    const prix = document.getElementById('basePrix').value;
    const [,prixVeritable] = prix.split('$');
    const totalPrix = prixVeritable * qte;
    const prixText = document.querySelector('.prix-text');
    prixText.textContent = `$${totalPrix.toFixed(2)}`;
};

