const express = require("express"),
	route = express.Router(),
	UserModel = require("../models/User"),
	bcrypt = require("bcryptjs"),
	jwt = require("jsonwebtoken"),
	auth = require("../middleware/auth");

route.post("/register", async (req, res) => {
	try {
		const { username, email, password, firstName, lastName } = req.body;
		if (!(username && email && password)) {
			res.status(400).json({
				success: false,
				error: "username, email, and password are required",
			});
		}

		const oldUser = await UserModel.findOne({ email });
		if (oldUser) {
			return res.status(409).json({
				success: false,
				error: "User alreay exists",
			});
		}

		const encryptedPassword = await bcrypt.hash(password, 10);
		const user = await UserModel.create({
			username: username,
			email: email.toLowerCase(),
			password: encryptedPassword,
			firstName,
			lastName,
		});

		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.TOKEN_KEY,
			{
				expiresIn: "2h",
			}
		);
		user.token = token;
		res.status(201).json(user);
	} catch (err) {
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	}
});

route.post("/login", auth, async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!(email && password)) {
			res.status(400).json({
				success: false,
				message: "Email & password are required.",
			});
		}

		const user = await UserModel.findOne({ email });
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{
					expiresIn: "2h",
				}
			);
			user.token = token;
			return res.status(200).json({
				success: true,
				message: "Logged In!",
			});
		}

		res.status(400).json({
			success: false,
			message: "Invalide credentials",
		});
	} catch (err) {
		console.log(err);
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	}
});

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
	} catch (err) {
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
	} catch (err) {
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
		const { email, password } = req.body;
		if (!(email && password)) {
			return res.status(400).json({
				success: false,
				message: "Email & password are required.",
			});
		}

		const user = await UserModel.findOne({ email });
		if (user && (await bcrypt.compare(password, user.password))) {
			let deleted = await UserModel.deleteOne({ _id: id });
			deleted = { success: true, id: id, ...deleted };
			return res.json(deleted);
		}

		res.status(400).json({
			success: false,
			message: "Invalide credentials",
		});
	} catch (err) {
		console.log(err);
		res.status(200).json({
			success: false,
			message: "DB error!",
		});
	}
});

module.exports = route;
