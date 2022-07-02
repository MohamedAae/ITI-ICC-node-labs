const express   = require("express"),
	route       = express.Router(),
	PostModel   = require('../models/Post');

route.get("/", async (req, res) => {
	try {
		const posts = await PostModel.find({}).populate("author");
		res.json(posts);
	} catch(err) {
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	}
});

route.get("/:id", async (req, res) => {
	const id = req.params.id;

	try {
		const user = await PostModel.find({ _id: id }).populate("author");
		res.json(user)
	} catch(err) {
		res.status(200).json({
				success: false,
				message: "DB error!",
		});
	}
});

route.post("/", async (req, res) => {
	const postData = req.body,
		post       = new PostModel(postData);

	try {
		const saved = await post.save();
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
		const updated = await PostModel.findOneAndUpdate({ _id: id }, update);
		res.json({
			success: true,
			id: id,
			message: "Successfuly updated the post details.",
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
		const deleted = await PostModel.deleteOne({ _id: id });
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
