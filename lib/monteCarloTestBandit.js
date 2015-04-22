#!/usr/bin/env node
module.exports = monteCarloTestBandit;

function monteCarloTestBandit(bandit, algorithm, options){
	options = options || {};
	var iterations = options.iterations || 1000;
	var horizon    = options.horizon    || 1000;
	var scores = [], run, step, choice, reward;
	for (step=0; step<horizon; step++) scores.push(0);
	for (run = 0; run < iterations; run++){
		algorithm.init({arms:bandit.length, horizon:horizon});
		for (step = 0; step < horizon; step++) {
			choice = algorithm.choose();
			reward = bandit.draw(choice);
			algorithm.award(choice, reward);
			scores[step] += reward;
		}
	}
	return scores;
}

if (!module.parent){
	var Alg = require('./bandits/'+(process.argv[2]||'FlatRandom'))
	  , alg = new Alg(process.argv[3]&&JSON.parse(process.argv[3]))
	  , Bandit = require('./Bandit')
	  , bandit = new Bandit([0.1,0.2,0.3,0.4])
	  , options = {iterations:1000, horizon:1000}
	  , scores = monteCarloTestBandit(bandit, alg, options)
	  , total  = scores.reduce(function(t,i){return t+i;},0)
	  , average= total / (options.iterations * options.horizon);
	console.log(scores);
	console.log("Total:   ", total);
	console.log("Average: ", average);
	console.log("Repute:  ");
	try {
		alg.repute.map(JSON.stringify).forEach(function(s){console.log(s);});
	}catch(e){}
	console.log("Reality: ",JSON.stringify(bandit.probabilities));
}
