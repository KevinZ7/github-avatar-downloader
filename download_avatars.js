//variables used to store command line arguments
var owner = process.argv[2];
var name = process.argv[3];

//import all of the needed modules
var request = require('request');
var secret = require('./secret.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

//main function that takes in the repoOwner, repoName, and a callback function
function getRepoContributors(repoOwner, repoName, cb){

//if the command line inputs are not given, give error messagea and return error
  if(repoOwner === undefined || repoName === undefined){
    console.log('Sorry, invalid RepoName or RepoOwner');
    return false;
  }

//opjects containing the information regarding the site that we are looking up to
  var options = {
    json: true,
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token '+ secret.GITHUB_TOKEN
    }
  };

  request(options,cb);

}

//callback function that retrives the url and filepath of each contributor
function callback(err,response,result){
   if(err){
     throw err;
   }

   result.forEach(function(element){
    var url = element.avatar_url;
    var filePath = 'avatars/' + element.login + '.jpg';
    downloadImageByURL(url,filePath);
   });
}

//download function that writes the url to file path
function downloadImageByURL(url,filePath){
  request(url).pipe(fs.createWriteStream(filePath));
}



getRepoContributors(owner, name, callback);

