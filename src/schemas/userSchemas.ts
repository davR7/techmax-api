import z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
	fullname: z.string().min(6),
	email: z.string().email(),
	password: z.string().min(5)
};

const createUserSchema = z.object({
	...userCore,
	passwordConfirm: z.string().min(5)
});

const createUserResSchema = z.object({
	success: z.boolean(),
	data: z.object({
		id: z.string(),
		...userCore,
		salt: z.string(),
		createdAt: z.string(),
		updatedAt: z.string()
	})
});

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

const loginRespSchema = z.object({
	accessToken: z.string()
});

export type createUserInput = z.infer<typeof createUserSchema>;
export type createUserInput2 = Omit<createUserInput, 'passwordConfirm'>;

export type loginInput = z.infer<typeof loginSchema>;

export const { schemas: UserJsonSchemas, $ref } = buildJsonSchemas({
	createUserSchema,
	createUserResSchema,
	loginSchema,
	loginRespSchema
}, { $id: 'UserJsonSchemas' });