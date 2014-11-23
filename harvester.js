/* global Game, console, module */
module.exports = function (creep) {
	if(creep.energy < creep.energyCapacity) {
		var sources = creep.pos.findNearest(Game.SOURCES_ACTIVE);
		if (sources.length === 0) {
		    console.log("No active sources");
		} else {
    		creep.moveTo(sources[0]);
    		creep.harvest(sources[0]);
		}
	}
	else {
		creep.moveTo(Game.spawns.Spawn1);
		creep.transferEnergy(Game.spawns.Spawn1);
	}
};
