/*
 * Script da funcionalidade "Minha Biblioteca"
 * Usa o localStorage do navegador para salvar e carregar livros.
 */

document.addEventListener("DOMContentLoaded", function() {
    
    // --- Lógica da Página de Detalhes ---
    const btnSalvar = document.getElementById("btn-salvar-biblioteca");
    if (btnSalvar) {
        btnSalvar.addEventListener("click", salvarLivroNaBiblioteca);
    }

    // --- Lógica da Página Minha Biblioteca ---
    const listaBiblioteca = document.getElementById("biblioteca-list");
    if (listaBiblioteca) {
        carregarLivrosDaBiblioteca();
    }
});

/**
 * Pega os dados do livro da página de detalhes e salva no localStorage.
 */
function salvarLivroNaBiblioteca(event) {
    event.preventDefault(); 
    const containerLivro = document.getElementById("dados-livro-detalhe");

    const livro = {
        id: containerLivro.dataset.id,
        titulo: containerLivro.dataset.titulo,
        categoria: containerLivro.dataset.categoria,
        imagem: containerLivro.dataset.imagem,
        // Salva a URL completa do livro para o link
        url: window.location.pathname 
    };

    let biblioteca = JSON.parse(localStorage.getItem("minhaBiblioteca")) || [];
    const livroJaExiste = biblioteca.some(b => b.id === livro.id);

    if (livroJaExiste) {
        alert("Este livro já está na sua biblioteca.");
    } else {
        biblioteca.push(livro);
        localStorage.setItem("minhaBiblioteca", JSON.stringify(biblioteca));
        alert("Livro salvo na sua biblioteca!");
    }
}

/**
 * Lê os livros do localStorage e os exibe na página 'minha-biblioteca.html'
 */
function carregarLivrosDaBiblioteca() {
    const listaBiblioteca = document.getElementById("biblioteca-list");
    let biblioteca = JSON.parse(localStorage.getItem("minhaBiblioteca")) || [];

    if (biblioteca.length === 0) {
        listaBiblioteca.innerHTML = "<p>Você ainda não salvou nenhum livro.</p>";
        return;
    }

    listaBiblioteca.innerHTML = ""; 

    // --- ESTA É A MUDANÇA ---
    // Agora ele cria o novo layout de "lista"
    biblioteca.forEach(livro => {
        const itemHTML = `
            <article class="saved-book-item">
                <div class="saved-book-cover">
                    <img src="${livro.imagem}" alt="Capa ${livro.titulo}">
                </div>
                <div class="saved-book-info">
                    <h3>${livro.titulo}</h3>
                    <p class="category">${livro.categoria}</p>
                </div>
                <div class="saved-book-actions">
                    <a href="${livro.url}" class="btn btn-primary">Ver Página</a>
                    <a href="#" class="btn btn-secondary">Remover</a>
                </div>
            </article>
        `;
        listaBiblioteca.innerHTML += itemHTML;
    });
}