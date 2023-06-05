import { FastifyInstance } from 'fastify';
import postCtl from '../controllers/postController';
import { $ref } from '../schemas/postSchemas';

async function postRoutes (app: FastifyInstance) {
	app.addHook('onRequest', app.authenticate);
	
	app.post('/posts', {
		schema: {
			body: $ref('createPostSchema'),
			response: {
				201: $ref('createPostRespSchema')
			}
		}
	}, postCtl.producePost);
	
	app.get('/posts', postCtl.readPosts);
}

export default postRoutes;