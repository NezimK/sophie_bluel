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

export function estConnecte() {
    return localStorage.getItem('authToken') !== null;

}
estConnecte();
console.log(estConnecte());

function modeEditeur() {
    if (estConnecte()) {
        let login = document.getElementById("login");
        login.classList.add("inactive");
        login.classList.remove("active");

        let logout = document.getElementById("logout");
        logout.classList.add("active");
        logout.classList.remove("inactive");

        let filter = document.querySelector(".filter");
        filter.classList.add("inactive");
        filter.classList.remove("active");

        let banner = document.querySelector(".banner");
        banner.classList.add("active");
        banner.classList.remove("inactive");

        let edit = document.querySelector(".edit");
        edit.classList.add("active");
        edit.classList.remove("inactive");
        
    } else {
        let login = document.getElementById("login");
        login.classList.add("active");
        login.classList.remove("inactive");

        let logout = document.getElementById("logout");
        logout.classList.add("inactive");
        logout.classList.remove("active");

        let filter = document.querySelector(".filter");
        filter.classList.add("active");
        filter.classList.remove("inactive");

        let banner = document.querySelector(".banner");
        banner.classList.add("inactive");
        banner.classList.remove("active");

        let edit = document.querySelector(".edit");
        edit.classList.add("inactive");
        edit.classList.remove("active");
        
    }
}
modeEditeur();

export function deconnecter() {
    localStorage.removeItem('authToken');
    window.location.href = "index.html"; // Recharge la page après déconnexion
}

let logout = document.getElementById("logout");
logout.addEventListener('click', function () {
    localStorage.removeItem('authToken');
    window.location.href = "index.html"; // Recharge la page après déconnexion

});