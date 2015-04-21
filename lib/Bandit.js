#!/usr/bin/env node
module.exports = Bandit;

function Bandit(probabilities){
	this.probabilities = probabilities;
	this.length = probabilities.length;
}
Bandit.prototype.draw = draw;
function draw(n){
	return (Math.random()<this.probabilities[n])?1:0;
}

if (!module.parent){
	var b = new Bandit([0.1,0.2,0.3,0.4]);
	for (var i = 0; i<10; i++){
		// Pull some arms at random and print the rewards we get
		console.log(b.draw(Math.floor(Math.random()*4)));
	}
}
