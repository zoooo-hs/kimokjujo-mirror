var user2db = require('../adapters/user2db-adapter');

user2db.search(1,[],function (result,rows) {
    for ( i in rows){
        console.log(rows[i])
    }
})