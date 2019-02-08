// dependencies
const serverless = require('serverless-http')
const express = require('express')
const axios = require('axios')

// Routes
const app = express()

app.get('/', function (req, res) {
  res.send('hello bla')
})

app.get('/followers/:githubID', async function (req, res) {
  const githubID = req.params.githubID

  const output = { [githubID]: {} }

  const followers = await getFollowers(githubID)

  followers.forEach(follower => {
    output[githubID][follower] = {}
  })

  res.send(output)
})

const BASE_URL = 'https://api.github.com'
async function getFollowers (userLogin) {
  const url = BASE_URL + `/users/${userLogin}/followers?page=1&per_page=5`

  const results = await axios(url)
  return results.data.map(follower => {
    return follower.login
  })
}

module.exports.handler = serverless(app)
