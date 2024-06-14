const [,li] = window.location.href.split('?');

const contenant = document.querySelector('#infosLivre');

fetch("/json/livres.json").then(data => data.json()).then((donnees) => {
    const div = document.createElement("div");
    div.classList.add("element");

    const [,id_product] = li.split('=');

    const valeur = donnees.find((donnee)=>donnee.id == id_product);
    const { id,titre, image, tag, resume, contenu,paperback, hardcover, ebook, detail } = valeur;

    if(detail) {
        div.innerHTML = `
            <div class="livre-img">
            <img src="${image}" alt="happily">
            </div>
            <div class="infos-img">
            <h2 class="h2 titre">${titre}</h2>
            <h2>Write by Kiera Cass</h2>
            <a href="Achat.html?id=${id}">
                <button class="btn premier-btn">GET IT HERE</button>
            </a>
            <div class="contenu-infos">
                <div class="entete-haut">
                    <ul>
                        <li id="btnResume">Resume</li>
                        <li id="btnDetail">Details</li>
                    </ul>
                </div>
                <div class="contenu-text active" id="resume">
                    <pre style="font-size: medium; font-size: large; word-wrap: break-word; white-space: pre-wrap; color=#fff; font-weight: 700;>
                        ${tag}
                    </pre>
                    <pre style="font-size: medium;  word-wrap: break-word; white-space: pre-wrap;" >${contenu} </pre>
                </div>
                <div class="contenu-text" id="detail" >
                    <pre style="font-size: medium; word-wrap: break-word; white-space: pre-wrap;">${paperback.detail ? paperback.detail : detail }</pre>
                </div>
            </div>
            </div>`;
    }
    else {
        div.innerHTML = `
            <div class="livre-img">
            <img src="${image}" alt="happily">
            </div>
            <div class="infos-img">
            <h2 class="h2 titre">${titre}</h2>
            <h2>Write by Kiera Cass</h2>
            
            <div class="contenu-infos">
                <div class="entete-haut">
                    <ul>
                        <li id="btnResume">Resume</li>
                    </ul>
                </div>
                <div class="contenu-text active" id="resume">
                    <pre style="font-size: medium; font-size: large; word-wrap: break-word;
                    white-space: pre-wrap;" >${contenu} </pre>
                </div>
            </div>
            </div>`;
    }
    

    contenant.appendChild(div);
    const btnResume = document.querySelector("#btnResume");
    const btnDetail = document.querySelector("#btnDetail");

    btnResume.style.cursor = "pointer";
    btnDetail.style.cursor = "pointer";
    
    // Gestion affichage
    if(btnResume){
        btnResume.addEventListener("click", () => {
            const detail = document.querySelector("#detail");
            const resume = document.querySelector("#resume");
            resume.classList.add('active');
            detail.classList.remove('active');
            console.log("resume");
        });
    }
    if(btnDetail){
        btnDetail.addEventListener("click", () => {
            const detail = document.querySelector("#detail");
            const resume = document.querySelector("#resume");
            detail.classList.add('active');
            resume.classList.remove('active');
            console.log("detail");
        });
    }
});





