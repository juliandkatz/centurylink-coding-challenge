const ax = require('axios')
const axios = ax.create({
  auth: {
    username: process.env.GITHUB_USERNAME,
    password: process.env.GITHUB_ACCESS_TOKEN
  },
  baseURL: 'https://api.github.com'
})

async function getFollowerTree (baseUserID, levels = 3) {
  const followersObject = await getFollowersAsObject(baseUserID, levels)

  return {
    [baseUserID]: followersObject
  }
}

async function getFollowersAsObject (userLogin, counter) {
  if (counter <= 1) { return {} }

  const url = `/users/${userLogin}/followers?page=1&per_page=5`
  const results = await axios(url)

  const followersObject = results.data.reduce((accum, followerResponse) => {
    accum[followerResponse.login] = null
    return accum
  }, {})

  const followers = Object.keys(followersObject)
  for (var d = 0; d < followers.length; d++) {
    const follower = followers[d]
    const subFollowersObj = await getFollowersAsObject(follower, counter - 1)
    followersObject[follower] = subFollowersObj
  }

  return followersObject
}

async function getStargazerTree (baseUserID, levels = 3) {
  const stargazersObject = await getStargazersAsObject(baseUserID, levels)

  return {
    [baseUserID]: stargazersObject
  }
}

async function getStargazersAsObject (userLogin, counter) {
  if (counter <= 1) { return {} }

  const repoUrl = `/users/${userLogin}/repos?page=1&per_page=3`
  const repoResults = await axios(repoUrl)

  const reposObject = repoResults.data.reduce((accum, reposResponse) => {
    accum[reposResponse.name] = {}
    return accum
  }, {})

  const repos = Object.keys(reposObject)
  for (var b = 0; b < repos.length; b++) {
    const repo = repos[b]
    const stargazerUrl = `/repos/${userLogin}/${repo}/stargazers?page=1&per_page=3`
    const stargazerResults = await axios(stargazerUrl)

    const stargazerObj = stargazerResults.data.reduce((accum, gazer) => {
      accum[gazer.login] = {}
      return accum
    }, {})

    const stargazers = Object.keys(stargazerObj)
    for (var e = 0; e < stargazers.length; e++) {
      const stargazer = stargazers[e]
      const subStarsObj = await getStargazersAsObject(stargazer, counter - 1)
      stargazerObj[stargazer] = subStarsObj
    }

    reposObject[repo] = stargazerObj
  }

  return reposObject
}

module.exports = {
  'getFollowerTree': getFollowerTree,
  'getStargazerTree': getStargazerTree
}
