const poke_container = document.getElementById("poke-container");
const pokemon_count = 150;
const colors = {
    bug : '#f8d5a3',
    fire : '#fddfdf',
    rock : '#d5d5d4',
    grass : '#defde0',
    water : '#def3fd',
    fairy : '#fceaff',
    ground : '#f4e7da',
    poison : '#98d7a5',
    dragon : '#97b3e6',
    flying : '#f5f5f5',
    normal : '#f5f5f5',
    electric : '#fcf7d',
    psychic : '#eaeda1',
    fighting: '#e6e0d4'
}

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
    for(let i = 1; i < pokemon_count; i++) {
       await getPokemon(i); // returns promise
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
    let pokemonId = pokemon.id;

    let stringId = pokemonId.toString().padStart(3, '0');

    let capitalizeFirst = pokemon.name.charAt(0).toUpperCase();
    let restOfName = pokemon.name.slice(1);
    let pokemonName = capitalizeFirst + restOfName;
    
    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];

    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');
    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML =
    `
        <div class="img-container"> 
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${stringId}.png" alt="">
        </div>
        <div class="info">
            <span class="number">#${stringId}</span>
            <h3 class="name">${pokemonName}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

    pokemonEl.innerHTML = pokemonInnerHTML;
    poke_container.appendChild(pokemonEl);
}

fetchPokemons();