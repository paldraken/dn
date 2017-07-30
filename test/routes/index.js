// before test
const utils = require('../utils');
const fs = require('fs');
const path = require('path');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Order', () => {

    describe('/GET list', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/list')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.eql({foo: 'bar'});
                    done();
                });
        });
    });

    describe('/POST order', () => {

        it('it should POST to create a donor search order', (done) => {

            let order = {
                fio: 'Test123',
                phone: '1234567890',
                email: 'aaa@aaaa.ru',
            };

            chai.request(server)
                .post('/order')
                .field('fio', 'Test123')
                .field('phone', '1234567890')
                .field('email', 'aaa@aaaa.ru')
                .attach('photos', fs.readFileSync(path.join(__dirname, 'index.js') ), 'avatar.png')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });

        })
    })

});