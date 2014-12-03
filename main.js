/* global Game, console, module, require */
var harvester_func = require('harvester');
var builder = require('spawner');
var healer_func = require('healer');
var guard_func = require('guard');
var carrier_func = require('carrier');

var harvesters = 0;
var carriers = 0;
var guards = 0;
var builders = 0;
var healer = 0;

var defendedSpawn = Game.spawns.Spawn1;
var targets = defendedSpawn.room.find(Game.HOSTILE_CREEPS);
var damagedCreeps = defendedSpawn.room.find(Game.MY_CREEPS, { filter: function(object) { return object.hits < object.hitsMax; }});
var damagedHealers = defendedSpawn.room.find(Game.MY_CREEPS, { filter: function(object) {
    return object.hits < object.hitsMax && object.memory.role === "healer";
}});
for(var creepName in Game.creeps) {
	var creep = Game.creeps[creepName];

	if(creep.memory.role == 'harvester') {
		harvester_func(creep, defendedSpawn);
		harvesters++;
	}

	if(creep.memory.role == 'carrier') {
		carrier_func(creep, defendedSpawn);
		carriers++;
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

function doSpawn(spawn) {
    console.log("Healers, ", healer, "Damaged creeps ", damagedCreeps.length);
    if (healer === 0 && damagedCreeps.length > 0) {
        if (spawn.energy >= 305) {
            builder.healer(spawn, ['guard']);
        }

        return;
    }

    if (harvesters < 3 && targets.length === 0) {
        if (spawn.energy >= 120) {
            builder.harvester(spawn);
        }

        return;
    }

    if (carriers < 4 && targets.length === 0) {
        if (spawn.energy >= 100) {
            builder.carrier(spawn);
        }

        return;
    }

    if (healer === 1 && damagedHealers.length > 0) {
        if (spawn.energy >= 305) {
            builder.healer(spawn, ['harvester']);
        }

        return;
    }

    if (spawn.energy >= 220) {
        builder.guard(spawn);
    }
}

for (var spawnName in Game.spawns) {
    var spawn = Game.spawns[spawnName];
    if (spawn.spawning === null) {
        doSpawn(spawn);
    }
}
