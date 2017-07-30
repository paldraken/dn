
const appLogin = require('../../services/appapi.login');

module.exports = function (req, res, next) {

    appLogin(req.body.username, req.body.password)
        .then(token => { res.send({'access-token': token}) })
        .catch(err => { res.status(401).send({error: err}) })

};