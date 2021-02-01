const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

// const token = core.getInput('github_token');

// Create instance of Octokit
const octokit = new Octokit();
 
// get my username because I need my GITHUB_ID to do subsequent queries

async function getID(user) {
  let response = await octokit.users.getByUsername({
   username: user,
   })
  return response.data
}


async function createList() {
  let a = getID('looshlee');
  let b = getID('ernest-phillips');
  let c = getID('rsese');

  let values = await Promise.all([a.id, b.id, c.id]);
  generateList(values)
  console.log(values, "values")
}

createList()
.catch((e) =>
  console.log(e)
);

async function generateList(values) {
  let a = values.forEach(id => { getList(id) } )
  let values = await Promise.all(a)

}

// https://octokit.github.io/rest.js/v18#users-list

async function getList(id) {
 console.log("in get list")
  let response = await  octokit.users
   .list({
     per_page: 10,
     since: id,
    })
  return response
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
