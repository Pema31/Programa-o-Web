const produtos = [
    { nome: "Mouse", preco: 50.00, categoria: "eletrônicos" },
    { nome: "Teclado", preco: 120.00, categoria: "eletrônicos" },
    { nome: "Caderno", preco: 25.00, categoria: "papelaria" },
    { nome: "Monitor", preco: 800.00, categoria: "eletrônicos" },
    { nome: "Caneta", preco: 2.50, categoria: "papelaria" }
];

const container = document.getElementById('container');
const btnFiltrar = document.getElementById('btnFiltrar');
const btnLimpar = document.getElementById('btnLimpar');

function renderizarCards() {
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.dataset.categoria = produto.categoria;

        card.innerHTML = `
            <h3>${produto.nome}</h3>
            <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
            <p><small>${produto.categoria}</small></p>
        `;

        container.appendChild(card);
    });
}

renderizarCards();

btnFiltrar.addEventListener('click', () => {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        if (card.dataset.categoria !== 'eletrônicos') {
            card.classList.toggle('escondido');
        }
    });

    const ativo = btnFiltrar.textContent === "Mostrar só eletrônicos";
    btnFiltrar.textContent = ativo ? "Mostrar todos" : "Mostrar só eletrônicos";
});

btnLimpar.addEventListener('click', () => {
    container.innerHTML = '';
});