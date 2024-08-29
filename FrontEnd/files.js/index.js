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
        workCategory.textContent = work.Category;
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

const buttonFilter = document.querySelector(".btn-filter");

buttonFilter.addEventListener("click", function() {
    const worksFilter = works.filter(function (work) {
        return work.Category === Objets;
    });
    document.querySelector("#portfolio").innerHTML = "";
    generateWorks(worksFilter);
});