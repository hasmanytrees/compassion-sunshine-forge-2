const bookshelf = require('../bookshelf');

const Space = bookshelf.Model.extend({
    tableName: 'space'
});

module.exports = Space;