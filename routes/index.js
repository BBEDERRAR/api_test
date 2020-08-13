let radio = require('./api/radio');


module.exports = function (app) {
    app.use('/radios',radio)
}



