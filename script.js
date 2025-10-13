// Dados dos produtos (simulando um banco de dados)
const products = [
    {
        id: 1,
        title: "Ferramenta de Comunicação da Voz",
        description: "Com o curso Ferramentas da Comunicação, aprenda a desenvolver sua narrativa, modular sua voz e controlar seu corpo e expressão.",
        price: "06 x R$ 146,36",
        category: "cursos",
        image: "./assets/locucaoVoz.png",
        affiliateLink: "https://adm-emanuelacosta.hotmart.host/product-page-2c539bb1-0f98-403f-b094-c4cf4f5dc2d8?ref=K101297370Y&tio=instagram"
    },
    {
        id: 2,
        title: "Orgonites de Alta Performance",
        description: "Com o Método Sirius, aprenda a criar orgonites de alta performance para harmonização de ambientes.",
        price: "12 x R$ 61,74",
        category: "cursos",
        image: "./assets/mestreOrganites.png",
        affiliateLink: "https://hotmart.com/pt-br/marketplace/produtos/https-metodosirius-com/U76105136N?ref=U102335334F"
    },
    {
        id: 3,
        title: "Curso de Ingles - Pedro Galvão",
        description: "Aprenda inglês de forma prática e eficiente com o professor Pedro Galvão.",
        price: "12 x R$ 61,74",
        category: "cursos",
        image: "./assets/inglesGalvao.png",
        affiliateLink: "https://pedrogalvao.com/?ref=K101640438S"
    }
];

// Elementos DOM
let productsContainer;
let categoryLinks;
let navLinks;
let pageContents;

// Estado atual
let currentCategory = 'todos';
let currentPage = 'home';

// Função para renderizar produtos
function renderProducts(category = 'todos') {
    productsContainer.innerHTML = '';

    const filteredProducts = category === 'todos'
        ? products
        : products.filter(product => product.category === category);

    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p>Nenhum produto encontrado nesta categoria.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price}</div>
                <a href="${product.affiliateLink}" class="buy-button" target="_blank">Comprar Agora</a>
            </div>
        `;

        productsContainer.appendChild(productCard);
    });
}

// Função para mudar de categoria
function changeCategory(category) {
    currentCategory = category;

    // Atualiza a classe ativa nos links de categoria
    categoryLinks.forEach(link => {
        if (link.dataset.category === category) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Renderiza os produtos da categoria selecionada
    renderProducts(category);
}

// Função para mudar de página
function changePage(page) {
    currentPage = page;

    navLinks.forEach(link => {
        if (link.dataset.page === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    pageContents.forEach(content => {
        if (content.id === `${page}-page`) {
            content.classList.remove('hidden');
        } else {
            content.classList.add('hidden');
        }
    });

    // Esconde o menu de categorias se estiver na página 'sobre'
    const categoryAside = document.getElementById('category-aside');
    if (categoryAside) {
        if (page === 'sobre') {
            categoryAside.classList.add('hidden');
        } else {
            categoryAside.classList.remove('hidden');
        }
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Buscar elementos DOM após o carregamento
    productsContainer = document.getElementById('products-container');
    categoryLinks = document.querySelectorAll('.category-link');
    navLinks = document.querySelectorAll('.nav-link');
    pageContents = document.querySelectorAll('.page-content');

    // Event Listeners

    // Navegação por categoria
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            changeCategory(category);
        });
    });

    // Navegação entre páginas
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            changePage(page);
        });
    });

    // Renderizar produtos iniciais
    renderProducts();
});