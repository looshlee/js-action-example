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
     // moving the GITHUB_ID back by 5 so I'm included in the list of returned users
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
   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#comparing_traditional_functions_to_arrow_functions
  //  For each user, map data.login to replace user

 
//  let oldResults = data.map(function(user) {
//     return user => data.login
// })
 
 let results = data.map(user => data.login)
 
//  console.log(oldResults, "oldResults")
 console.log(results, "results")
}


function isEmployee(data) {
 let employees =data.filter(user => user.site_admin)
 return employees.login + "is a Hubber!"
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
