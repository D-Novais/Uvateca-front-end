document.addEventListener("DOMContentLoaded", function() {
    
    // Sidebar Toggle
    const userIconBtn = document.getElementById("user-icon-btn");
    const sidebar = document.getElementById("user-sidebar");

    if (userIconBtn && sidebar) {
        userIconBtn.addEventListener("click", function(event) {
            event.preventDefault(); 
            sidebar.classList.toggle("active");
        });
    }

    atualizarEstadoSidebar();

    // Logout
    const logoutBtn = document.getElementById("nav-logout");
    if(logoutBtn) {
        logoutBtn.addEventListener("click", function(event) {
            event.preventDefault();
            localStorage.removeItem('uvatecaUser');
            localStorage.removeItem('uvatecaRole');
            localStorage.removeItem('uvatecaCpf');
            atualizarEstadoSidebar();
            window.location.href = 'index.html';
        });
    }
});

function atualizarEstadoSidebar() {
    const userName = localStorage.getItem('uvatecaUser');
    const userRole = localStorage.getItem('uvatecaRole'); // 'ADMIN', 'FUNCIONARIO', 'COMUM'

    const profileLogado = document.getElementById('sidebar-logado');
    const profileDeslogado = document.getElementById('sidebar-deslogado');
    const welcomeText = document.getElementById('welcome-msg-text');
    
    // Links
    const navDashboard = document.getElementById('nav-dashboard');
    const navCadastrarUsuario = document.getElementById('nav-cadastrar-usuario');
    const navRegistrarLivro = document.getElementById('nav-registrar-livro');   // NOVO
    const navRealizarAluguel = document.getElementById('nav-realizar-aluguel'); // NOVO
    const navCadastrarFuncionario = document.getElementById('nav-cadastrar-funcionario');
    
    const navBiblioteca = document.getElementById('nav-biblioteca');
    const navAlugados = document.getElementById('nav-alugados');
    const navLogin = document.getElementById('nav-login');
    const navLogout = document.getElementById('nav-logout');

    if (!profileLogado) return;

    if (userName) {
        profileLogado.style.display = 'block';
        profileDeslogado.style.display = 'none';
        welcomeText.textContent = `Olá, ${userName}`;

        if(navBiblioteca) navBiblioteca.style.display = 'list-item';
        if(navAlugados) navAlugados.style.display = 'list-item';
        if(navLogin) navLogin.style.display = 'none';
        if(navLogout) navLogout.style.display = 'list-item';
        
        // --- PERMISSÕES ---

        // 1. Ações Operacionais (ADMIN e FUNCIONARIO)
        if (userRole === 'ADMIN' || userRole === 'FUNCIONARIO') {
            if(navCadastrarUsuario) navCadastrarUsuario.style.display = 'list-item';
            if(navRegistrarLivro) navRegistrarLivro.style.display = 'list-item';     // MOSTRA
            if(navRealizarAluguel) navRealizarAluguel.style.display = 'list-item';   // MOSTRA
        } else {
            if(navCadastrarUsuario) navCadastrarUsuario.style.display = 'none';
            if(navRegistrarLivro) navRegistrarLivro.style.display = 'none';
            if(navRealizarAluguel) navRealizarAluguel.style.display = 'none';
        }

        // 2. Ações Gerenciais (APENAS ADMIN)
        if (userRole === 'ADMIN') {
            if(navDashboard) navDashboard.style.display = 'list-item';
            if(navCadastrarFuncionario) navCadastrarFuncionario.style.display = 'list-item';
        } else {
            if(navDashboard) navDashboard.style.display = 'none';
            if(navCadastrarFuncionario) navCadastrarFuncionario.style.display = 'none';
        }

    } else {
        // Deslogado
        profileLogado.style.display = 'none';
        profileDeslogado.style.display = 'block';
        
        // Esconde tudo que é restrito
        const restricted = [navBiblioteca, navAlugados, navDashboard, navCadastrarUsuario, navRegistrarLivro, navRealizarAluguel, navCadastrarFuncionario];
        restricted.forEach(el => { if(el) el.style.display = 'none'; });

        if(navLogin) navLogin.style.display = 'list-item';
        if(navLogout) navLogout.style.display = 'none';
    }
}