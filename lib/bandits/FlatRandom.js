module.exports = FlatRandom;
function FlatRandom(options){
	this.init(options);
}
FlatRandom.prototype.init   = init;
FlatRandom.prototype.choose = choose;
FlatRandom.prototype.award  = award;

function init(options){
	options = options || {};
	this.arms    = options.arms    || this.arms    || 1;
	this.horizon = options.horizon || this.horizon || 1;
}
function choose(){
	return Math.floor(Math.random()*this.arms);
}
function award(arm, award){}
