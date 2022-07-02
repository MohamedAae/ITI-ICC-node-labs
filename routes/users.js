const express   = require("express"),
	route     = express.Router(),
	UserModel = require('../models/User');

route.get("/", (req, res) => {
	UserModel.find({}, (err, users) => {
		if (!err) return res.json(users);

		console.log(err);
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	});
});

route.get("/:id", (req, res) => {
	const id = req.params.id;
	UserModel.find({ _id: id }, (err, user) => {
		if (!err) return res.json(user);

		console.log(err);
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	});
});

route.post("/", (req, res) => {
	const userData = req.body,
		user       = new UserModel(userData);

	user.save((err, saved) => {
		if(!err) return res.json(saved);

		console.log(err);
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	});
});

route.get("/:id", (req, res, next) => {
	const id = req.params.id;
	UserModel.find({ _id: id }, (err, user) => {
		if (!err) return res.json(user);

		console.log(err);
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	});
});

route.patch("/:id", (req, res, next) => {
	const id = req.params.id;
		update = req.body;
	UserModel.findOneAndUpdate({ _id: id }, update , (err) => {
		if (!err) {
			return res.json({
				success: true,
				id: id,
				message: "Successfuly updated the user details.",
			});
		}

		console.log(err);
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	});
});

route.delete("/:id", (req, res, next) => {
	const id = req.params.id;
	UserModel.deleteOne({ _id: id }, (err, user) => {
		if (!err) {
			user = { success: true, id: id, ...user };
			return res.json(user);
		};

		console.log(err);
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	});
});

module.exports = route;
