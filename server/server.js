const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
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
