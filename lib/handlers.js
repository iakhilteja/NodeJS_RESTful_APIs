const _data = require('./data');
const helpers = require('./helpers');

const handlers = {};
handlers.notFound = (data, callback) => {
  callback(404);
};

handlers.users = (data, callback) => {
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};
handlers._users = {};
handlers._users.post = (data, callback) => {
  const firstName =
    typeof data.payload.firstName === 'string' &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  const lastName =
    typeof data.payload.lastName === 'string' &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  const phone =
    typeof data.payload.phone === 'string' &&
    data.payload.phone.trim().length === 10
      ? data.payload.phone.trim()
      : false;
  const password =
    typeof data.payload.password === 'string' &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;
  const email =
    typeof data.payload.email === 'string' &&
    data.payload.email.trim().length > 0
      ? data.payload.email.trim()
      : false;
  const _id = new Date();

  if (firstName && lastName && phone && password && email && _id) {
    _data.read('users', phone, (err, data) => {
      if (err) {
        const hashedPassword = helpers.hash(password);
        if (hashedPassword) {
          const userObject = {
            "firstName": firstName,
            "lastName": lastName,
            "phone": phone,
            "hashedPassword": hashedPassword,
            "email": email,
            "_id": _id,
          };
          _data.create('users', phone, userObject, (err) => {
            if (!err) {
              callback(200, { Success: 'User Created' });
            } else {
              console.log(err);
              callback(500, { Error: 'Could not create the new User' });
            }
          });
        } else {
          callback(500, { Error: 'Could not hash the user password ' });
        }
      } else {
        callback(400, {
          Error: 'A User with that Phone Number Already Exists',
        });
      }
    });
  } else {
    callback(400, { Error: 'Validation Required. Missing Fields' });
  }
};

handlers._users.put = (data, callback) => {
  const phone =
    typeof data.payload.phone == 'string' &&
    data.payload.phone.trim().length === 10
      ? data.payload.phone.trim()
      : false;

  const firstName =
    typeof data.payload.firstName === 'string' &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  const lastName =
    typeof data.payload.lastName === 'string' &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  const password =
    typeof data.payload.password === 'string' &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;
  const email =
    typeof data.payload.email === 'string' &&
    data.payload.email.trim().length > 0
      ? data.payload.email.trim()
      : false;
  const _id = new Date();

  if (phone) {
    if (firstName || lastName || password || email || _id) {
      _data.read('users', phone, (err, userData) => {
        if (!err && userData) {
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.hashedPassword = helpers.hash(password);
          }
          _data.update('users', phone, userData, (err) => {
            if (!err) {
              callback(200, { status: 'success' });
            } else {
              console.log(err);
              callback(500, {
                Error: 'Server Error. Issue in Updating the Error',
              });
            }
          });
        } else {
          callback(400, { Error: ' The Specified User doens not exist' });
        }
      });
    } else {
      callback(400, { Error: 'Missing Fields to Update' });
    }
  } else {
    callback(400, { Error: 'Missing Required Fields' });
  }
};

handlers._users.delete = (data, callback) => {
  const phone =
    typeof data.queryStringObject.phone == 'string' &&
    data.queryStringObject.phone.trim().length === 10
      ? data.queryStringObject.phone.trim()
      : false;
  if (phone) {
    _data.read('users', phone, (err, data) => {
      if (!err && data) {
        _data.delete('users', phone, (err) => {
          if (!err) {
            callback(200, { status: 'user deleted' });
          } else {
            callback(500, { Error: 'Couldnt delete the User' });
          }
        });
      } else {
        callback(400, { Error: 'Could not find the specified user' });
      }
    });
  } else {
    callback(400, { Error: 'Missing Required Fields' });
  }
};

module.exports = handlers;
