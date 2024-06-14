// Boucler la liste des livres

const listesLivre = document.querySelectorAll(".grid-liste");
const nbrLivre = listesLivre[listesLivre.length-1];

fetch("/json/livres.json").then( data => data.json()).then((donnees) => {
    
    const ul = document.querySelector("#listeLivre");
    donnees.forEach((donnee) => {
        const { image,titre, resume,id } = donnee;

        /// Ajout d'une nouvelle clé dans le donnee
        // const test = "jhd";
        // donnee = {...donnee, test}    ...donnee : copie du tableau donné et ajouté la clé test
        // ...donnee:l destructuration
        
        const li  = document.createElement("li");
        li.innerHTML = `
            <a href="informations-livre.html?id=${id}">
                <div class="achever-carte">
                    <figure class="acheveCarte auteur-img" style="--width: ;  --height: ;">
                        <img src=${image} width="450" height="300" loading="lazy" class="couverture-img">
                    </figure>
                    <div class="contenu-carte">
                        <img src="./img/award.svg" alt="trophée" width="80" height="80" loading="lazy" class="svg-img">
                        <h3 class="h3 prix-titre">${titre}</h3>
                        <p class="carte-text">${resume}</p>
                    </div>
                </div>
            </a>
        `
        ul.appendChild(li);
    });
});


