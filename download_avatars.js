var request = require('request');
var secret = require('./secret');

console.log('Welcome to the GitHub Avatar Downloader!');

var host = 'https://api.github.com/repos/';
var contributor = '/contributors';
var accessToken = '?access_token=c5e9ef6ef935fe7ed7f427545358b973a62ab2d2';



function getRepoContributors(repoOwner, repoName, cb){

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token '+secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, response, body){
    cb(err, body);
  });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

