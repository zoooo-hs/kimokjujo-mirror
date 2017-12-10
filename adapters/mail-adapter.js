var user1Adpater = require('./user1db-adapter');
var user2Adpater = require('./user2db-adapter');

var nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport')

const mailConfig = require('../secure-config').mailConfig;

var apdapter = {};

apdapter.sendMail = function(mail, cb) {

    // validation
    if (!mail.validation()) {
        var err = new Error("mail instance is not valid");
        err.code = "MAIL_VALIDATION"
        cb(err);
    }
    else {

        var smtpTransport = nodemailer.createTransport(mailConfig);

        var mailOptions = {  
            from: '김옥주조 서비스 <kimokjujo@gmail.com>',
            to: mail.receiver,
            subject: mail.title,
            text: mail.content
        };

        smtpTransport.sendMail(mailOptions, function(error, response){

            if (error){
                console.log(error);

            } else {
                console.log("Message sent : " + response.message); 
            }
            smtpTransport.close();
            cb(null);

        }); 
    }
}


module.exports = apdapter;
