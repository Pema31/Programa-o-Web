const input = document.getElementById("pokemonInput");
const buscarBtn = document.getElementById("buscarBtn");
const resultado = document.getElementById("resultado");
const anteriorBtn = document.getElementById("anterior");
const proximoBtn = document.getElementById("proximo");

let pokemonAtual = 1;

const coresTipos = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    steel: "#B8B8D0",
    normal: "#A8A878"
};

buscarBtn.addEventListener("click", () => {
    const valor = input.value.toLowerCase().trim();

    if (valor !== "") {
        buscarPokemon(valor);
    }
});

anteriorBtn.addEventListener("click", () => {
    if (pokemonAtual > 1) {
        pokemonAtual--;
        buscarPokemon(pokemonAtual);
    }
});

proximoBtn.addEventListener("click", () => {
    pokemonAtual++;
    buscarPokemon(pokemonAtual);
});

async function buscarPokemon(nomeOuId) {
    resultado.innerHTML = "<p>Carregando...</p>";

    try {
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nomeOuId}`
        );

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado");
        }

        const dados = await resposta.json();

        pokemonAtual = dados.id;

        mostrarPokemon(dados);

    } catch (erro) {
        resultado.innerHTML = `<p>${erro.message}</p>`;
    }
}

function mostrarPokemon(pokemon) {
    const nome = pokemon.name;
    const imagem = pokemon.sprites.front_default;
    const tipos = pokemon.types
        .map(tipo => tipo.type.name)
        .join(", ");

    const stats = pokemon.stats
        .map(stat => `
            <p>${stat.stat.name}: ${stat.base_stat}</p>
        `)
        .join("");

    const tipoPrincipal = pokemon.types[0].type.name;
    const cor = coresTipos[tipoPrincipal];

    resultado.innerHTML = `
        <div class="card" style="background:${cor}">
            <h2>${nome} (#${pokemon.id})</h2>
            <img src="${imagem}" alt="${nome}">
            <p><strong>Tipos:</strong> ${tipos}</p>
            ${stats}
        </div>
    `;
}