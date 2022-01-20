// import { join } from 'path';
// import { promises as fs } from 'fs';
const fs = require('fs');
const path = require('path');
const https = require('https');


INDEX_URL = "https://data.opensanctions.org/datasets/latest/index.json";
// const response = await fetch(INDEX_URL);

var download = function (url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  });
}

const dataPath = path.join(__dirname, '..', 'data');
const dataFile = path.resolve(path.join(dataPath, 'index.json'));
download(INDEX_URL, dataFile, function () { });

// console.log(__dirname, response);