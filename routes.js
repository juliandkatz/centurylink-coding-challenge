const axios = require('axios')

const BASE_URL = 'https://api.github.com'

async function getFollowerTree (baseUserID) {
  const output = { [baseUserID]: {} }

  const followersObject = await getFollowersAsObject(baseUserID)
  output[baseUserID] = followersObject

  const followers = Object.keys(output[baseUserID])
  for (var a = 0; a < followers.length; a++) {
    let subFollower = followers[a]
    let subSubFollowers = await getFollowersAsObject(subFollower)

    output[baseUserID][subFollower] = subSubFollowers
  }

  return output
}

async function getFollowersAsObject (userLogin) {
  const url = BASE_URL + `/users/${userLogin}/followers?page=1&per_page=5`

  const results = await axios(url)

  return results.data.reduce((accum, followerResponse) => {
    accum[followerResponse.login] = {}
    return accum
  }, {})
}

async function getStargazerTree (baseUserID) {
  const output = { [baseUserID]: {} }

  const stargazersObject = await getStargazersAsObject(baseUserID)
  output[baseUserID] = stargazersObject
  //
  // const followers = Object.keys(output[baseUserID])
  // for (var a = 0; a < followers.length; a++) {
  //   let subFollower = followers[a]
  //   let subSubFollowers = await getFollowersAsObject(subFollower)
  //
  //   output[baseUserID][subFollower] = subSubFollowers
  // }

  return output
}

async function getStargazersAsObject (userLogin) {
  const repoUrl = BASE_URL + `/users/${userLogin}/repos?page=1&per_page=3`
  const repoResults = await axios(repoUrl)

  const reposObject = repoResults.data.reduce((accum, reposResponse) => {
    accum[reposResponse.name] = {}
    return accum
  }, {})

  const repos = Object.keys(reposObject)
  for (var b = 0; b < repos.length; b++) {
    const repo = repos[b]
    const stargazerUrl = BASE_URL + `/repos/${userLogin}/${repo}/stargazers?page=1&per_page=3`
    const stargazerResults = await axios(stargazerUrl)

    const stargazerObj = stargazerResults.data.reduce((accum, gazer) => {
      accum[gazer.login] = {}
      return accum
    }, {})

    reposObject[repo] = stargazerObj
  }

  return reposObject
}

module.exports = {
  'getFollowerTree': getFollowerTree,
  'getStargazerTree': getStargazerTree
}
