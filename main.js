/* global Game, console, module, require */
var harvester = require('harvester');
var builder = require('builder');

var harvesters = 0;
var guards = 0;
var builders = 0;

var defendedSpawn = Game.spawns.Spawn1;
var targets = defendedSpawn.room.find(Game.HOSTILE_CREEPS);
for(var creepName in Game.creeps) {
	var creep = Game.creeps[creepName];

	if(creep.memory.role == 'harvester') {
		harvester(creep);
		harvesters++;
	}

	if(creep.memory.role == 'guard') {
    	if(targets.length) {
    	    if (creep.pos.inRangeTo(defendedSpawn, 10) || creep.pos.inRangeTo(targets[0], 15)){
    		    creep.moveTo(targets[0]);
    	    }

    		creep.attack(targets[0]);
    	}

    	guards++;
    }
    if(creep.memory.role == 'builder') {

		if(creep.energy === 0) {
		    console.log('collecting energy');
			creep.moveTo(Game.spawns.Spawn1);
			Game.spawns.Spawn1.transferEnergy(creep);
		}
		else {
			var targets = creep.room.find(Game.CONSTRUCTION_SITES);
			if(targets.length) {
		        console.log('Start building ' + targets[0]);
				creep.moveTo(targets[0]);
				creep.build(targets[0]);
			}
		}

		builders++;
	}
}

for (var spawnName in Game.spawns) {
    var spawn = Game.spawns[spawnName];
    if (spawn.spawning === null) {
        if (harvesters <= 6 && targets.length === 0) {
            if (spawn.energy >= 120) {
                builder.harvester(spawn);
            }
        } else {
            if (spawn.energy >= 220) {
                builder.guard(spawn);
            }
        }
    }
}
