import { prisma, hashPassword } from '../utils';
import { createUserInput2 } from '../schemas/userSchemas';

type User = { id?: string } | { email?: string };

export const findOneUser = async (obj: User) => {
	const user = await prisma.user.findUnique({ 
		where: obj 
	});
	return user;
};

export const saveUser = async (values: createUserInput2) => {
	const { fullname, email, password } = values;
	const { hash, salt } = hashPassword(password);
	const user = await prisma.user.create({
		data: { fullname, email, password: hash, salt }
	});
	return user;
};