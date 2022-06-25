const fs = require('fs');

function createFile(PATH) {
	if (!fs.existsSync(PATH)) {
		fs.writeFileSync(PATH, "[]");
	}
}

function add(PATH, args) {
	const todoArray = readFile(PATH),
		lastItem = todoArray[todoArray.length -1],
		id = lastItem ? lastItem.id + 1 : todoArray.length + 1;

	args = { id: id, ...args, checked: false };
	todoArray.push(args);

	writeToFile(PATH, todoArray);
}

function edit(PATH, id, args) {
	const todoArray = readFile(PATH);

	const updateTodo = todoArray.map((task) => {
		if (task.id == id) {
			return { ...task, title: args.title, body: args.body };
		}

		return task;
	});

	writeToFile(PATH, updateTodo);
}

function del(PATH, id) {
	const todoArray = readFile(PATH);

	const updateTodo = todoArray.filter((task) => {
		return task.id != id;
	});

	writeToFile(PATH, updateTodo);
}

function check(PATH, id) {
	const todoArray = readFile(PATH);

	const updateTodo = todoArray.map((task) => {
		if (task.id == id && !task.checked) {
			task.checked = true;
		}

		return task;
	})

	writeToFile(PATH, updateTodo);
}

function uncheck(PATH, id) {
	const todoArray = readFile(PATH);

	const updateTodo = todoArray.map((task) => {
		if (task.id == id && task.checked) {
			task.checked = false;
		}

		return task;
	})

	writeToFile(PATH, updateTodo);
}

function list(PATH, isFIltered, isChecked) {
	const content = fs.readFileSync(PATH, 'UTF-8'),
		todoArray = JSON.parse(content, null, 4);
	let data;

	if (isFIltered) {
		data = todoArray.filter((task) => {
			let filterBase = isChecked ? true : false;
			return task.checked === filterBase;
		});
	} else {
		data = todoArray;
	}

	return data;
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
	createFile, add, edit, del, check, uncheck, list
}