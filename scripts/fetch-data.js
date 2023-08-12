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
// const ISSUES_URL = "https://data.opensanctions.org/datasets/latest/issues.json";
// const PEPS_URL = "https://data.opensanctions.org/datasets/latest/pep-positions.json";
const PEPS_URL = "https://gist.githubusercontent.com/jbothma/a894dc5ced2d9d32ffe2a1d996247391/raw/fe56e7fb77482b6770fc03d8f8ee892420e5f875/pep-positions.gist";

download(INDEX_URL, path.join(dataPath, 'index.json'), function () { });
download(PEPS_URL, path.join(dataPath, 'pep-positions.json'), function () { });
// download(ISSUES_URL, path.join(dataPath, 'issues.json'), function () { });