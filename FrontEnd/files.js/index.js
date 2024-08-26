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
        workImage.src = work.imageUrl;  // URL de l'image récupérée depuis l'API
        workImage.alt = work.title;  // Titre utilisé comme texte alternatif

        // Création d'une balise h3 pour le titre du travail
        const workTitle = document.createElement("h3");
        workTitle.textContent = work.title;

        // Ajout de l'image et du titre à l'élément article
        worksElement.appendChild(workImage);
        worksElement.appendChild(workTitle);

        // Ajout de l'article à la galerie
        sectionGallery.appendChild(worksElement);
    });
}

// Appel de la fonction pour générer les travaux dans la galerie
generateWorks(works);
