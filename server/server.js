const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(cors());

// 🧠 Log all requests for debugging
app.use((req, res, next) => {
  console.log(`🔍 Incoming request: ${req.url}`);
  next();
});

// ✅ Serve static files from ../client
app.use(express.static(path.join(__dirname, "../client")));

// Dummy data
const data = require("./data.json");

app.get("/api/intern", (req, res) => {
  res.json({
    name: data.name,
    referralCode: data.referralCode,
    donations: data.donations
  });
});

app.get("/api/leaderboard", (req, res) => {
  res.json(data.leaderboard);
});

// 🏠 Serve index.html on "/"
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../client") });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
