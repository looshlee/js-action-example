const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require("node-fetch");

const client = core.getInput('client');
const token = core.getInput('token');
