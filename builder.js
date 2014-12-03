/* global Game, console, module */
module.exports = function (creep, defendedSpawn) {
    if(creep.energy === 0) {
		creep.moveTo(defendedSpawn);
		defendedSpawn.transferEnergy(creep);
	}
	else {
		var targets = creep.room.find(Game.CONSTRUCTION_SITES);
		if (targets.length) {
	        console.log('Start building ' + targets[0]);
			creep.moveTo(targets[0]);
			creep.build(targets[0]);
		}
	}
};
