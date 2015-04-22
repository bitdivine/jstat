#!/usr/bin/env node
module.exports = Bandit;
Bandit.prototype.draw = draw;

function Bandit(probabilities){
	this.probabilities = probabilities.slice(0);
	shuffle(this.probabilities);
	this.length = probabilities.length;
}
function draw(n){
	return (Math.random()<this.probabilities[n])?1:0;
}
function shuffle(a){
	var j,i,t;
	for (i=0; i<a.length; i++){
		t = a[i]; a[i] = a[j=Math.floor(a.length*Math.random())]; a[j] = t;
	}
}

if (!module.parent){
	var b = new Bandit([0.1,0.2,0.3,0.4]);
	for (var i = 0; i<10; i++){
		// Pull some arms at random and print the rewards we get
		console.log(b.draw(Math.floor(Math.random()*4)));
	}
}
