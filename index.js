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
  console.log("This is " + response.data.login + " and this is their id: " + response.data.id)
  return response.data.id
}

async function createList() {
  let a = getID('looshlee');
  let b = getID('ernest-phillips');
  let c = getID('rsese');

  let ids = await Promise.all([a, b, c]);
  return ids
}


async function generateList(ids) {
 console.log("These are our Github IDs " + ids)
 let userList = []
   for (const id of ids) {
    const sublist = await getList(id);
    userList.push(sublist.data)
  }
 
 console.log("Before Flattening", userList)
 // we use .flat() to flatten an array 
 userNameOnly(userList.flat())
 isEmployee(userList.flat())
 oldestAccount(userList.flat())
}

// https://octokit.github.io/rest.js/v18#users-list

async function getList(id) {
 let modified_id = id - 5
  let response = await octokit.users
   .list({
     per_page: 10,
     since: modified_id,
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
 // The filter() method creates a new array with all elements that pass the test implemented by the provided function.
 const employees = data.filter(user => user.site_admin)
 employees.forEach(hubber => console.log(hubber.login + " is a Hubber!"));
}

function oldestAccount(data) {
 let ids = []
 data.forEach(d => ids.push(d.id))
 console.log("ids", ids)
 
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#how_reduce_works
 // ternary operator. If current value is less than next one, keep curr value, else keep the next value    
 
 const oldest = ids.reduce((c, n) => n < c ? n : c);
 
 console.log(oldest);
 
}

// calls the function 
createList()
  .catch((e) =>
     console.log(e, "error")
  ).then((values) => {
    generateList(values).catch((e) =>
    console.log(e)
  );
})
