#!/usr/bin/env node
module.exports = random_weighted_choice;

function random_weighted_choice(weights){
	var ans = -1, total = 0.0, i, num = weights.length;
	for (var i=0; i<num; i++){
		total += weights[i];
		if (Math.random()*total <= weights[i]) ans = i;
	}
	return ans;
}

if (!module.parent){
	// Test the above by running something like this:
	// ./lib/randomWeightedChoice.js 8 4 2 1
	var weights = process.argv.slice(2).map(Number);
	var counts  = weights.map(function(){return 0;});
	for (var i=0; i<1000000; i++) counts[random_weighted_choice(weights)]++;
	console.log(counts);
}
