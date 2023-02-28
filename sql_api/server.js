const express = require("express");
const port = process.env.port || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ name: " hasan", doing: "nothing " });
});

// start listening
app.listen(port, () => console.log(`server is listening ${port}`));
