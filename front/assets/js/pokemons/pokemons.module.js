import { app, cleanMain, hideModal } from '../utils.module.js';
import {
	getAllPokemons,
	getOnePokemon,
	getMostPopularPkm,
	addVoteToOnePkm,
	removeVoteToOnePkm,
} from './pokemons.api.js';

// la méthode pour récupérer et afficher tous les pokémons
async function getAllPokemonsAndDisplay() {
	const pokemons = await getAllPokemons();
	cleanMain();
	app.firstSection.remove();
	app.mainTitle.textContent = 'Tous les pokémons';
	pokemons.forEach((pokemon) => {
		displayPokemon(pokemon);
	});
}

// la méthode pour afficher chaque pokémon
function displayPokemon(pokemon) {
	// récupération du template
	const pokemonTemplate = document.getElementById('pokemon-list-item-template');
	// on clone le template et on lui passe les données
	const clone = document.importNode(pokemonTemplate.content, true);
	clone.querySelector('.card').dataset.pkmId = pokemon.id;
	clone.querySelector('img').src = `./assets/img/${pokemon.id}.webp`;
	clone.querySelector('p').textContent = `${pokemon.id} - ${pokemon.name}`;
	// listener pour afficher la modale de détails du pokemon
	clone.querySelector('a').addEventListener('click', handleClickModalDetail);
	// on insère le clone dans le DOM
	app.secondSection.appendChild(clone);
}

// la méthode pour afficher la modale de détails d'un pokémon et lui passer les données
async function handleClickModalDetail(event) {
	// on récupère l'id du pokémon dont on veut afficher les détails et on récupère ses données
	const { pkmId } = event.target.closest('.card').dataset;
	const pokemon = await getOnePokemon(pkmId);

	// on distribue les données dans la modale
	const pkm_detail = document.getElementById('pkm_detail');
	pkm_detail.dataset.pkmId = pokemon.id;
	pkm_detail.querySelector(
		'.pkm_name'
	).textContent = `${pokemon.id} - ${pokemon.name}`;
	pkm_detail.querySelector('img').src = `./assets/img/${pokemon.id}.webp`;
	pkm_detail.querySelector('.pkm_votes').textContent = pokemon.votes;

	const typeElement = document.querySelector('.modal_team_types');
	typeElement.innerHTML = 'Types : ';

	pokemon.types.forEach((type) => {
		const typeName = document.createElement('span');
		typeName.textContent = `${type.name} `;
		typeName.style.color = `#${type.color}`;
		typeElement.appendChild(typeName);
	});

	const statsElement = pkm_detail.querySelectorAll('[slot]');
	statsElement.forEach((stat) => {
		pkm_detail.querySelector(`.pokemon-${stat.slot}`).textContent =
			pokemon[stat.slot];
		stat.value = pokemon[stat.slot];
	});
	// on ferme la modale en cliquant à l'extérieur
	pkm_detail
		.querySelector('.modal-background')
		.addEventListener('click', (event) => hideModal(event));

	const heart = pkm_detail.querySelector('.voteBtn');

	if (heart.classList.contains('far')) {
	}

	heart.addEventListener('click', handleClickHeart);

	pkm_detail.classList.add('is-active');
}

// la méthode pour voter pour un pokémon
// quand on clique sur le coeur
// TODO mettre en place l'authentification et vérifier que les pokémons non votés par user aient le coeur vide
async function handleClickHeart(event) {
	const { pkmId } = event.target.closest('#pkm_detail').dataset;

	if (event.target.classList.contains('far')) {
		event.target.classList.toggle('far');
		event.target.classList.toggle('fas');
		event.target.classList.toggle('has-text-danger');

		const pokemon = await addVoteToOnePkm(pkmId);

		pkm_detail.querySelector('.pkm_votes').textContent = pokemon.votes;
		pkm_detail.querySelector('.vote-text').textContent = 'Retirer mon vote';
	} else {
		event.target.classList.toggle('fas');
		event.target.classList.toggle('far');
		event.target.classList.toggle('has-text-danger');

		const pokemon = await removeVoteToOnePkm(pkmId);

		pkm_detail.querySelector('.pkm_votes').textContent = pokemon.votes;
		pkm_detail.querySelector('.vote-text').textContent =
			'Voter pour ce pokémon';
	}
}

// la méthode pour récupérer et afficher les pokémons les plus populaires
async function getPopularTenAndDisplay() {
	const pokemons = await getMostPopularPkm();
	cleanMain();
	app.firstSection.remove();
	app.mainTitle.textContent = 'Les 10 pokémons les plus populaires';
	pokemons.forEach((pokemon) => {
		displayPokemon(pokemon);
	});
}

export {
	getAllPokemonsAndDisplay,
	displayPokemon,
	handleClickModalDetail,
	handleClickHeart,
	getPopularTenAndDisplay,
};
