var mailAdapter = require('../adapters/mail-adapter.js')
const Mail = require('../models/mail.js')

var newMail = new Mail('dogfooter219@gmail.com', 'title', 'content');

mailAdapter.sendMail(newMail,(err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('done');
    }
});
