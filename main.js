/* global Game, console, module, require */
var harvester_func = require('harvester');
var builder_func = require('builder');
var spawner = require('spawner');
var healer_func = require('healer');
var guard_func = require('guard');
var carrier_func = require('carrier');

var harvesters = 0;
var carriers = 0;
var guards = 0;
var builders = 0;
var healer = 0;

// Now for builders not enough energy produced,
// and they are energy drains
var supportBuilders = false;

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
		builder_func(creep, defendedSpawn);
		builders++;
	}
}

function doSpawn(spawn) {
    if (healer === 0 && damagedCreeps.length > 0) {
        if (spawn.energy >= 305) {
            spawner.healer(spawn, ['guard']);
        }

        return;
    }

    if (harvesters < 3 && targets.length === 0) {
        if (spawn.energy >= 170) {
            spawner.harvester(spawn);
        }

        return;
    }

    if (carriers < 4 && targets.length === 0) {
        if (spawn.energy >= 100) {
            spawner.carrier(spawn);
        }

        return;
    }

    if (healer === 1 && builders < 1 && supportBuilders) {
        if (spawn.energy >= 160) {
            spawner.builder(spawn);
        }

        return;
    }

    if (healer === 1 && damagedHealers.length > 0) {
        if (spawn.energy >= 305) {
            spawner.healer(spawn, ['harvester']);
        }

        return;
    }

    if (spawn.energy >= 220) {
        spawner.guard(spawn);
    }
}

for (var spawnName in Game.spawns) {
    var spawn = Game.spawns[spawnName];
    if (spawn.spawning === null) {
        doSpawn(spawn);
    }
}
