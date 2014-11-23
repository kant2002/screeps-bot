/* global Game, console, module, require */
var harvester_func = require('harvester');
var builder = require('builder');
var healer_func = require('healer');
var guard_func = require('guard');

var harvesters = 0;
var guards = 0;
var builders = 0;
var healer = 0;

var defendedSpawn = Game.spawns.Spawn1;
var targets = defendedSpawn.room.find(Game.HOSTILE_CREEPS);
var damagedCreeps = defendedSpawn.room.find(Game.MY_CREEPS, { filter: function(object) { return object.hits < object.hitsMax; }});
for(var creepName in Game.creeps) {
	var creep = Game.creeps[creepName];

	if(creep.memory.role == 'harvester') {
		harvester_func(creep);
		harvesters++;
	}

	if(creep.memory.role == 'guard') {
	    guard_func(creep, targets, defendedSpawn);
    	guards++;
    }

	if(creep.memory.role == 'healer') {
	    healer_func(creep, damagedCreeps, defendedSpawn);
    	healer++;
    }

    if(creep.memory.role == 'builder') {
		if(creep.energy === 0) {
		    console.log('collecting energy');
			creep.moveTo(Game.spawns.Spawn1);
			Game.spawns.Spawn1.transferEnergy(creep);
		}
		else {
			var targets = creep.room.find(Game.CONSTRUCTION_SITES);
			if (targets.length) {
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
        if (healer === 0 && damagedCreeps.length > 0) {
            if (spawn.energy >= 305) {
                builder.healer(spawn);
            }
        } else {
            if (harvesters <= 5 && targets.length === 0) {
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
}
