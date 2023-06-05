import { FastifyReply, FastifyRequest } from 'fastify';
import { createPostInput } from '../schemas/postSchemas';
import { findOnePost, findAllPosts, savePost } from '../services/postService';

const producePost = async (request: FastifyRequest<{Body: createPostInput }>, reply: FastifyReply) => {
	const { title } = request.body;

	const post = await findOnePost(title);
	if (post) 
		return reply.status(400)
			.send({success: false, error: 'post already exists'});

	const newPost = await savePost(request.body);
	return reply.status(201).send({ success: true, data: newPost });
};

const readPosts = async (request: FastifyRequest<{Body: createPostInput }>, reply: FastifyReply) => {
	const posts = await findAllPosts();
	return reply.send({ success: true, data: posts });
};

export default { producePost, readPosts };