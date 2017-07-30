const path = require('path');

const development = {
  db: 'mongodb://127.0.0.1/donor_dev'
};

const test = {
  db: 'mongodb://127.0.0.1/donor_test'
};


const production = {
  db: 'mongodb://127.0.0.1/donor'
};


const defaults = {
  root: path.join(__dirname, '..'),
};

module.exports = {
  development: Object.assign({}, development, defaults),
  test: Object.assign({}, test, defaults),
  production: Object.assign({}, production, defaults)
}[process.env.NODE_ENV || 'development'];
