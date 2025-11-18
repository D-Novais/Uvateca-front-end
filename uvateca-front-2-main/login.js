/*
 * Lógica de Simulação de Login da Uvateca
 */
document.addEventListener("DOMContentLoaded", function() {
    
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const email = document.getElementById("email").value.trim();
        
        const userName = email.split('@')[0];
        let role = 'CLIENTE'; // Cargo padrão

        // 1. Lógica de determinação do cargo
        if (email === "admin1234@gmail.com") {
            role = 'ADMIN';
        } else if (email === "func@uvateca.com") {
            role = 'FUNCIONARIO';
        }

        // 2. SALVA O ESTADO E O CARGO NO LOCALSTORAGE
        localStorage.setItem('uvatecaUser', userName);
        localStorage.setItem('uvatecaRole', role); // <-- NOVO: Salva o cargo

        // 3. Redirecionamento com base no cargo
        if (role === 'ADMIN') {
            alert("✅ Bem-vindo, Administrador! Redirecionando...");
            window.location.href = "painel-admin.html";
        } else if (role === 'FUNCIONARIO') {
            alert("✅ Bem-vindo, Funcionário! Redirecionando...");
            window.location.href = "painel-funcionario.html";
        } else {
            alert("✅ Login realizado com sucesso!");
            window.location.href = "index.html"; 
        }
    });
});