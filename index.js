// dependencies
require('dotenv').config()
const serverless = require('serverless-http')
const express = require('express')

// local dependencies
const routes = require('./routes.js')

// Router
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/followers/:githubID', async function (req, res) {
  const output = await routes.getFollowerTree(req.params.githubID)
  res.send(output)
})

app.get('/stargazers/:githubID', async function (req, res) {
  const output = await routes.getStargazerTree(req.params.githubID)
  res.send(output)
})

module.exports.handler = serverless(app)
