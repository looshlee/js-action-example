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
     let modified_id = data.id - 5
     getList(modified_id)
    })
}

// https://octokit.github.io/rest.js/v18#users-list

function getList(id) {
 octokit.users
   .list({
     per_page: 10,
     since: id,
    })
   .then(({ data }) => {
     userNameOnly(data)  // show map
     isEmployee(data)   // show filter
   });
}

function userNameOnly(data) {
   // The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
 const results = data.map(data => data.username)
 console.log(results, "results")
}


function isEmployee(data) {
 let employees =data.filter(user => user.site_admin)
 console.log(employees, "emp")
}

// function mapUsers(users) {
// }

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
