document.addEventListener("DOMContentLoaded", function() {
    const formulaireUsers = document.getElementById("users-password");

    formulaireUsers.addEventListener("submit", function(event) {
        event.preventDefault();

        // Récupération des valeurs de l'email et du mot de passe
        let users = {
            email: event.target.querySelector("[name='email']").value,
            password: event.target.querySelector("[name='password']").value
        };

        const chargeUtile = JSON.stringify(users);

        // Envoi de la requête à l'API
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: chargeUtile
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Convertir la réponse en JSON si c'est OK
            }
            prompt("Erreur lors de la connexion");
        })
        .then(data => {
            if (data) {
                // Sauvegarde du token dans le localStorage
                localStorage.setItem("authToken", data.token);

                // Redirection vers l'index après la connexion réussie
                window.location.href = "index.html";
                
            }
        });
    });
});
