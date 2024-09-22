import { getAllPokemonsAndDisplay } from './pokemons/pokemons.module.js';
import {
	dispatchNavbarListeners,
	dispatchCloseBtnEvent,
} from './utils.module.js';

// à lancer quand le DOM est chargé
function init() {
	dispatchNavbarListeners();
	dispatchCloseBtnEvent();
	getAllPokemonsAndDisplay();
}

document.addEventListener('DOMContentLoaded', init);
