import { FastifyInstance } from 'fastify';
import { $ref } from '../schemas/userSchemas';
import authCtl from '../controllers/userController';

async function userRoutes (app: FastifyInstance) {
	app.post('/signup', {
		schema: {
			body: $ref('createUserSchema'),
			response: {
				201: $ref('createUserResSchema')
			}
		}
	}, authCtl.signup);
	
	app.post('/signin', {
		schema: {
			body: $ref('loginSchema'),
			response: {
				200: $ref('loginRespSchema')
			}
		}
	}, authCtl.signin);
}

export default userRoutes;