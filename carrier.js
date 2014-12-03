/* global Game, console, module */
function distance(pos1, pos2) {
    var dx = pos1.x - pos2.x;
    var dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

module.exports = function (creep, defendedSpawn) {
	if(creep.energy < creep.energyCapacity) {
	    var harvesters = creep.room.find(Game.MY_CREEPS, {
            filter: function(object) {
                return object.memory.role == "harvester" && object.energy > 0;
            }
        });
        var carriers = creep.room.find(Game.MY_CREEPS, {
            filter: function(object) {
                return object.memory.role == "carrier" && object.energy < object.energyCapacity;
            }
        });
        var maxAmount = 0,
            bestHarvesterAround = null;
        // console.log(Game.time, "Count of harvesters around", harvesters.length, "Count of carriers around", carriers.length);
        for (var i = 0; i < harvesters.length; i++) {
            // Calcualte weight of the energy which is around
            //
            var currentHarvester = harvesters[i];
            var amount = currentHarvester.energy;
            var totalDistance = 0;
            for (var j = 0; j < carriers.length; j++) {
                if (carriers[j] !== creep) {
                    totalDistance += distance(currentHarvester.pos, carriers[j].pos);
                }
            }

            var normalizedAmount = amount;
            if (totalDistance !== 0) {
                normalizedAmount = amount / totalDistance;
            }

            // console.log(Game.time, "Current harvester", currentHarvester.name, "Energy: ", amount, "Normalized: ", normalizedAmount);
            if (normalizedAmount > maxAmount) {
                maxAmount = normalizedAmount;
                bestHarvesterAround = currentHarvester;
            }
        }

		if (bestHarvesterAround === null) {
		    console.log("No harvesters");
		} else {
    		creep.moveTo(bestHarvesterAround);
    		bestHarvesterAround.transferEnergy(creep);
		}
	} else {
		creep.moveTo(defendedSpawn);
		creep.transferEnergy(defendedSpawn);
	}
};
