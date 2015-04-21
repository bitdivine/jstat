#!/usr/bin/env node
module.exports = monteCarloTestBandit;

function monteCarloTestBandit(bandit, algorithm, options){
	options = options || {};
	var iterations = options.iterations || 1000;
	var horizon    = options.horizon    || 1000;
	var scores = [], run, step;
	for (step=0; step<horizon; step++) scores.push(0);
	for (run = 0; run < iterations; run++){
		algorithm.init({arms:bandit.length, horizon:horizon});
		for (step = 0; step < horizon; step++) scores[step] += bandit.draw(algorithm.choose());
	}
	return scores;
}

if (!module.parent){
	var Alg = require('./bandits/FlatRandom')
	  , alg = new Alg()
	  , Bandit = require('./Bandit')
	  , bandit = new Bandit([0.1,0.2,0.3,0.4]);
	console.log(monteCarloTestBandit(bandit, alg));
}
