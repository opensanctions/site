const fs = require('fs');
const path = require('path');
const https = require('https');


INDEX_URL = "https://data.opensanctions.org/datasets/latest/index.json";
ISSUES_URL = "https://data.opensanctions.org/datasets/latest/issues.json";

var download = function (url, dest, cb) {
  console.log(`Fetch: ${url} -> ${dest}`);
  var file = fs.createWriteStream(dest);
  https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      file.close(cb);
    });
  });
}

const dataPath = path.join(__dirname, '..', 'data');
const indexFile = path.resolve(path.join(dataPath, 'index.json'));
download(INDEX_URL, indexFile, function () { });
const issuesFile = path.resolve(path.join(dataPath, 'issues.json'));
download(ISSUES_URL, issuesFile, function () { });