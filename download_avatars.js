var request = require("request");
var fs = require("fs")
var GITHUB_USER = "joshtran";
var GITHUB_TOKEN = "605b127ccace488342149ee40f538cd6b8e191c1";

var mkdirSync = function () {
  try {
    fs.mkdirSync("avatars");
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }

}();


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors (repoOwner, repoName, cb) {

  var requestURL = "https://"+ GITHUB_USER + ':' + GITHUB_TOKEN + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";

  var options = {
    url: requestURL,
    headers: {
      "User-Agent": "GitHub Avatar Downloader - Student Project"
    }
  };

  request (options, function (err, response, avatars) {

    if (err) {
      console.log("There was an error.")
      return false;
    }

    if (response.statusCode < 400) {
      console.log("Should be working now");
      console.log(response.statusMessage);
      console.log(response.statusCode);
      var body = JSON.parse(avatars);
      cb(body);

    } else {
      console.log("Something unexpected happened - Status Code 400 plus");
    }

  });

}

function downloadImageByURL(url, filePath) {
  // console.log(url);
  // console.log(filePath);
  request.get(url).pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function(contributorObj) {
  contributorObj.forEach(function(avatars) {
    var avatarPath = "avatars/" + avatars.login +".jpg";
    var avatarURL = avatars.avatar_url;
    downloadImageByURL(avatarURL, avatarPath);
  });
});





