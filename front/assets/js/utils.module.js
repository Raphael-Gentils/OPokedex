import {
	getAllPokemonsAndDisplay,
	getPopularTenAndDisplay,
} from './pokemons/pokemons.module.js';
import { handleClickTeamMenu } from './teams/teams.module.js';
import { handleClickTypeMenu } from './types/types.module.js';

const app = {
	mainContainer: document.getElementById('app'),
	mainTitle: document.getElementById('main-title'),
	firstSection: document.getElementById('first-app-section'),
	secondSection: document.getElementById('second-app-section'),
	navbar: document.getElementById('navbar_main'),
};

// la méthode por nettoyer le <main>
function cleanMain() {
	app.mainTitle.textContent = '';
	app.firstSection.innerHTML = '';
	app.secondSection.innerHTML = '';
	app.mainTitle.style.color = ``;
	document.querySelector('body').style.background = ``;
}

function cleanSecondSection() {
	app.secondSection.innerHTML = '';
	app.secondSection.classList.remove('is-large', 'title');
	app.secondSection.style.color = '';
}

// la méthode de gestion du menu
function dispatchNavbarListeners() {
	app.navbar
		.querySelector('#nav-item-home')
		.addEventListener('click', getAllPokemonsAndDisplay);
	app.navbar
		.querySelector('#nav-item-type')
		.addEventListener('click', handleClickTypeMenu);
	app.navbar
		.querySelector('#nav-item-leaderboard')
		.addEventListener('click', getPopularTenAndDisplay);
	app.navbar
		.querySelector('#nav-item-team')
		.addEventListener('click', handleClickTeamMenu);
}

// le méthode de gestion des boutons de fermetures des modals
function dispatchCloseBtnEvent() {
	const closeBtns = document.querySelectorAll('.close');
	closeBtns.forEach((btn) =>
		btn.addEventListener('click', (event) => hideModal(event))
	);
}

// la méthode pour fermer les modales
function hideModal(event) {
	event.target.closest('.modal').classList.remove('is-active');
}

export {
	app,
	cleanMain,
	cleanSecondSection,
	dispatchNavbarListeners,
	dispatchCloseBtnEvent,
	hideModal,
};
