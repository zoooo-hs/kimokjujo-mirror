class EngineMoive {
    constructor(id, title, original, originalVisible, budget, _3words, breakEvenPoint, date, genre, contentRate, audience, directorId, makerId) {
        this.id = id;
        this.title = title;
        this.original = original;
        this.originalVisible = originalVisible;
        this.budget = budget;
        this._3words = _3words;
        this.breakEvenPoint = breakEvenPoint;
        this.date = date;
        this.genre = genre;
        this.contentRate = contentRate;
        this.audience = audience;
        this.directorId = directorId;
        this.makerId = makerId;
    }
}

module.exports = EngineMoive;