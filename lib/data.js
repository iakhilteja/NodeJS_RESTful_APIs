const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

const lib = {};

lib.baseDir = path.join(__dirname, '/../.data/');

lib.create = (dir, file, data, callback) => {
  const stringData = JSON.stringify(data);
  fs.writeFile(lib.baseDir + dir + '/' + file + '.json', stringData, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback('Error Creating a new File');
    }
  });
};

lib.read = (dir, file, callback) => {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf-8', (err, data) => {
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
      callback('Error in Updating Existing File');
    }
  });
};

lib.delete = (dir, file, callback) => {
  fs.unlink(lib.baseDir + dir + '/' + file + '.json', (err) => {
    if (!err) {
      callback(false);
    } else {
      callback('Error in Deleting File');
    }
  });
};

module.exports = lib;
