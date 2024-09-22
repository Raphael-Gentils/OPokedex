import { app, cleanMain, hideModal } from '../utils.module.js';
import {
	getAllTeams,
	getOneTeam,
	createNewTeam,
	updateTeam,
	destroyTeam,
} from './teams.api.js';

// la méthode pour afficher toutes les équipes
async function handleClickTeamMenu() {
	// vide le mainContainer et rajoute la première section
	cleanMain();
	app.mainTitle.textContent = 'Toutes les équipes';
	app.mainTitle.after(app.firstSection);

	// récupère toutes les équipes (un tableau)
	const teams = await getAllTeams();

	// pour chaque équipe du tableau on appelle la méthode qui permet de l'afficher dans le mainContainer
	teams.forEach(displayTeam);

	// ajouter une div pour créer une nouvelle équipe
	const teamTemplate = document.getElementById('team-list-item');
	const clone = document.importNode(teamTemplate.content, true);

	clone.querySelector('.team-name').textContent = 'Créer une nouvelle équipe';
	clone.querySelector('.team-description').textContent =
		"Lancez-vous à l'aventure en créant une nouvelle équipe";

	const icons = clone.querySelectorAll('.icon');
	icons.forEach((icon) => icon.remove());

	const btn = clone.querySelector('.btnModalTeam');
	btn.textContent = 'Attrapez-les tous !';

	btn.addEventListener('click', displayNewTeamModal);

	app.firstSection.appendChild(clone);
}

function displayNewTeamModal() {
	const newTeamModal = document.getElementById('newTeam_modal');
	newTeamModal.classList.add('is-active');

	const form = newTeamModal.querySelector('form');

	form.addEventListener('submit', async (event) => {
		try {
			await handleNewTeamForm(event);
		} catch (error) {
			console.log(error);
		}
	});
}

// la méthode pour gérer le formulaire de création d'équipe
// TODO chercher pourquoi la première équipe est créée une fois, la deuxième deux fois et la liste des équipes affichée deux fois... (voir peut-être dans js)
async function handleNewTeamForm(event) {
	event.preventDefault();

	const form = event.target;

	const formData = new FormData(form);
	const data = Object.fromEntries(formData);

	if (data.name) {
		const newTeam = await createNewTeam(data);

		if (newTeam instanceof Error) {
			throw newTeam;
		}

		displayTeam(newTeam);

		form.reset();

		return hideModal(event);
	}

	throw new Error('something unexpected just arrived');
}

// la méthode pour supprimer une équipe
async function trashTeam(event) {
	if (confirm('Etes-vous sur de vouloir supprimer cette équipe ?')) {
		const team = event.target.closest('.container');
		const teamId = team.dataset.teamId;

		await destroyTeam(teamId);

		team.remove();
	}
}

function showEditTeamForm(event) {
	event.target.nextElementSibling.classList.remove('is-hidden');
	event.target.classList.add('is-hidden');
}

async function handleUpdateTeamForm(event) {
	event.preventDefault();

	const teamId = event.target.closest('.container').dataset.teamId;
	const form = event.target;

	const formData = Object.fromEntries(new FormData(form));

	const updatedTeam = await updateTeam(teamId, formData);

	if (formData.name) {
		const newName = updatedTeam.name;
		form.previousElementSibling.textContent = newName;
	} else if (formData.description) {
		const newDescription = updatedTeam.description;
		form.previousElementSibling.textContent = newDescription;
	}

	form.classList.add('is-hidden');
	form.previousElementSibling.classList.remove('is-hidden');
}

function displayTeam(team) {
	// on récupère le template des teams et on le clone
	const teamTemplate = document.getElementById('team-list-item');
	const clone = document.importNode(teamTemplate.content, true);

	clone.querySelector('.container').dataset.teamId = team.id;

	clone.querySelector('.team-name').textContent = team.name;
	clone
		.querySelector('.team-name')
		.addEventListener('dblclick', showEditTeamForm);
	clone
		.querySelector('.team-name-form')
		.addEventListener('submit', handleUpdateTeamForm);

	clone.querySelector('.team-remove-btn').addEventListener('click', trashTeam);

	clone.querySelector('.team-description').textContent = team.description;
	clone
		.querySelector('.team-description')
		.addEventListener('dblclick', showEditTeamForm);
	clone
		.querySelector('.team-description-form')
		.addEventListener('submit', handleUpdateTeamForm);

	const imgContainer = clone.querySelector('.imgContainer');

	if (team.pokemons) {
		team.pokemons.forEach((pokemon) => {
			const img = document.createElement('img');
			const figure = document.createElement('figure');
			figure.classList.add('image', 'is-64x64');
			img.src = `./assets/img/${pokemon.id}.webp`;
			img.classList.add('is-rounded');
			figure.appendChild(img);
			imgContainer.appendChild(figure);
		});
	}

	const btn = clone.querySelector('.btnModalTeam');
	btn.addEventListener('click', handleClickBtnModalTeam);

	app.firstSection.appendChild(clone);
}

// au click on affiche la modale de détails de l'équipe
async function handleClickBtnModalTeam(event) {
	const { teamId } = event.target.closest('.card').dataset;

	const teamModal = document.getElementById('team_modal');

	const team = await getOneTeam(teamId);

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

	teamModal
		.querySelector('.modal-background')
		.addEventListener('click', (event) => hideModal(event));

	teamModal.classList.add('is-active');
}

export {
	handleClickTeamMenu,
	displayNewTeamModal,
	handleNewTeamForm,
	trashTeam,
	displayTeam,
	handleClickBtnModalTeam,
};
