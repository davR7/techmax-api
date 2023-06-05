import { createPostInput } from '../schemas/postSchemas';
import { prisma } from '../utils';

export const findAllPosts = async () => {
	const post = await prisma.post.findMany({
		include: {
			author: {
				select: { id: true, fullname: true }
			}
		}
	});
	return post;
};

export const findOnePost = async (title: string) => {
	const post = await prisma.post.findUnique({ 
		where: { title } 
	});
	return post;
};

export const savePost = async (values: createPostInput) => {
	const post = await prisma.post.create({
		data: { ...values }
	});
	return post;
};