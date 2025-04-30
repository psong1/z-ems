const express = require("express");
const path = require("path");
const routes = require("./routes/index");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Node running on http://localhost:${PORT}`);
});
