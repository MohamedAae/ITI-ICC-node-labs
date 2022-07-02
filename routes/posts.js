const express   = require("express"),
	route       = express.Router(),
	PostModel   = require('../models/Post');

route.get("/", (req, res) => {
	PostModel.find({})
		.populate("author")
		.exec((err, posts) => {
			if (!err) return res.json(posts);

			console.log(err);
			res.status(200).json({
				success: false,
				message: "DB error!",
			});
		});
});

route.get("/:id", (req, res) => {
	const id = req.params.id;
	PostModel.find({ _id: id })
		.populate("author")
		.exec((err, user) => {
		if (!err) return res.json(user);

		console.log(err);
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	});
});

route.post("/", (req, res) => {
	const postData = req.body,
		post       = new PostModel(postData);

	post.save((err, saved) => {
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
	PostModel.find({ _id: id }, (err, post) => {
		if (!err) return res.json(post);

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
	PostModel.findOneAndUpdate({ _id: id }, update , (err) => {
		if (!err) {
			return res.json({
				success: true,
				id: id,
				message: "Successfuly updated the post details.",
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
	PostModel.deleteOne({ _id: id }, (err, post) => {
		if (!err) {
			post = { success: true, id: id, ...post };
			return res.json(post);
		};

		console.log(err);
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	});
});

module.exports = route;
