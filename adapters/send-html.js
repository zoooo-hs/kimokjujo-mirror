var fs = require('fs');

var adapter = {};

adapter.sendHTML = function(fileName, res, next) {
    fs.readFile('./views/'+fileName+'.html', function(err, data) {
        if (err) {
            console.log(err);
            next();
        }
        res.write(data);
        res.end();
    });
}

module.exports = adapter;