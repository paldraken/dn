let checkToken = require('../../services/token.auth');

module.exports = function (req, res, next) {

    if(req.originalUrl === '/appapi/login' && req.method === 'POST') {
        next();
    } else {
        if (req.headers && req.headers.authorization) {
            let parts = req.headers.authorization.split(' ');
            if (parts.length === 2) {
                let scheme = parts[0];
                let credentials = parts[1];

                if (/^Bearer$/i.test(scheme)) {
                    checkToken(credentials)
                        .then((user) => {
                            req.currentUser = user;
                            next();
                        })
                        .catch((err) =>{ res.status(401).send({message: err}) });
                    return;
                }
            }
        }
    }
    res.status(401).send({message: 'Access denied'});

};