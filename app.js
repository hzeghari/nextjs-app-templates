const express = require('express')
const app = express()
const port = 4000

const { Octokit } = require("@octokit/core")

require('dotenv-flow').config()

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

  // console.log("done>> ", data);

  // const fitredTemplatesName = data.forEach(function (arrayData) {
  //   console.log(arrayData.name);
  //   return arrayData.name;
  // });

  let result = data.map(a => a.name);

  console.log("fitredTemplatesName>> ", result);
  
  res.send(await result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})