const express = require('express')
const app = express()
const port = 3000

const { Octokit } = require("@octokit/core")

require('dotenv-flow').config()

// use the express-static middleware
// app.use(express.static("public"))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/names', async (req, res) => {
  // Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: process.env.authKEY,
  });

  const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner: "vercel",
    repo: "next.js",
    path: "examples",
  });

  let result = data.map(a => a.name);

  console.log("fitredTemplatesName>> ", result);
  
  res.send(await result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})