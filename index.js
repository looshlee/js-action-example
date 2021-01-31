const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

// const token = core.getInput('github_token');

// Create instance of Octokit
const octokit = new Octokit();
 
// get my username because I need my GITHUB_ID to do subsequent queries

function getGitHubID() {
    octokit.users.getByUsername({
    username: "looshlee",
  }).then(({ data }) => {
     console.log(data, "data from get github ID")
     getList(data.id)
    })
}

// I should set my GITHUB_ID to a variable, but the above call is a promise! 
// Good read: https://codeburst.io/a-simple-guide-to-es6-promises-d71bacd2e13a

// https://octokit.github.io/rest.js/v18#users-list

function getList(id) {
 console.log("in here", id)
 octokit.users
   .list({
     per_page: 100,
     since: id,
    })
   .then(({ data }) => {
     console.log(data, "userData")
     console.log(data[0], "first person")
     console.log(data.length, "length")
   });
}

getGitHubID()

// Compare: https://docs.github.com/en/rest/reference/repos/#list-organization-repositories
// octokit.repos
//   .listForOrg({
//     org: "octokit",
//     type: "public",
//   })
//   .then(({ data }) => {
//     console.log("data", data)
//   });

// octokit.issues.listForRepo({
//   owner,
//   signalapp/Signal-Desktop,
// });
