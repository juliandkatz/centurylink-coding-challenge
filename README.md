# Julian's CenturyLink Coding Challenge

## To Use The Deployed Version:

Visit these two urls, which display the API responses for VIM hero Tim Pope:

```
https://ilwphyee2k.execute-api.us-east-1.amazonaws.com/dev/followers/tpope
https://ilwphyee2k.execute-api.us-east-1.amazonaws.com/dev/stargazers/tpope
```

You can also add `?depth=some-number` as a querystring parameter to change the depth. As in:

```
https://ilwphyee2k.execute-api.us-east-1.amazonaws.com/dev/followers/tpope?depth=2
```

I prefer to hit them using `curl`, piping to [`jq`](https://stedolan.github.io/jq/) for pretty JSON on the command line.

```
curl https://ilwphyee2k.execute-api.us-east-1.amazonaws.com/dev/followers/tpope\?depth\=2 | jq
```

## To Run Locally

The lambda function is deployed with a GitHub [Personal Access Token](https://github.com/settings/tokens) and username as secrets.  I've included these in my project in an env file that I've told git to ignore.  This file should sit in the root directory of the project and be named [`.env`](https://www.npmjs.com/package/dotenv).  It should look like:

```
GITHUB_USERNAME=some-username-here
GITHUB_ACCESS_TOKEN=some-access-token-here
```

With that in place, run `sls offline` to spin up a local emulation of Lambda and API Gateway.  Then, hit the local version with the same routes but a different base url:

```
http://localhost:3000/followers/tpope
http://localhost:3000/stargazers/tpope
```
