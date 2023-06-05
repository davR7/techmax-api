import './config/dotenv';
import fastify, { FastifyError, FastifyInstance, 
	FastifyReply, FastifyRequest } from 'fastify';
import { errors } from './config/constants';
import jsonSchemas from './schemas';
import authUser from './plugins/authUser';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';

const app: FastifyInstance = fastify({
	logger: true
});

for (const schema of jsonSchemas) {
	app.addSchema(schema);
}

app.register(authUser);
app.register(userRoutes);
app.register(postRoutes);

app.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
	app.log.debug(`Route not found ${request.method}:${request.raw.url}`);

	reply.status(404).send({
		statusCode: 404,
		error: errors.NOT_FOUND,
		message: `Route not found ${request.method}:${request.raw.url}`
	});
});

app.setErrorHandler((err: FastifyError,request: FastifyRequest, reply: FastifyReply) => {
	app.log.debug(`Request url: ${request.raw.url}`);
	app.log.debug(`Request body: ${request.body}`);
	app.log.error(`Error occurred: ${err}`);

	const { INT_SERV_ERR, INT_SERV_ERR_MSG } = errors;

	const code = err.statusCode ?? 500;
	const mode = process.env.NODE_ENV !== 'development';
	const typeError = mode ? INT_SERV_ERR : err.name;
	const msgError = mode ? INT_SERV_ERR_MSG : err.message;

	reply.status(code).send({
		statusCode: code,
		error: typeError,
		message: msgError
	});
});

export { app };