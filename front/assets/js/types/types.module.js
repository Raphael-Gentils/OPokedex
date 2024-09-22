import { displayPokemon } from '../pokemons/pokemons.module.js';
import { app, cleanMain, cleanSecondSection } from '../utils.module.js';
import { getAllTypes, getOneType } from './types.api.js';

// la méthode pour afficher tous les types quand on clique sur le bouton type du menu
async function handleClickTypeMenu() {
	// vide le mainContainer et rajoute la première section
	cleanMain();
	app.mainTitle.textContent = 'Tous les types';
	app.mainTitle.after(app.firstSection);

	// récupère tous les types (un tableau)
	const types = await getAllTypes();
	// pour chaque type du tableau on appelle la méthode qui permet de l'afficher dans le mainContainer
	types.forEach(displayType);
}

function displayType(type) {
	// on récupère le template des types et on le clone
	const typeTemplate = document.getElementById('types-list-item-template');
	const clone = document.importNode(typeTemplate.content, true);

	// on sélectionne le bouton auquel on va passer les données du type
	const btn = clone.querySelector('.button');
	btn.textContent = type.name;
	btn.style.backgroundColor = `#${type.color}`;
	btn.dataset.typeId = type.id;

	// au click sur le type, on appelle la méthode pour afficher les pokémons de ce type
	btn.addEventListener('click', handleClickType);

	// on insère le clone dans le DOM
	app.firstSection.appendChild(clone);
}

async function handleClickType(event) {
	const { typeId } = event.target.dataset;
	const type = await getOneType(typeId);

	app.firstSection.after(app.mainTitle);
	app.mainTitle.textContent = `Les pokémons de type ${type.name}`;
	app.mainTitle.style.color = `#${type.color}`;
	document.querySelector(
		'body'
	).style.background = `radial-gradient(ellipse at bottom, #${type.color}, transparent)`;
	cleanSecondSection();

	if (!type.pokemons.length) {
		app.secondSection.textContent = 'Pas de pokémon de ce type...';
		app.secondSection.classList.add('is-large', 'title');
		app.secondSection.style.color = 'white';
	}

	type.pokemons.forEach((pokemon) => displayPokemon(pokemon));
}

export { handleClickTypeMenu, displayType, handleClickType };
