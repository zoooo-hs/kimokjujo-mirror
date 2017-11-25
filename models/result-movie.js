class ResultMovie {
    constructor(id, planMovieId, date, scenario, audience, breakEvenPoint, contract){
     this.id = id;
     this.planMovieId = planMovieId;
     this.date = date;
     this.scenario = scenario;
     this.audience = audience;
     this.breakEvenPoint = breakEvenPoint;
     this.contract = contract;
    }
}

module.exports = ResultMovie;