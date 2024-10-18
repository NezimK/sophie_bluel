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
    const bodyModale = document.querySelector(".modale_body");
    bodyModale.innerHTML = '';

    works.forEach(work => {
        const worksElementModale = document.createElement("article");

        const workImageModale = document.createElement("img");
        workImageModale.src = work.imageUrl;
        workImageModale.alt = work.title;

        let svgBackground = document.createElement("div");
        svgBackground.classList.add("svg-overlay-background");

        let svgOverlay = document.createElement("div");
        svgOverlay.classList.add("svg-overlay");
        svgOverlay.setAttribute("data-id", work.id);  // Associe l'ID du travail

        svgOverlay.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none">
                <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
            </svg>
        `;

        worksElementModale.appendChild(workImageModale);
        worksElementModale.appendChild(svgOverlay);
        worksElementModale.appendChild(svgBackground);
        
        bodyModale.appendChild(worksElementModale);
    });
}
generateWorksModale(works);
document.addEventListener('click', function (event) {
    if (event.target.closest('.svg-overlay')) {
        const svgOverlay = event.target.closest('.svg-overlay');
        const workId = svgOverlay.getAttribute('data-id');
        
        if (workId) {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce travail ?")) {
                fetch(`http://localhost:5678/api/works/${workId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                .then(response => {
                    if (response.ok) {
                        // Si la suppression sur le serveur a réussi, supprimer le travail de l'UI
                        svgOverlay.closest('article').remove();
                        alert("Travail supprimé avec succès.");
                    } else {
                        // Gestion des erreurs
                        alert("Erreur lors de la suppression du travail. Veuillez réessayer.");
                    }
                })
                .catch(error => {
                    console.error("Erreur :", error);
                });
            }
        }
    }
});


const openSecondModalBtn = document.querySelector('.open-second-modal');
const secondModal = document.querySelector('.modale_second');

const closeModalBtn = document.querySelectorAll('.close_button');

const arrowBackBtn = document.querySelector('.arrow-back');

openSecondModalBtn.addEventListener('click', function () {
    modale.classList.add('inactive');
    modale.classList.remove('active');
    
    secondModal.classList.add('active');
    secondModal.classList.remove('inactive');
    
    overlay.classList.add('active');
    overlay.classList.remove('inactive');
});

arrowBackBtn.addEventListener('click', function () {
    secondModal.classList.add('inactive');
    secondModal.classList.remove('active');
    
    modale.classList.add('active');
    modale.classList.remove('inactive');
    
    overlay.classList.add('active');
    overlay.classList.remove('inactive');
});

closeModalBtn.forEach(function(btn) {
    btn.addEventListener('click', function () {
        modale.classList.add('inactive');
        modale.classList.remove('active');
        
        secondModal.classList.add('inactive');
        secondModal.classList.remove('active');
        
        overlay.classList.add('inactive');
        overlay.classList.remove('active');
    });
});

overlay.addEventListener('click', function () {
    secondModal.classList.add('inactive');
    secondModal.classList.remove('active');
    modale.classList.add('inactive');
    modale.classList.remove('active');
    overlay.classList.add('inactive');
    overlay.classList.remove('active');
});
const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4 Mo

async function fetchProjets() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;
}

// Fonction pour vérifier si tous les champs sont remplis
function verifierChamps() {
    const form = document.querySelector('#photoForm');
    const addPictureBtn = form.querySelector('.validate');

    const image = form.querySelector('#fileInput').files.length > 0;
    const title = form.querySelector('#title').value.trim() !== '';
    const category = form.querySelector('#categorie').value.trim() !== '';

    // Change la couleur et le curseur du bouton selon si tous les champs sont remplis
    if (image && title && category) {
        addPictureBtn.style.backgroundColor = '#1D6154'; // Vert si tout est bon
        addPictureBtn.classList.add('active'); // Ajoute la classe active
    } else {
        addPictureBtn.style.backgroundColor = '#d3d3d3'; // Gris sinon
        addPictureBtn.classList.remove('active'); // Retire la classe active
    }
}


// Afficher l'image sélectionnée et vérifier le type et la taille
document.getElementById('fileInput').addEventListener('change', function(event) {
    const previewImage = document.getElementById('previewImage');
    const file = event.target.files[0];

    if (file) {
        // Vérification du type et de la taille du fichier
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            alert("Format d'image invalide. Choisissez un fichier JPG ou PNG.");
            resetInput(); // Réinitialise l'input file
            return;
        }
        if (file.size > MAX_IMAGE_SIZE) { // 4 Mo
            alert('La taille de l\'image ne doit pas dépasser 4 Mo.');
            resetInput(); // Réinitialise l'input file
            return;
        }

        // Afficher l'aperçu
        previewImage.src = URL.createObjectURL(file);
        previewImage.style.display = 'block'; // Montre l'image
    } else {
        previewImage.style.display = 'none'; // Cache l'image si aucune sélection
    }
    verifierChamps(); // Vérifie les champs après sélection
});

// Réinitialise l'input et l'aperçu
function resetInput() {
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');
    fileInput.value = ''; // Réinitialise l'input file
    previewImage.style.display = 'none'; // Cache l'image
    verifierChamps(); // Vérifie les champs
}

// Ajout d'écouteurs d'événements pour vérifier les champs à chaque modification
document.querySelector('#title').addEventListener('input', verifierChamps); // Sur modification du titre
document.querySelector('#categorie').addEventListener('change', verifierChamps); // Sur changement de catégorie

// Sélectionne le bouton de validation
const addPictureBtn = document.querySelector('.validate');
addPictureBtn.textContent = 'Valider';
async function formSubmit(form) {
    const fileInput = document.getElementById('fileInput');
    const titleInput = document.getElementById('title');
    const categorySelect = document.getElementById('categorie');
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    form.appendChild(errorMessage); // Ajouter un message d'erreur au formulaire s'il n'existe pas déjà

    const imageFile = fileInput.files[0]; // Récupère le fichier image sélectionné

    // On vérifie que tous les champs sont bien remplis
    if (!imageFile || !titleInput.value || !categorySelect.value) {
        errorMessage.textContent = 'Remplissez tous les champs';
        errorMessage.style.display = 'block'; // Affiche le message d'erreur
        errorMessage.style.color = 'red';
        return; // Ne pas soumettre le formulaire si les champs ne sont pas remplis
    }

    const formData = new FormData();
    formData.append('image', imageFile); // Ajoute l'image sélectionnée
    formData.append('title', titleInput.value); // Ajoute le titre
    formData.append('category', categorySelect.value); // Ajoute la catégorie

    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch("http://localhost:5678/api/works", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}` // Ajoute le token dans l'en-tête de la requête
            },
            body: formData
        });

        if (response.ok) {
            // Récupère la liste des projets mise à jour
            const projets = await fetchProjets();
            console.log(projets);
            // Met à jour la galerie avec le nouveau projet
            generateWorks(projets);

            // Cache le message d'erreur en cas de succès
            errorMessage.style.display = 'none';

            // Réinitialise le formulaire après une soumission réussie
            form.reset();
            verifierChamps(); // Vérifie les champs après réinitialisation
            document.getElementById('previewImage').style.display = 'none'; // Cache l'aperçu d'image

        } else {
            const error = await response.json();
            errorMessage.textContent = error.message; // Affiche l'erreur renvoyée par l'API
            errorMessage.style.display = 'block'; // Affiche le message d'erreur
            errorMessage.style.color = 'red';
        }
    } catch (error) {
        errorMessage.textContent = 'Une erreur est survenue. Veuillez réessayer plus tard.';
        errorMessage.style.display = 'block'; // Affiche un message d'erreur générique
        errorMessage.style.color = 'red';
    }
}

// On s'assure de ne pas avoir plusieurs écouteurs (nettoie les anciens événements)
addPictureBtn.removeEventListener('click', formSubmit);
addPictureBtn.addEventListener('click', async (event) => {
    console.log("Le bouton Valider a été cliqué!"); 
    event.preventDefault(); // Empêche l'envoi du formulaire si les champs ne sont pas remplis
    const form = document.querySelector('#photoForm');
    await formSubmit(form); // Fonction pour soumettre le formulaire
});

// Vérifier les champs au chargement initial
verifierChamps();
