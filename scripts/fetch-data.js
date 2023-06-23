const fs = require('fs');
const path = require('path');
const https = require('https');

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

const dataPath = path.resolve(path.join(__dirname, '..', 'data'));
const INDEX_URL = "https://data.opensanctions.org/datasets/latest/index.json";
const ISSUES_URL = "https://data.opensanctions.org/datasets/latest/issues.json";

download(INDEX_URL, path.join(dataPath, 'index.json'), function () { });
download(ISSUES_URL, path.join(dataPath, 'issues.json'), function () { });