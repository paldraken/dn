// before test
const utils = require('../utils');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
let createOrder = require('../utils').createOrder;
let createUser = require('../utils').createUser;

chai.use(chaiHttp);
describe('Orders App API', () => {

    describe('/GET list', async () => {

        console.log('START TEST');
        let order = await createOrder();
        console.log('CREATE ORDER');
        let user = await createUser();
        console.log('CREATE USER');

        chai.request(server)
            .get('/appapi/orders')
            .set('Authorization', `Bearer ${user.api_token}`)
            .end((err, res) => {
                console.log('----->', res.body);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                //done();
            });

    })
});
