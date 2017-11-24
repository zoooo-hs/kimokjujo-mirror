var user2db = require('../adapters/user2db-adapter');

user2db.search('ok',[],function (result,rows) {
    for ( i in rows){
        console.log(rows[i])
    }
})