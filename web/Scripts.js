document.addEventListener('DOMContentLoaded', function() {
    function confirmAction(message, action) {
        if (confirm(message)) {
            action();
        }
    }

    function logout() {
        confirmAction('Êtes-vous sûr de vouloir vous déconnecter ?', () => {
            alert('Déconnecté avec succès !');
            window.location.href = 'login.html';
        });
    }

    function approveEvent() {
        alert('Événement approuvé avec succès !');
    }

    function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Vérification simple des identifiants (à remplacer par une vérification côté serveur)
        if (username === 'admin' && password === 'admin') {
            alert('Connexion réussie !');
            window.location.href = 'index.html';
        } else {
            alert('Nom d\'utilisateur ou mot de passe incorrect.');
        }
    }

    const logoutButton = document.getElementById('logoutButton');
    const approveButton = document.getElementById('approveButton');
    const loginForm = document.getElementById('loginForm');

    if (logoutButton) logoutButton.addEventListener('click', logout);
    if (approveButton) approveButton.addEventListener('click', approveEvent);
    if (loginForm) loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        login();
    });
});

