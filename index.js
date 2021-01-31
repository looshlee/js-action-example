const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

// const token = core.getInput('github_token');

const octokit = new Octokit();

let userData = []

// https://octokit.github.io/rest.js/v18#users-list
octokit.users
  .list()
  .then(({ data }) => {
    let userData = data
  });

console.log(userData, "userData")
console.log(userData[0], "first person")
console.log(userData.length, "length")
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
