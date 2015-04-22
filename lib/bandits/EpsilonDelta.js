#!/usr/bin/env node
var tm = require('tree-math');

module.exports = EpsilonDelta;
function EpsilonDelta(options){
	this.init(options);
}

module.exports.prototype.init   = init;
module.exports.prototype.choose = choose;
module.exports.prototype.award  = award;

function init(options){
	options = options || {};
	this.arms    = options.arms    || this.arms    || 1;
	this.horizon = options.horizon || this.horizon || 1;
	this.explore = options.explore || this.explore || 0.1;
	this.repute  = (options.priors || tm.mkArray(this.arms))
		.map(function(prior,i){return {index:i,tries:0,reward:0,expectation:prior};});
}
function choose(){
	var arm;
	if (Math.random()<this.explore){
		return Math.floor(Math.random()*this.arms);
	} else {
		arm =  this.repute.reduce(function(best,reputed){
				return	(best.expectation>reputed.expectation)
					? best : reputed;
			}
		  ,{}
		  );
		return arm.index;
	}
}
function award(arm, reward){
	var repute = this.repute[arm];
	if (repute === undefined) return console.log("No such arm:", arm);
	repute.expectation = (repute.reward+=reward) / ++repute.tries;
}

if (!module.parent){
	var alg = new EpsilonDelta({explore:0.2})
	  , Bandit = require('../Bandit')
	  , bandit = new Bandit([0.1,0.2,0.3,0.4])
	  , test   = require('../monteCarloTestBandit')
	  , scores = test(bandit, alg);
	console.log(scores);
	console.log("Total:   ", scores.reduce(function(t,i){return t+i;},0));
	console.log("Repute:  "); alg.repute.map(JSON.stringify).forEach(function(s){console.log(s);});
	console.log("Reality: ",JSON.stringify(bandit.probabilities));
}
