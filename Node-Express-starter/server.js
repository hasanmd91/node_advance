require("dotenv").config();
const router = require("./routes/postRoutes");
const express = require("express");
const app = express();

app.use(express.json());

app.use("/posts", router);

app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went wrong",
  });
});

// Listen on pc port
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
