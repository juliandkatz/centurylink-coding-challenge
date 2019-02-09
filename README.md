# Julian's CenturyLink Coding Challenge

## To Use The Deployed Version:

Visit these two urls, which display the API responses for VIM hero Tim Pope:

```
https://ilwphyee2k.execute-api.us-east-1.amazonaws.com/dev/followers/tpope
https://ilwphyee2k.execute-api.us-east-1.amazonaws.com/dev/stargazers/tpope
```

You can also add `?depth=3` as a querystring parameter to change the depth. As in:

I prefer to hit them using `curl`, piping to [jq](https://stedolan.github.io/jq/) for pretty JSON on the command line.

```
curl https://ilwphyee2k.execute-api.us-east-1.amazonaws.com/dev/followers/tpope\?depth\=2 | jq
```

## To Run Locally

The lambda function is deployed with a GitHub [Personal Access Token](https://github.com/settings/tokens) and username as secrets.  I've included these in my project in an env file that is not included in the repo.  This file should sit in the root directory of the project and be named `.env`.  It should look like:

```
GITHUB_USERNAME=some-username-here
GITHUB_ACCESS_TOKEN=some-access-token-here
```

With that in place, run `sls offline` to run a local emulation of Lambda and API Gateway.  Then hit the local version with the same routes but a different base url:

```
http://localhost:3000/followers/tpope
http://localhost:3000/stargazers/tpope
```

## Overview:
The purpose of this coding challenge is to test your ability to develop software for the CenturyLink Cloud organization. For this coding challenge, you’re free to use any coding language you’d like.

## Requirements: 

1. Write an API endpoint that accepts a GitHub ID and returns Follower GitHub ID’s (up to 5 Followers total) associated with the passed in GitHub ID.  Retrieve data up to 3 levels deep, repeating the process of retrieving Followers (up to 5 Followers total) for each Follower found.  Data should be returned in JSON format.
1. Code should be checked into a public GitHub repository, so that the CenturyLink team members can review your code at any time.
1. A readme file should be included and checked into GitHub with instructions on how to execute and test your API.
1. Bonus credit: API endpoint is publicly accessible and fully functional, so that CenturyLink team members can execute and test your API at any time.

## Bonus Challenge:

The bonus challenge NOT required!

1. Write an API endpoint that accepts a GitHub ID and retrieves the Repository names (up to 3 Repositories total) associated with the passed in GitHub ID, along with the Stargazer GitHub ID’s (up to 3 Stargazers total) associated with each Repository.  Retrieve data up to 3 levels deep, repeating the process of retrieving the associated Repositories (up to 3 Repositories total) for each Stargazer (up to 3 Stargazers total) found.  Data should be returned in JSON format.
1. See requirements 2, 3, and 4 above.

## Tips:

1. You’ll need a GitHub account (which are free) to complete this coding challenge.
1. GitHub provides API’s for retrieving Followers, Repositories, and Stargazers.  Please see the following GitHub API documentation:
  * https://developer.github.com/v3/users/followers/ 
  * https://developer.github.com/v3/repos/
  * https://developer.github.com/v3/activity/starring/
