const fs = require('fs');

function createFile(PATH) {
	if (!fs.existsSync(PATH)) {
		fs.writeFileSync(PATH, "[]");
	}
}

function parseArgs(options) {
	const parsedArgs = options.reduce((cum, el, index, arr) => {
		const [key, value] = el.split('=');
		cum[key] = value;
		return cum;
	}, {});

	return parsedArgs;
}

function add(PATH, args) {
	const todoArray = readFile(PATH),
		lastItem = todoArray[todoArray.length -1],
		id = lastItem ? lastItem.id + 1 : todoArray.length + 1;

	args = { id: id, ...args, checked: false };
	todoArray.push(args);

	writeToFile(PATH, todoArray);
	console.log(`Task added to the list!`);
}

function edit(PATH, args) {
	const todoArray = readFile(PATH);

	const updateTodo = todoArray.map((task) => {
		if (task.id == args.id) {
			return { ...task, title: args.title, body: args.body };
		}

		return task;
	});

	writeToFile(PATH, updateTodo);
	console.log(`Successfully edited the task.`);
}

function del(PATH, args) {
	const todoArray = readFile(PATH);

	const updateTodo = todoArray.filter((task) => {
		return task.id != args.id;
	});

	writeToFile(PATH, updateTodo);
	console.error(`Removed task #${args.id} successfully.`);
}

function check(PATH, args) {
	const todoArray = readFile(PATH);
	let didChange = false;

	const updateTodo = todoArray.map((task) => {
		if (task.id == args.id && !task.checked) {
			task.checked = true;
			didChange = true;
		}

		return task;
	})

	writeToFile(PATH, updateTodo);

	let message = didChange ? `Checked task #${args.id} as done.` : `Task already checked`;
	console.log(message);
}

function uncheck(PATH, args) {
	const todoArray = readFile(PATH);
	let didChange = false;

	const updateTodo = todoArray.map((task) => {
		if (task.id == args.id && task.checked) {
			task.checked = false;
			didChange = true;
		}

		return task;
	})

	writeToFile(PATH, updateTodo);

	let message = didChange ? `Unchecked task #${args.id}.` : `Task already unchecked`;
	console.log(message);
}

function list(PATH, args) {
	const content = fs.readFileSync(PATH, 'UTF-8'),
		todoArray = JSON.parse(content, null, 4);
	let data;

	if (Object.keys(args).length !== 0) {
		data = todoArray.filter((task) => {
			let filterBase = args.filter == 'checked' ? true : false;
			return task.checked === filterBase;
		});
	} else {
		data = todoArray;
	}

	console.table(data);
}

function readFile(PATH) {
	const content = fs.readFileSync(PATH, 'UTF-8');
	return JSON.parse(content);
}

function writeToFile(PATH, content) {
	const todo = JSON.stringify(content, null, 4);
	fs.writeFileSync(PATH, todo);
}

module.exports = {
	createFile, parseArgs, add, edit, del, check, uncheck, list
}