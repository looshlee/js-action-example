const core = require('@actions/core');
const github = require('@actions/github');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const twitter_token = core.getInput('twitter_token');

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.twitter.com/2/users/by/username/chrissyteigen");
xhr.setRequestHeader("Authorization", "Bearer " + twitter_token);
// xhr.setRequestHeader("Cookie", "guest_id=v1%3A161205311113227072; personalization_id=\"v1_mNAAzbye8dMSjSr3YnmuVg==\"");

xhr.send();
