/*
 * Lógica de Abas/Seleção para o Dashboard
 * Inclui LAZY LOADING para o segundo relatório (lucros)
 */

document.addEventListener("DOMContentLoaded", function() {
    
    const tabButtons = document.querySelectorAll(".dashboard-tab");
    const tabPanes = document.querySelectorAll(".dashboard-pane");

    // Função que mostra a aba correta
    function showTab(targetId) {
        // Esconde todos os painéis e desativa todos os botões
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        // Ativa o painel e o botão correspondente
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
            targetPane.classList.add('active');
            document.querySelector(`.dashboard-tab[data-target="${targetId}"]`).classList.add('active');

            // --- LÓGICA DE LAZY LOADING (NOVA) ---
            const iframe = targetPane.querySelector('iframe');
            const dataSrc = iframe ? iframe.getAttribute('data-src') : null;

            // Verifica se tem data-src E se o src ainda está vazio
            if (dataSrc && !iframe.getAttribute('src')) {
                // MOVE o valor de data-src para src, forçando o navegador a carregar
                iframe.setAttribute('src', dataSrc);
                // Opcional: remove a mensagem de "carregando"
                const loadingMessage = targetPane.querySelector('p');
                if (loadingMessage) {
                    loadingMessage.style.display = 'none';
                }
            }
        }
    }
    
    // Adiciona o ouvinte de clique em todos os botões
    tabButtons.forEach(button => {
        button.addEventListener("click", function() {
            const targetId = button.getAttribute("data-target");
            showTab(targetId);
        });
    });

    // Garante que o primeiro painel seja exibido e ativado ao carregar
    if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active'); // Ativa o primeiro botão
        showTab(tabButtons[0].getAttribute("data-target")); // Mostra o primeiro painel (Multas)
    }
});