var owner = process.argv[2];
var name = process.argv[3];


var request = require('request');
var secret = require('./secret.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var host = 'https://api.github.com/repos/';
var contributor = '/contributors';
var accessToken = '?access_token=c5e9ef6ef935fe7ed7f427545358b973a62ab2d2';



function getRepoContributors(repoOwner, repoName, cb){

  if(repoOwner === undefined || repoName === undefined){
    console.log('Sorry, invalid RepoName or RepoOwner');
    return false;
  }

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

function downloadImageByURL(url,filePath){
  request(url).pipe(fs.createWriteStream(filePath));
}



getRepoContributors(owner, name, callback);

