/*
 * Script principal da Uvateca
 * Gerencia a Sidebar e as Permissões de Acesso (Cargos)
 */

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Abrir/Fechar Sidebar
    const userIconBtn = document.getElementById("user-icon-btn");
    const sidebar = document.getElementById("user-sidebar");

    if (userIconBtn && sidebar) {
        userIconBtn.addEventListener("click", function(event) {
            event.preventDefault(); 
            sidebar.classList.toggle("active");
        });
    }

    // 2. Aplicar permissões ao carregar a página
    atualizarEstadoSidebar();

    // 3. Logout
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
    const userRole = localStorage.getItem('uvatecaRole'); // 'ADMIN', 'FUNCIONARIO' ou 'COMUM'

    const profileLogado = document.getElementById('sidebar-logado');
    const profileDeslogado = document.getElementById('sidebar-deslogado');
    const welcomeText = document.getElementById('welcome-msg-text');
    
    // --- Elementos da Sidebar ---
    // Gerenciais (Exclusivo ADMIN)
    const navDashboard = document.getElementById('nav-dashboard');
    const navGestaoFuncionarios = document.getElementById('nav-gestao-funcionarios');
    const navCadastrarFuncionario = document.getElementById('nav-cadastrar-funcionario');

    // Operacionais (ADMIN e FUNCIONÁRIO)
    const navGestaoLeitores = document.getElementById('nav-gestao-leitores');
    const navAcervo = document.getElementById('nav-acervo');
    const navGestaoEmprestimos = document.getElementById('nav-gestao-emprestimos');
    
    const navCadastrarUsuario = document.getElementById('nav-cadastrar-usuario');
    const navRegistrarLivro = document.getElementById('nav-registrar-livro');
    const navRealizarAluguel = document.getElementById('nav-realizar-aluguel');

    // Públicos
    const navBiblioteca = document.getElementById('nav-biblioteca');
    const navAlugados = document.getElementById('nav-alugados');
    const navLogin = document.getElementById('nav-login');
    const navLogout = document.getElementById('nav-logout');

    if (!profileLogado) return;

    if (userName) {
        // --- LOGADO ---
        profileLogado.style.display = 'block';
        profileDeslogado.style.display = 'none';
        welcomeText.textContent = `Olá, ${userName}`;

        if(navBiblioteca) navBiblioteca.style.display = 'list-item';
        if(navAlugados) navAlugados.style.display = 'list-item';
        if(navLogin) navLogin.style.display = 'none';
        if(navLogout) navLogout.style.display = 'list-item';
        
        // --- REGRA 1: ÁREA OPERACIONAL ---
        // (Leitores, Livros, Empréstimos) -> ADMIN ou FUNCIONARIO
        if (userRole === 'ADMIN' || userRole === 'FUNCIONARIO') {
            if(navGestaoLeitores) navGestaoLeitores.style.display = 'list-item';
            if(navAcervo) navAcervo.style.display = 'list-item';
            if(navGestaoEmprestimos) navGestaoEmprestimos.style.display = 'list-item';
            
            // Legado
            if(navCadastrarUsuario) navCadastrarUsuario.style.display = 'list-item';
            if(navRegistrarLivro) navRegistrarLivro.style.display = 'list-item';
            if(navRealizarAluguel) navRealizarAluguel.style.display = 'list-item';
        } else {
            // ESCONDER SE FOR LEITOR COMUM
            const ops = [
                navGestaoLeitores, navAcervo, navGestaoEmprestimos,
                navCadastrarUsuario, navRegistrarLivro, navRealizarAluguel
            ];
            ops.forEach(el => { if(el) el.style.display = 'none'; });
        }

        // --- REGRA 2: ÁREA GERENCIAL ---
        // (Dashboard, Funcionários) -> APENAS ADMIN
        if (userRole === 'ADMIN') {
            if(navDashboard) navDashboard.style.display = 'list-item';
            if(navGestaoFuncionarios) navGestaoFuncionarios.style.display = 'list-item';
            if(navCadastrarFuncionario) navCadastrarFuncionario.style.display = 'list-item';
        } else {
            // ESCONDER SE FOR FUNCIONARIO OU LEITOR
            const gerencial = [navDashboard, navGestaoFuncionarios, navCadastrarFuncionario];
            gerencial.forEach(el => { if(el) el.style.display = 'none'; });
        }

    } else {
        // --- DESLOGADO ---
        profileLogado.style.display = 'none';
        profileDeslogado.style.display = 'block';
        
        // Esconde TUDO que é restrito
        const todosRestritos = [
            navBiblioteca, navAlugados, 
            navDashboard, navGestaoFuncionarios, navCadastrarFuncionario,
            navGestaoLeitores, navAcervo, navGestaoEmprestimos,
            navCadastrarUsuario, navRegistrarLivro, navRealizarAluguel
        ];
        todosRestritos.forEach(el => { if(el) el.style.display = 'none'; });

        if(navLogin) navLogin.style.display = 'list-item';
        if(navLogout) navLogout.style.display = 'none';
    }
}