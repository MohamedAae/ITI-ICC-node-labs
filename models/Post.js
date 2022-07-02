const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	title: String,
	body: String,
	author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	tags: [String],
});

const PostModel = mongoose.model("Post", PostSchema);
module.exports = PostModel;
