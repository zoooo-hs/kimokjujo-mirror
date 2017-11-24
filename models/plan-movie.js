class PlanMovie {
    constructor(id,title,original,originalVisible,budget,_3words, breakEvenPoint,releaseMonth,genre,contentRate,directorId,makerId) {
        this.id = id;
        this.title = title;
        this.original = original;
        this.originalVisible = originalVisible;
        this.budget = budget;
        this._3words = _3words;
        this.breakEvenPoint = breakEvenPoint;
        this.releaseMonth = releaseMonth;
        this.genre = genre;
        this.contentRate = contentRate;
        this.directorId = directorId;
        this.makerId = makerId;
    }
}

module.exports = PlanMovie;