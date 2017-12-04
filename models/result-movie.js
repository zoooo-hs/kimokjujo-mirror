class ResultMovie {
    constructor(id, planMovieId, date, scenario, audience, breakEvenPoint, contract){
     this.id = id;
     this.planMovieId = planMovieId;
     this.date = date;
     this._scenario = scenario;
     this.audience = audience;
     this.breakEvenPoint = breakEvenPoint;
     this.contract = contract;
    }

    set scenario(newScenario) {
        this._scenario = newScenario;
    }
    
    get scenario() {
        if (this._scenario) {
            return this._scenario;
        }
        else {
            return '';
        }
    }
}

module.exports = ResultMovie;