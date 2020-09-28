const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

const lib = {};
lib.baseDir = path.join(__dirname, '/../.data/');
console.log(lib.baseDir);

lib.create = (dir, file, data, callback) => {
  const stringData = JSON.stringify(data);
  fs.writeFile(lib.baseDir + dir + '/' + file + '.json', stringData, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback('Error writing a new File');
    }
  });
};

lib.read = (dir, file, callback) => {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json','utf-8', (err, data) => {
      if (!err && data) {
        const parsedData = helpers.parseJsonToObject(data);
        callback(false, parsedData);
      } else {
        callback(err, data);
      }
    }
  );
};

lib.update = (dir, file, data, callback) => {
  const stringData = JSON.stringify(data);
  fs.writeFile(lib.baseDir + dir + '/' + file + '.json', stringData, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback('Error in updating Existing file');
    }
  });
};

lib.delete = (dir, file, callback) => {
  fs.unlink(lib.baseDir + dir + '/' + file + '.json', (err) => {
    if (!err) {
      callback(false);
    } else {
      callback('error in deleting file');
    }
  });
};

module.exports = lib;
