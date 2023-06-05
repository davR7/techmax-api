import { FastifyReply, FastifyRequest } from 'fastify';
import { createUserInput, loginInput } from '../schemas/userSchemas';
import { findOneUser, saveUser } from '../services/userService';
import { verifyPassword } from '../utils';

const signup = async (request: FastifyRequest<{Body: createUserInput }>, reply: FastifyReply) => {
	const { passwordConfirm, ...rest } = request.body;
	
	if (rest.password !== passwordConfirm)
		return reply.status(400)
			.send({ error: 'confirmPassword does not match the password.' });

	const userExists = await findOneUser({ email: rest.email });
	if (userExists) 
		return reply.status(400)
			.send({success: false, error: 'user already exists'});

	const user = await saveUser(rest);
	return reply.status(201).send({ success: true, data: user });
};

const signin = async (request: FastifyRequest<{Body: loginInput}>, reply: FastifyReply) => {
	const { email, password } = request.body;

	const user = await findOneUser({ email });
	if (!user)
		return reply.status(400)
			.send({ success: false, error: 'user not found' });

	const correctPassword = await verifyPassword({
		candidatePassword: password,
		hash: user.password,
		salt: user.salt
	});

	if (correctPassword) {
		const { id, fullname, email } = user;
		const token = await reply.jwtSign(
			{ id, fullname, email }
		);
		return reply.send({ accessToken: token });
	}

	return reply.status(400).send({ 
		success: false, error: 'incorrect password' 
	});
};

export default { signin, signup };