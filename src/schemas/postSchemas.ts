import z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const postCore = {
	title: z.string(),
	content: z.string(),
	authorId: z.string()
};

const createPostSchema = z.object({
	...postCore
});

const createPostRespSchema = z.object({
	success: z.boolean(),
	data: z.object({
		id: z.string(),
		...postCore,
		createdAt: z.date(),
		updatedAt: z.date()
	})
});

export type createPostInput = z.infer<typeof createPostSchema>;

export const { schemas: postJsonSchemas, $ref } = buildJsonSchemas({
	createPostSchema,
	createPostRespSchema
}, { $id: 'PostJsonSchemas' });