const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

// const token = core.getInput('github_token');

// Create instance of Octokit
const octokit = new Octokit();
 
// get my username because I need my GITHUB_ID to do subsequent queries

let getHubbers = async (list) => {
 let hubbers = []
 list.forEach(user =>
   hubbers.push(octokit.users.getByUsername({
        username: user,
      }))
   )
 return hubbers
};

async function createList(list) {
 const hubbers = await getHubbers(list)
 console.log(hubbers, "hubbers")
}

// let createList = (list) => {
//  console.log(list, "lists")
//  getHubbers(list).then((value) => console.log(value))

// }

createList(["looshlee", "ernest-phillips", "rsese"])

// getUser().then((value) => console.log(value, "VALUE"))

// function createList(users) {
//    let hubbers = []
//    users.forEach(user => {
//       octokit.users.getByUsername({
//       username: user,
//     }).then(({ data }) => {
//       hubbers.push(data.id)
//      }).catch((e) => {
//        console.log("error")
//       })
//    });
// }

function getGitHubID(user) {
 console.log("in github id")
    octokit.users.getByUsername({
    username: user,
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
  console.log(data, "get list")
  return data
//      userNameOnly(data)  // show map
//      isEmployee(data)   // show filter
   });
}

function userNameOnly(data) {
   // The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#comparing_traditional_functions_to_arrow_functions
  //  For each user, take the entire user object and replace it with user.login
 
 const oldResults = data.map(function(user) {
    return user = user.login
})
 
 const results = data.map(user => user.login)
 
 console.log(oldResults, "oldResults")
 console.log(results, "results")
}


function isEmployee(data) {
 const employees =data.filter(user => user.site_admin)
 console.log(employees, 'emp')
 console.log(employees.login + "is a Hubber!")
}




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
