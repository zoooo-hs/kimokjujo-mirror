class Mail {
    constructor(receiver, title, content){
        this.receiver = receiver;
        this.title = title;
        this.content = content;
    }

    validation() {
        if (this.receiver == undefined || this.title == undefined || this.content == undefined) {
            return false;
        }
        else {
            return true;
        }
    }
    
}

module.exports = Mail;
