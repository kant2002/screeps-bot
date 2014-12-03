/* global Game, console, module */
module.exports = function (creep, defendedSpawn) {
	if(creep.energy < creep.energyCapacity) {
        var sources = creep.pos.findNearest(Game.SOURCES, { filter: function(object) { return object.energy >= 10; }});
		if (sources === null) {
		    console.log("No active sources");
		} else {
    		creep.moveTo(sources);
    		creep.harvest(sources);
		}
	} else {
        console.log("I'm full, stop working.");
		//creep.moveTo(defendedSpawn);
		//creep.transferEnergy(defendedSpawn);
	}
};
