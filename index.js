const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require("node-fetch");

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

  P.getPokemonByName('eevee') // with Promise
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });

  P.getPokemonByName(34, function(response, error) { // with callback
      if(!error) {
        console.log(response);
      } else {
        console.log(error)
      }
    });

  P.resource(['/api/v2/pokemon/36', 'api/v2/berry/8', 'https://pokeapi.co/api/v2/ability/9/'])
    .then(function(response) {
      console.log(response); // resource function accepts singles or arrays of URLs/paths
    });
