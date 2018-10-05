var express = require('express');
var router = express.Router();
const Space = require('../models/space');

/* GET spaces */
router.get('/', async function (req, res, next) {
    const spaces = await Space.forge({}).fetchAll();

    res.json(spaces.toJSON());
});

router.post('/', async function (req, res) {
    const space = await Space.forge(req.body).save();

    res.json(space.toJSON());
});

router.delete('/', async function (req, res) {
    const space = Space.forge(req.body).destroy();

    res.end();
});

module.exports = router;