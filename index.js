// dependencies
const serverless = require('serverless-http')
const express = require('express')

// local dependencies
const getFollowerTree = require('./follower-tree.js')

// Routes
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/followers/:githubID', async function (req, res) {
  const baseUserID = req.params.githubID

  const output = await getFollowerTree(baseUserID)

  res.send(output)
})

module.exports.handler = serverless(app)
