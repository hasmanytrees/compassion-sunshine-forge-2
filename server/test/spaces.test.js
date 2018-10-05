const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const Space = require('../models/space');

describe('spaces router', function () {
    let api;

    beforeEach(() => {
        api = request(app);
    });

    afterEach(async () => {
        const spaces = await Space.forge({}).fetchAll();
        return Promise.all(spaces.map((space) => space.destroy()));
    });

    it('returns a list of spaces in the database', async () => {
        const space = {
            name: 'Test Space 1',
            memory_quotamb: 20,
            disk_quotamb: 40
        };

        await Space.forge(space).save();

        const res = await api.get('/spaces');

        expect(res.body.length).to.equal(1);
        expect(res.body[0].name).to.equal(space.name);
        expect(res.body[0].memory_quotamb).to.equal(space.memory_quotamb);
        expect(res.body[0].disk_quotamb).to.equal(space.disk_quotamb);
    });

    it('should store spaces in the database', async () => {
        const space = {
            name: 'New Space 1',
            memory_quotamb: 70,
            disk_quotamb: 90
        };

        const res = await api.post('/spaces').send(space);

        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(space.name);
        expect(res.body.memory_quotamb).to.equal(space.memory_quotamb);
        expect(res.body.disk_quotamb).to.equal(space.disk_quotamb);
    });

    it('should delete space in the database', async () => {
        let space = {
            name: 'New Space 1',
            memory_quotamb: 70,
            disk_quotamb: 90
        };

        space = (await api.post('/spaces').send(space)).body;

        let count = 0;

        count = (await api.get('/spaces')).body.length;

        expect(count).to.equal(1);

        await api.delete('/spaces').send(space);

        count = (await api.get('/spaces')).body.length;

        expect(count).to.equal(0);
    });
});