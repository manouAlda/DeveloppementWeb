let div = document.querySelector('#divAchats');

const afficheAchat = (elt) => {

    let carte = document.createElement('div');
    carte.classList.add('carte-item');

    let image = document.createElement('img');
    image.setAttribute('src',`${elt.image}`);
    image.setAttribute('alt',`${elt.titre}`);
    image.classList.add('item-image');

    let span = document.createElement('span');
    span.classList.add('nombre');
    span.textContent = `${elt.quantite}`;

    let detail = document.createElement('div');
    detail.classList.add('item-details');

    let titre = document.createElement('p');
    titre.classList.add('item-titre');
    titre.textContent = `${elt.titre}`;

    let format = document.createElement('p');
    format.classList.add('item-type');
    format.textContent = `${elt.format}`;

    detail.appendChild(titre);
    detail.appendChild(format);

    let prix = document.createElement('div');
    prix.classList.add('item-prix');

    let cout = document.createElement('p');
    cout.classList.add('item-cout');
    cout.textContent = `${elt.prixTotal}`;

    prix.appendChild(cout);

    carte.appendChild(image);
    carte.appendChild(span);
    carte.appendChild(detail);
    carte.appendChild(prix);

    return carte;
}

const achat = JSON.parse(localStorage.getItem('tabAchat'));
console.log(achat);

achat.forEach( elt => {
    let itemCarte = afficheAchat(elt);
    div.appendChild(itemCarte);
});

const subtotal = document.querySelector('#prixSubtotal');
const total = document.querySelector('#prixTotal');

subtotal.textContent = `$${JSON.parse(localStorage.getItem('totalGlobal'))}`;
total.textContent = `USD $${JSON.parse(localStorage.getItem('totalGlobal'))}`;

// Gestion payment
function affichePayment(method) {
    const creditCardSection = document.getElementById('divCredit');
    const paypalSection = document.getElementById('divPaypal');

    if (method === 'divCredit') {
        creditCardSection.style.display = 'block';
        paypalSection.style.display = 'none';
    } else if (method === 'divPaypal') {
        creditCardSection.style.display = 'none';
        paypalSection.style.display = 'block';
    }
}

if (document.getElementById('credit-carte-radio').checked) {
    affichePayment('divCredit');
    console.log("credit");
} else if (document.getElementById('paypal-radio').checked) {
    affichePayment('divPaypal');
    console.log("paypal");
}