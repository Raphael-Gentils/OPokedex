export function notFound(req, res, next) {
	const err = new Error("la ressources demandée n'existe pas");
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

	res.status(statusCode).render(statusCode.toString());
}
