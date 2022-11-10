const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

const { Octokit } = require("@octokit/core")

require('dotenv-flow').config()

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

router.get("/names", async (req, res) => {
  // Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: process.env.authKEY,
  });

  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "vercel",
      repo: "next.js",
      path: "examples",
    }
  );

  let result = data.map((a) => a.name);

  console.log("fitredTemplatesName>> ", result);

  res.send(await result);
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);