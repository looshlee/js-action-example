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
