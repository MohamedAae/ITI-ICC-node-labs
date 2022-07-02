const express  = require("express"),
      app      = express(),
      port     = 3000,
      mongoose = require("mongoose"),
      morgan   = require('morgan'),
      atlasURI =
		"mongodb+srv://mohamed:TS3LoyY4gInYhk1l@cluster0.ubp4c.mongodb.net/itiDB";
      users    = require('./routes/users'),
      posts    = require("./routes/posts");


mongoose.connect(atlasURI, (err) => {
	if (!err) return console.log(`Connected to Atlas DB.`);
	console.error(err);
});

app.use(express.json());
app.use(morgan("dev"));
app.use('/user', users);
app.use("/post", posts);

app.listen(port, () => {
	console.log(`Server is up at localhost:${port}`);
});
