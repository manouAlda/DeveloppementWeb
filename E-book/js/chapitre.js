const [,numero] = window.location.href.split('?');
const [,id] = numero.split('=');


const contenant = document.getElementById('lireChapitre'); 

// Lecture des chapitres

fetch('/chapitres/chapitre'+id+'.txt')
    .then(data => data.text()) 
    .then( text => {
        const titre = document.createElement('p');
        titre.classList.add('titre', 'chapitreTitre');
        titre.textContent = 'Chapitre 0'+id;

        const pre = document.createElement('pre');
        pre.classList.add('contenu-chapitre');

        pre.textContent = text;

        contenant.appendChild(titre);
        contenant.appendChild(pre);

    })
    .catch(error =>{
        console.error('Erreur de chargement du fichier :', error);
    });