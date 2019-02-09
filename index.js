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
  let output
  try {
    output = await routes.getFollowerTree(req.params.githubID, req.query.depth)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
  res.send(output)
})

app.get('/stargazers/:githubID', async function (req, res) {
  let output
  try {
    output = await routes.getStargazerTree(req.params.githubID, req.query.depth)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
  res.send(output)
})

module.exports.handler = serverless(app)
