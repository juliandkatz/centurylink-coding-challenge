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

  return results.data.reduce((obj, followerResponse) => {
    obj[followerResponse.login] = {}
    return obj
  }, {})
}

module.exports = getFollowerTree
