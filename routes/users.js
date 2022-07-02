const express   = require("express"),
	route     = express.Router(),
	UserModel = require('../models/User');

route.get("/", async (req, res) => {
	try {
		const users = await UserModel.find({});
		res.json(users);
	} catch (err) {
		console.log(err);
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	}
});

route.get("/:id", async (req, res) => {
	const id = req.params.id;

	try {
		const user = await UserModel.find({ _id: id });
		res.json(user);
	} catch(err) {
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	}
});

route.post("/", async (req, res) => {
	const userData = req.body,
	user       = new UserModel(userData);

	try {
		const saved = await user.save();
		res.json(saved);
	} catch(err) {
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	}
});

route.patch("/:id", async (req, res) => {
	const id = req.params.id;
		update = req.body;

	try {
		const updated = await UserModel.findOneAndUpdate({ _id: id }, update);
		res.json({
			success: true,
			id: id,
			message: "Successfuly updated the user details.",
		});
	} catch(err) {
		res.json({
			success: false,
			id: id,
			message: "Error while updating.",
		});
	}
});

route.delete("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const deleted = await UserModel.deleteOne({ _id: id });
		deleted = { success: true, id: id, ...deleted };
		return res.json(deleted);
	} catch(err) {
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	}
});

module.exports = route;
