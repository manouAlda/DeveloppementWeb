// Bouton menu du navbar 

const navbar = document.querySelector(".navbar");
const navbarLiens = document.querySelectorAll(".navbar-lien");
const navbarBtn = document.querySelector(".nav-btn"); 

const navbarActive = function () {
    navbar.classList.toggle("active");
    navbarBtn.classList.toggle("active");
}
navbarBtn.addEventListener('click', navbarActive);

const fermerNavbar = function () {
    navbar.classList.remove("active");
    navbarBtn.classList.remove("active");
}
for (let i = 0; i < navbarLiens.length; i++) {
    navbarLiens[i].addEventListener('click', fermerNavbar);
}

// L'entete reste à sa place si on scroll (> 100px)

const entete = document.querySelector(".entete");

const activeEntete = function () {
    if( window.scrollY > 100 ) {
        entete.classList.add("active");
    }
    else {
        entete.classList.remove("active");
    }
}
window.addEventListener('scroll', activeEntete);

// Rafraichissement du nombre d'achat
if (performance.navigation.type === 0 || performance.navigation.type === 1 || performance.navigation.type === 2) {

    
    let valeurCarte = localStorage.getItem('valeurCarte')? parseInt(localStorage.getItem('valeurCarte')) : 0;

    // const achatsExistant = [];
    // localStorage.setItem('valeurCarte', '0');
    // localStorage.setItem('tabAchat', JSON.stringify(achatsExistant));

    console.log(valeurCarte);
    // Mettre à jour l'affichage
    document.querySelector('.nbrAchat').innerText = valeurCarte;
} 

// Afficher le chapitre à lire

const tableCarte = document.querySelectorAll(".tab-carte");

let carteSelectionner = tableCarte[0];

const lectureCarte = function () {
    carteSelectionner.classList.remove("active");
    this.classList.add("active");  
    carteSelectionner = this;       
}
for (let i = 0; i < tableCarte.length; i++) {
    tableCarte[i].addEventListener('click', lectureCarte);
}
