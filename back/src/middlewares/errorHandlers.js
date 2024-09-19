export function notFound(req, res, next) {
	const err = new Error("La ressource demandée n'existe pas.");
	err.statusCode = 404;

	next(err);
}

export function catchErrors(fn) {
	return async function (req, res, next) {
		try {
			// méthode du controller
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}

export function errorHandler(err, req, res, next) {
	const statusCode = err.statusCode || 500;

	// Vérifie si on est en mode de développement
	const isProduction = process.env.NODE_ENV === 'production';

	const errorResponse = {
		message: err.message,
		...(isProduction
			? null // En production, on envoie moins de détails
			: { stack: err.stack }), // En développement, on envoie la stack de l'erreur pour plus de clarté
	};

	// Envoi de la réponse JSON
	res.status(statusCode).json({
		status: statusCode,
		error: errorResponse,
	});
}
