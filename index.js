const helpers = require('./helpers'),
	PATH = './dataStore.json';

function main(passedArgs) {
	const [ , , operation, ...options] = passedArgs,
	optionsObject = helpers.parseArgs(options);

	helpers.createFile(PATH);
	switch (operation) {
		case 'add':
			helpers.add(PATH, optionsObject);
			break;

		case 'edit':
			helpers.edit(PATH, optionsObject);
			break;

		case 'del':
			helpers.del(PATH, optionsObject);
			break;

		case 'check':
			helpers.check(PATH, optionsObject);
			break;

		case 'uncheck':
			helpers.uncheck(PATH, optionsObject);
			break;

		case 'list':
			helpers.list(PATH, optionsObject);
			break;

		default:
			break;
	}
}

main(process.argv);