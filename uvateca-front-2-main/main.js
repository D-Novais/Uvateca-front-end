/*
 * Script principal da Uvateca
 * Lógica para abrir/fechar a Sidebar
 * Lógica para gerenciar o estado de login e cargos
 */

document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. LÓGICA DE ABRIR/FECHAR SIDEBAR ---
    const userIconBtn = document.getElementById("user-icon-btn");
    const sidebar = document.getElementById("user-sidebar");

    if (userIconBtn && sidebar) {
        userIconBtn.addEventListener("click", function(event) {
            event.preventDefault(); 
            sidebar.classList.toggle("active");
        });
    }

    // --- 2. LÓGICA DE ESTADO DE LOGIN ---
    atualizarEstadoSidebar();


    // --- 3. LÓGICA DE LOGOUT ---
    const logoutBtn = document.getElementById("nav-logout");
    if(logoutBtn) {
        logoutBtn.addEventListener("click", function(event) {
            event.preventDefault();
            // Remove o usuário e o cargo do localStorage
            localStorage.removeItem('uvatecaUser');
            localStorage.removeItem('uvatecaRole');
            
            atualizarEstadoSidebar();
            window.location.href = 'index.html';
        });
    }

});

/**
 * Verifica o localStorage, o cargo e atualiza a sidebar.
 */
function atualizarEstadoSidebar() {
    const userName = localStorage.getItem('uvatecaUser');
    const userRole = localStorage.getItem('uvatecaRole');

    // Seleciona elementos
    const profileLogado = document.getElementById('sidebar-logado');
    const profileDeslogado = document.getElementById('sidebar-deslogado');
    const welcomeText = document.getElementById('welcome-msg-text');
    
    // Links de Administração
    const navDashboard = document.getElementById('nav-dashboard');
    const navCadastrarFuncionario = document.getElementById('nav-cadastrar-funcionario'); // NOVO
    
    // Links de Usuário Comum
    const navBiblioteca = document.getElementById('nav-biblioteca');
    const navAlugados = document.getElementById('nav-alugados');
    
    // Links de Autenticação
    const navLogin = document.getElementById('nav-login');
    const navLogout = document.getElementById('nav-logout');

    // Garante que os elementos principais existam
    if (!profileLogado || !profileDeslogado || !navLogin || !navLogout || !navDashboard || !navCadastrarFuncionario) {
        return; 
    }

    if (userName) {
        // --- ESTADO LOGADO (GERAL) ---
        profileLogado.style.display = 'block';
        profileDeslogado.style.display = 'none';
        
        const nomeCapitalizado = userName.charAt(0).toUpperCase() + userName.slice(1);
        welcomeText.textContent = `Bem-vindo(a), ${nomeCapitalizado}!`;

        // Links de Usuário Comum
        navBiblioteca.style.display = 'list-item';
        navAlugados.style.display = 'list-item';
        
        // Links de Autenticação
        navLogin.style.display = 'none';
        navLogout.style.display = 'list-item';
        
        // LÓGICA DE CARGO: ADMIN
        if (userRole === 'ADMIN') {
            navDashboard.style.display = 'list-item';
            navCadastrarFuncionario.style.display = 'list-item'; // SÓ ADMIN VÊ ESTE
        } else {
            navDashboard.style.display = 'none';
            navCadastrarFuncionario.style.display = 'none';
        }

    } else {
        // --- ESTADO DESLOGADO ---
        profileLogado.style.display = 'none';
        profileDeslogado.style.display = 'block';

        navBiblioteca.style.display = 'none';
        navAlugados.style.display = 'none';
        navDashboard.style.display = 'none';
        navCadastrarFuncionario.style.display = 'none'; // Esconde para deslogado
        navLogin.style.display = 'list-item';
        navLogout.style.display = 'none';
    }
}