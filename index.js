const express = require('express'),
	app = express(),
	port = 3000,
	helpers = require('./helpers'),
	PATH = './dataStore.json';

app.use(express.json())

helpers.createFile(PATH);

app.post('/todo', (req, res) => {
	helpers.add(PATH, req.body);
	res.json({
		"success": true,
		"message": "Task added to list"
	})
});

app.put('/todo/:id', (req, res) => {
	const id = req.params.id;
	helpers.edit(PATH, id, req.body);
	res.json({
		"success": true,
		"message": "Successfully edited the task."
	})
});

app.delete('/todo/:id', (req, res) => {
	const id = req.params.id;
	helpers.del(PATH, id);
	res.json({
		"success": true,
		"message": "Removed task successfull."
	})
});

app.put('/todo/check/:id', (req, res) => {
	const id = req.params.id;
	helpers.check(PATH, id);
	res.json({
		"success": true,
		"message": "Checked task as done."
	})
});

app.put('/todo/uncheck/:id', (req, res) => {
	const id = req.params.id;
	helpers.uncheck(PATH, id);
	res.json({
		"success": true,
		"message": "Unchecked task as done."
	})
});

app.get('/todo', (req, res) => {
	const isFilter = req.headers.filter;
	let data;
	if (isFilter) {
		const isChecked = isFilter == 'checked' ? true : false;
		data = helpers.list(PATH, true, isChecked);
	} else {
		data = helpers.list(PATH, false);
	}

	const response = {
		"success": true,
		"filter": false,
		"todos": data
	}

	if ( isFilter ) {
		response.filter = isFilter;
	}

	res.json(response)
});

app.listen(port, () => {
	console.log(`Server is up at localhost:${port}`)
})
