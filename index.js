const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require("node-fetch");

const twitter_token = core.getInput('twitter_token');


var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + twitter_token);
myHeaders.append("Cookie", "guest_id=v1%3A161205311113227072; personalization_id=\"v1_mNAAzbye8dMSjSr3YnmuVg==\"");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.twitter.com/2/users/by/username/chrissyteigen", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
