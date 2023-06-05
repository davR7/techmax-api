import fJwt from '@fastify/jwt';
import fp from 'fastify-plugin';
import {
	FastifyInstance,
	FastifyRequest,
	FastifyReply
} from 'fastify';

export default fp(async (fastify: FastifyInstance) => {
	fastify.register(fJwt, { secret: process.env.APP_JWT_SECRET });

	fastify.decorate('authenticate', async function (
		request: FastifyRequest,
		reply: FastifyReply
	) {
		try {
			await request.jwtVerify();
		} catch (err) {
			reply.send(err);
		}
	});
});

interface AuthenticateFunction {
	(
		request: FastifyRequest, 
		reply: FastifyReply
	): Promise<void>;
}

declare module 'fastify' {
	export interface FastifyInstance {
		authenticate: AuthenticateFunction
	}
}