// Récupération des données depuis l'API
const response = await fetch("http://localhost:5678/api/works");
// Stocke les données de l'API dans une variable au format JSON
const works = await response.json();
console.log(works);


// Fonction qui génère les travaux
function generateWorks(works) {
    // Récupération de l'élément du DOM qui accueillera la galerie
    const sectionGallery = document.querySelector(".gallery");

    // Vider la galerie avant d'ajouter de nouveaux éléments
    sectionGallery.innerHTML = '';

    // Parcours de chaque travail dans la liste des travaux
    works.forEach(work => {
        // Création d'un élément article pour chaque travail
        const worksElement = document.createElement("article");

        // Création d'une balise img pour l'image du travail
        const workImage = document.createElement("img");
        workImage.src = work.imageUrl;
        workImage.alt = work.title;

        const workTitle = document.createElement("h3");
        workTitle.textContent = work.title;

        const workCategory = document.createElement("p");
        workCategory.textContent = work.categoryId;

        // Ajout de l'image et du titre à l'élément article
        worksElement.appendChild(workImage);
        worksElement.appendChild(workTitle);
        worksElement.appendChild(workCategory);

        // Ajout de l'article à la galerie
        sectionGallery.appendChild(worksElement);
    });
}

// Appel de la fonction pour générer les travaux dans la galerie
generateWorks(works);

// Sélectionne tous les boutons filtres
const buttonsFilter = document.querySelectorAll(".btn-filter");

buttonsFilter.forEach(button => {
    button.addEventListener("click", function () {
        const categoryId = button.getAttribute("data-category");

        if (categoryId === "all") {
            // Afficher tous les travaux
            generateWorks(works);
        } else {
            // Filtrer les travaux par catégorie
            const worksFilter = works.filter(function (work) {
                return work.categoryId === parseInt(categoryId);
            });

            generateWorks(worksFilter);
        }
    });
});

// Fonction qui vérifie si un jeton d'authentification est stocké dans localStorage
export function estConnecte() {
    return localStorage.getItem('authToken') !== null;
}

estConnecte();
console.log(estConnecte());

// Fonction pour gérer l'apparition des éléments en fonction de la connexion
function modeEditeur() {
    if (estConnecte()) {

        let login = document.getElementById("login");
        login.classList.add("inactive"); // Retire l'élément Login
        login.classList.remove("active");

        let logout = document.getElementById("logout");
        logout.classList.add("active"); // Affiche l'élément Logout
        logout.classList.remove("inactive");

        let filter = document.querySelector(".filter");
        filter.classList.add("inactive"); // Retire l'élément Filter
        filter.classList.remove("active");

        let banner = document.querySelector(".banner");
        banner.classList.add("active"); // Affiche l'élément Banner
        banner.classList.remove("inactive");

        let edit = document.querySelector(".edit");
        edit.classList.add("active"); // Affiche l'élément Edit
        edit.classList.remove("inactive");

    } else {

        let login = document.getElementById("login");
        login.classList.add("active"); // Affiche l'élément Login
        login.classList.remove("inactive");

        let logout = document.getElementById("logout");
        logout.classList.add("inactive"); // Retire l'élément Logout
        logout.classList.remove("active");

        let filter = document.querySelector(".filter");
        filter.classList.add("active"); // Affiche l'élément Filter
        filter.classList.remove("inactive");

        let banner = document.querySelector(".banner");
        banner.classList.add("inactive"); // Retire l'élément Banner
        banner.classList.remove("active");

        let edit = document.querySelector(".edit");
        edit.classList.add("inactive"); // Retire l'élément Edit
        edit.classList.remove("active");
    }
}
modeEditeur();

// Fonction pour déconnecter l'utilisateur
export function deconnecter() {
    localStorage.removeItem('authToken'); // Supprime le jeton d'authentification de localStorage
    window.location.href = "index.html"; // Recharge la page afficher les changements après déconnexion
}

let logout = document.getElementById("logout");
logout.addEventListener('click', function () {
    localStorage.removeItem('authToken'); // Supprime le jeton d'authentification de localStorage
    window.location.href = "index.html"; // Recharge la page après déconnexion
});


const editButton = document.querySelector(".edit"); // Bouton pour ouvrir la modale
const closeButton = document.querySelector(".close_button"); // Bouton pour fermer la modale
const modale = document.querySelector(".modale"); // Élément modale
const overlay = document.querySelector(".overlay");

// Fonction pour gérer l'affichage de la modale
function manageModale() {
    if (estConnecte()) {

        editButton.addEventListener('click', () => {
            modale.classList.add('active'); // Affiche la modale
            modale.classList.remove('inactive');
            overlay.classList.add('active');
            overlay.classList.remove('inactive');
        });

        closeButton.addEventListener('click', () => {
            modale.classList.add('inactive'); // Cache la modale
            modale.classList.remove('active');
            overlay.classList.add('inactive');
            overlay.classList.remove('active');
        });

        overlay.addEventListener('click', () => {
            modale.classList.add('inactive'); // Cache la modale
            modale.classList.remove('active');
            overlay.classList.add('inactive');
            overlay.classList.remove('active');
        });     
    }
}

manageModale();


function generateWorksModale(works) {
    // Récupération de l'élément du DOM qui accueillera la galerie
    const bodyModale = document.querySelector(".modale_body");

    // Parcours de chaque travail dans la liste des travaux
    works.forEach(work => {
        // Création d'un élément article pour chaque travail
        const worksElementModale = document.createElement("article");

        // Création d'une balise img pour l'image du travail
        const workImageModale = document.createElement("img");
        workImageModale.src = work.imageUrl;
        workImageModale.alt = work.title;

        const svgBackground = document.createElement("div");
        svgBackground.classList.add("svg-overlay-background");
        svgBackground.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <rect width="17" height="17" rx="2" fill="black"/>
            </svg>
        `;

        const svgOverlay = document.createElement("div");
        svgOverlay.classList.add("svg-overlay");
        svgOverlay.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none">
                <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
            </svg>
        `;
        // Ajout de l'image et du titre à l'élément article
        worksElementModale.appendChild(workImageModale);
        worksElementModale.appendChild(svgOverlay);
        worksElementModale.appendChild(svgBackground);
        // Ajout de l'article à la galerie
        bodyModale.appendChild(worksElementModale);
    });
}

generateWorksModale(works);

