/*
 * Lógica de Login integrada com a API Java Spring Boot
 */
document.addEventListener("DOMContentLoaded", function() {
    
    const loginForm = document.getElementById("login-form");
    // Certifique-se de que a porta aqui é a mesma que aparece no console do Java (ex: 8080)
    const API_URL = "http://localhost:8080/api";

    if (loginForm) {
        loginForm.addEventListener("submit", async function(event) {
            event.preventDefault(); 
            
            // Pega os dados do formulário
            const cpfInput = document.getElementById("cpf").value.trim(); 
            const senhaInput = document.getElementById("password").value;

            const loginData = {
                cpf: cpfInput,
                senha: senhaInput
            };

            try {
                // Faz a requisição para o Back-end
                const response = await fetch(`${API_URL}/usuarios/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginData)
                });

                if (response.ok) {
                    const usuario = await response.json();
                    
                    // Salva os dados do usuário no navegador
                    localStorage.setItem('uvatecaUser', usuario.nome);
                    localStorage.setItem('uvatecaRole', usuario.tipoUsuario); 
                    localStorage.setItem('uvatecaCpf', usuario.cpf);

                    alert(`✅ Bem-vindo(a), ${usuario.nome}!`);

                    // --- MUDANÇA AQUI: TODOS AGORA VÃO PARA O INDEX ---
                    window.location.href = "index.html"; 

                } else {
                    alert("❌ Login falhou! Verifique se o CPF e a Senha estão corretos.");
                }
            } catch (error) {
                console.error("Erro:", error);
                alert("❌ Erro ao conectar com o servidor. Verifique se o Java está rodando.");
            }
        });
    }
});