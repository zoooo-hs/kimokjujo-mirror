class Session {
    constructor(sessionKey, userType, userId) {
        this.sessionKey = sessionKey;
        this.userType = userType;
        this.userId = userId;
    }
}

module.exports = Session;