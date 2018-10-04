const knexFile = require('./knexfile');
const knex = require('knex')(knexFile['development']);

const bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;