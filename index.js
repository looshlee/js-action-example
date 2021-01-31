const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

// const token = core.getInput('github_token');

// Create instance of Octokit
const octokit = new Octokit();
 
// get my username because I need my GITHUB_ID to do subsequent queries

async function getGitHubID() {
    octokit.users.getByUsername({
    looshlee,
  })
}

console.log(getGitHubID(), "getGitHubID(")
const looshleeID = await getGitHubID();

// I should set my GITHUB_ID to a variable, but the above call is a promise! 
// Good read: https://codeburst.io/a-simple-guide-to-es6-promises-d71bacd2e13a

console.log("looshleeID", looshleeID)

// https://octokit.github.io/rest.js/v18#users-list
octokit.users
  .list({
    per_page: 100
    since: looshleeID
   })
  .then(({ data }) => {
    console.log(data, "userData")
    console.log(data[0], "first person")
    console.log(data.length, "length")
  });

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
