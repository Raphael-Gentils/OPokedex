import { api } from './api.js';

const app = {
	mainContainer: document.getElementById('app'),
	mainTitle: document.getElementById('main-title'),
	firstSection: document.getElementById('first-app-section'),
	secondSection: document.getElementById('second-app-section'),
	navbar: document.getElementById('navbar_main'),

	// à lancer quand le DOM est chargé
	init() {
		app.dispatchNavbarListeners();
		app.dispatchCloseBtnEvent();
		app.getAllPokemonsAndDisplay();
	},

	// la méthode por nettoyer le <main>
	cleanMain() {
		app.mainTitle.textContent = '';
		app.firstSection.innerHTML = '';
		app.secondSection.innerHTML = '';
		app.mainTitle.style.color = ``;
		document.querySelector('body').style.background = ``;
	},

	cleanSecondSection() {
		app.secondSection.innerHTML = '';
		app.secondSection.classList.remove('is-large', 'title');
		app.secondSection.style.color = '';
	},

	// la méthode de gestion du menu
	dispatchNavbarListeners() {
		app.navbar
			.querySelector('#nav-item-home')
			.addEventListener('click', app.getAllPokemonsAndDisplay);
		app.navbar
			.querySelector('#nav-item-type')
			.addEventListener('click', app.handleClickTypeMenu);
		app.navbar
			.querySelector('#nav-item-team')
			.addEventListener('click', app.handleClickTeamMenu);
	},
	// le méthode de gestion des boutons de fermetures des modals
	dispatchCloseBtnEvent() {
		const closeBtns = document.querySelectorAll('.close');
		closeBtns.forEach((btn) =>
			btn.addEventListener('click', app.handleClickCloseModal)
		);
	},

	// la méthode pour fermer les modales
	handleClickCloseModal(event) {
		event.target.closest('.modal').classList.remove('is-active');
	},

	// la méthode pour récupérer et afficher tous les pokémons
	async getAllPokemonsAndDisplay() {
		const pokemons = await api.fetchAllPokemons();
		app.cleanMain();
		app.firstSection.remove();
		app.mainTitle.textContent = 'Tous les pokémons';
		pokemons.forEach((pokemon) => {
			app.displayPokemon(pokemon);
		});
	},

	// la méthode pour afficher chaque pokémon
	displayPokemon(pokemon) {
		// récupération du template
		const pokemonTemplate = document.getElementById(
			'pokemon-list-item-template'
		);
		// on clone le template et on lui passe les données
		const clone = document.importNode(pokemonTemplate.content, true);
		clone.querySelector('.card').dataset.pkmId = pokemon.id;
		clone.querySelector('img').src = `./assets/img/${pokemon.id}.webp`;
		clone.querySelector('p').textContent = `${pokemon.id} - ${pokemon.name}`;
		// listener pour afficher la modale de détails du pokemon
		clone
			.querySelector('a')
			.addEventListener('click', app.handleClickModalDetail);
		// on insère le clone dans le DOM
		app.secondSection.appendChild(clone);
	},

	// la méthode pour afficher la modale de détails d'un pokémon et lui passer les données
	async handleClickModalDetail(event) {
		// on récupère l'id du pokémon dont on veut afficher les détails et on récupère ses données
		const { pkmId } = event.target.closest('.card').dataset;
		const pokemon = await api.fetchOnePokemon(pkmId);

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
			.addEventListener('click', app.handleClickCloseModal);

		const heart = pkm_detail.querySelector('.voteBtn');

		if (heart.classList.contains('far')) {
		}

		heart.addEventListener('click', app.handleClickHeart);

		pkm_detail.classList.add('is-active');
	},

	// la méthode pour voter pour un pokémon
	// quand on vote le coeur
	async handleClickHeart(event) {
		const { pkmId } = event.target.closest('#pkm_detail').dataset;

		if (event.target.classList.contains('far')) {
			event.target.classList.toggle('far');
			event.target.classList.toggle('fas');
			event.target.classList.toggle('has-text-danger');

			const pokemon = await api.addVoteToOnePkm(pkmId);

			pkm_detail.querySelector('.pkm_votes').textContent = pokemon.votes;
			pkm_detail.querySelector('.vote-text').textContent = 'Retirer mon vote';
		} else {
			event.target.classList.toggle('fas');
			event.target.classList.toggle('far');
			event.target.classList.toggle('has-text-danger');

			const pokemon = await api.removeVoteToOnePkm(pkmId);

			pkm_detail.querySelector('.pkm_votes').textContent = pokemon.votes;
			pkm_detail.querySelector('.vote-text').textContent =
				'Voter pour ce pokémon';
		}
	},

	// la méthode pour afficher tous les types quand on clique sur le bouton type du menu
	async handleClickTypeMenu() {
		// vide le mainContainer et rajoute la première section
		app.cleanMain();
		app.mainTitle.textContent = 'Tous les types';
		app.mainTitle.after(app.firstSection);

		// récupère tous les types (un tableau)
		const types = await api.fetchAllTypes();
		// pour chaque type du tableau on appelle la méthode qui permet de l'afficher dans le mainContainer
		types.forEach(app.displayTypeBtn);
	},

	displayTypeBtn(type) {
		// on récupère le template des types et on le clone
		const typeTemplate = document.getElementById('types-list-item-template');
		const clone = document.importNode(typeTemplate.content, true);

		// on sélectionne le bouton auquel on va passer les données du type
		const btn = clone.querySelector('.button');
		btn.textContent = type.name;
		btn.style.backgroundColor = `#${type.color}`;
		btn.dataset.typeId = type.id;

		// au click sur le type, on appelle la méthode pour afficher les pokémons de ce type
		btn.addEventListener('click', app.handleClickTypeBtn);

		// on insère le clone dans le DOM
		app.firstSection.appendChild(clone);
	},

	async handleClickTypeBtn(event) {
		const { typeId } = event.target.dataset;
		const type = await api.fetchOneType(typeId);

		app.firstSection.after(app.mainTitle);
		app.mainTitle.textContent = `Les pokémons de type ${type.name}`;
		app.mainTitle.style.color = `#${type.color}`;
		document.querySelector(
			'body'
		).style.background = `radial-gradient(ellipse at bottom, #${type.color}, transparent)`;
		app.cleanSecondSection();

		if (!type.pokemons.length) {
			app.secondSection.textContent = 'Pas de pokémon de ce type...';
			app.secondSection.classList.add('is-large', 'title');
			app.secondSection.style.color = 'white';
		}

		type.pokemons.forEach((pokemon) => app.displayPokemon(pokemon));
	},

	// la méthode pour afficher toutes les équipes quand on clique sur le bouton team du menu
	async handleClickTeamMenu() {
		// vide le mainContainer et rajoute la première section
		app.cleanMain();
		app.mainTitle.textContent = 'Toutes les équipes';
		app.mainTitle.after(app.firstSection);

		// récupère toutes les équipes (un tableau)
		const teams = await api.fetchAllTeams();

		// pour chaque équipe du tableau on appelle la méthode qui permet de l'afficher dans le mainContainer
		teams.forEach(app.displayTeam);
	},

	displayTeam(team) {
		// on récupère le template des teams et on le clone
		const teamTemplate = document.getElementById('team-list-item');
		const clone = document.importNode(teamTemplate.content, true);

		clone.querySelector('.team-name').textContent = team.name;
		clone.querySelector('.team-description').textContent = team.description;

		const imgContainer = clone.querySelector('.imgContainer');

		team.pokemons.forEach((pokemon) => {
			const img = document.createElement('img');
			const figure = document.createElement('figure');
			figure.classList.add('image', 'is-64x64');
			img.src = `./assets/img/${pokemon.id}.webp`;
			img.classList.add('is-rounded');
			figure.appendChild(img);
			imgContainer.appendChild(figure);
		});

		const btn = clone.querySelector('.btnModalTeam');
		btn.dataset.teamId = team.id;

		btn.addEventListener('click', app.handleClickBtnModalTeam);

		app.firstSection.appendChild(clone);
	},

	async handleClickBtnModalTeam(event) {
		const { teamId } = event.target.dataset;
		const teamModal = document.getElementById('team_modal');

		const team = await api.fetchOneTeam(teamId);

		teamModal.querySelector('.team-name').textContent = team.name;
		teamModal.querySelector('.team-description').textContent = team.description;

		document.getElementById('tbody_team').innerHTML = '';
		const pkmTeamTmp = document.getElementById('template-row-table');
		team.pokemons.forEach((pokemon) => {
			const clone = document.importNode(pkmTeamTmp.content, true);
			const stats = clone.querySelectorAll('[slot]');
			stats.forEach((stat) => {
				if (stat.slot === 'types') {
					pokemon.types.forEach((type) => {
						clone.querySelector(
							`[slot=${stat.slot}]`
						).textContent += `${type.name} `;
					});
				} else {
					clone.querySelector(`[slot=${stat.slot}]`).textContent =
						pokemon[stat.slot];
				}
			});
			document.getElementById('tbody_team').appendChild(clone);
		});
		teamModal.classList.add('is-active');
	},
};

document.addEventListener('DOMContentLoaded', app.init);
