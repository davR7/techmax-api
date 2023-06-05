import { app } from './app'; 
const { APP_PORT } = process.env;

app.listen({
	port: APP_PORT || 3030
}, (err):void => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
});