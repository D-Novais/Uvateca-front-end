/*
 * Lógica da Página "Minha Biblioteca"
 */

document.addEventListener("DOMContentLoaded", function() {
    carregarLivrosDaBiblioteca();
});

let bibliotecaGlobal = [];
let livroAtualIndex = null; 

function carregarLivrosDaBiblioteca() {
    const listaBiblioteca = document.getElementById("biblioteca-list");
    
    // Recupera a lista do armazenamento
    bibliotecaGlobal = JSON.parse(localStorage.getItem("minhaBiblioteca")) || [];

    if (bibliotecaGlobal.length === 0) {
        listaBiblioteca.innerHTML = "<p style='color:white'>Você ainda não salvou nenhum livro.</p>";
        return;
    }

    listaBiblioteca.innerHTML = ""; 

    bibliotecaGlobal.forEach((livro, index) => {
        // CORREÇÃO 1: Verifica todos os nomes possíveis para a imagem e categoria
        // O index.html salva como 'imagem' e 'categoria', mas o banco usa 'imagemUrl' e 'genero'.
        // Isso garante que funcione independente de como foi salvo.
        const capa = livro.imagem || livro.imagemUrl || "https://via.placeholder.com/100x150?text=Capa";
        const categoria = livro.categoria || livro.genero || "Geral";
        
        // CORREÇÃO 2: Adicionei o onerror na tag <img>. 
        // Se o link da imagem estiver quebrado, ele troca automaticamente pelo placeholder roxo.
        const itemHTML = `
            <article class="saved-book-item">
                <div class="saved-book-cover">
                    <img src="${capa}" alt="Capa" onerror="this.src='https://via.placeholder.com/100x150/4B0080/FFFFFF?text=Sem+Capa';">
                </div>
                <div class="saved-book-info">
                    <h3>${livro.titulo}</h3>
                    <p class="category">${categoria}</p>
                </div>
                <div class="saved-book-actions">
                    <button class="btn btn-primary" onclick="abrirModalBiblioteca(${index})">Ver Página</button>
                    <button class="btn btn-secondary" onclick="removerItemDireto(${index})">Remover</button>
                </div>
            </article>
        `;
        listaBiblioteca.innerHTML += itemHTML;
    });
}

// --- FUNÇÕES DO MODAL ---

function abrirModalBiblioteca(index) {
    livroAtualIndex = index;
    const livro = bibliotecaGlobal[index];
    
    // Mapeamento seguro para evitar "undefined"
    const imgCapa = livro.imagem || livro.imagemUrl || "https://via.placeholder.com/300x450/4B0080/FFFFFF?text=Capa";
    const genero = livro.categoria || livro.genero || "Geral";
    
    document.getElementById('modal-img').src = imgCapa;
    // Adiciona segurança no modal também
    document.getElementById('modal-img').onerror = function() { 
        this.src = 'https://via.placeholder.com/300x450/4B0080/FFFFFF?text=Sem+Capa'; 
    };

    document.getElementById('modal-titulo').innerText = livro.titulo;
    document.getElementById('modal-autor').innerText = "Autor: " + (livro.autor || "N/A");
    document.getElementById('modal-categoria').innerText = genero;
    document.getElementById('modal-ano').innerText = "Ano: " + (livro.ano_publicacao || "N/A");
    document.getElementById('modal-isbn').innerText = "ISBN: " + (livro.id || livro.isbn || "N/A");
    document.getElementById('modal-edicao').innerText = "Edição: " + (livro.edicao || "N/A");
    document.getElementById('modal-qtd').innerText = "Disponíveis: " + (livro.quantidade_disponivel || "?");
    document.getElementById('modal-sinopse').innerText = livro.sinopse || "Sinopse não informada.";

    document.getElementById('modalLivro').style.display = 'flex';
}

function fecharModal(event) {
    document.getElementById('modalLivro').style.display = 'none';
}

function irParaContato() {
    window.location.href = "about.html";
}

function removerDoModal() {
    if (livroAtualIndex === null) return;
    
    if (confirm("Remover este livro da sua lista?")) {
        removerLogica(livroAtualIndex);
        fecharModal();
    }
}

function removerItemDireto(index) {
    if (confirm("Remover este livro da sua lista?")) {
        removerLogica(index);
    }
}

function removerLogica(index) {
    bibliotecaGlobal.splice(index, 1); 
    localStorage.setItem("minhaBiblioteca", JSON.stringify(bibliotecaGlobal)); 
    carregarLivrosDaBiblioteca(); 
}