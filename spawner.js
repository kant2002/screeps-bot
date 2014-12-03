/* global Game, console, module */
module.exports = {
    harvester: function(spawn) {
        // spawn = Game.spawns.Spawn1
        var index = spawn.memory.creepIndex || 0;
        var creepName = 'Worker' + index++;
        var code = spawn.createCreep(
            [Game.WORK, Game.WORK, Game.CARRY, Game.MOVE],
            creepName,
            { role: 'harvester' }
        );
        spawn.memory.lastCreep = "harvester";
        if (code !== Game.ERR_NOT_ENOUGH_ENERGY) {
            spawn.memory.creepIndex = index + 1;
        } else {
            console.log("Not enough energy for worker. Current energy " + spawn.energy);
        }
    },
    carrier: function(spawn) {
        // spawn = Game.spawns.Spawn1
        var index = spawn.memory.creepIndex || 0;
        var creepName = 'Carrier' + index++;
        var code = spawn.createCreep(
            [Game.CARRY, Game.MOVE],
            creepName,
            { role: 'carrier' }
        );
        spawn.memory.lastCreep = "carrier";
        if (code !== Game.ERR_NOT_ENOUGH_ENERGY) {
            spawn.memory.creepIndex = index + 1;
        } else {
            console.log("Not enough energy for carrier. Current energy " + spawn.energy);
        }
    },
    builder: function(spawn) {
        var index = spawn.memory.creepIndex || 0;
        var creepName = 'Builder' + index++;
        var code = spawn.createCreep(
            [Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE],
            creepName,
            { role: 'builder' }
        );
        spawn.memory.lastCreep = "builder";
        if (code !== Game.ERR_NOT_ENOUGH_ENERGY) {
            spawn.memory.creepIndex = index + 1;
        } else {
            console.log("Not enough energy for builder. Current energy " + spawn.energy);
        }
    },
    guard: function(spawn) {
        var index = spawn.memory.creepIndex || 0;
        var creepName = 'Guard' + index++;
        var code = spawn.createCreep(
            [Game.TOUGH, Game.MOVE, Game.MOVE, Game.ATTACK],
            creepName,
            { role: 'guard' }
        );
        spawn.memory.lastCreep = "guard";
        if (code !== Game.ERR_NOT_ENOUGH_ENERGY) {
            spawn.memory.creepIndex = index + 1;
        } else {
            console.log("Not enough energy for guard. Current energy " + spawn.energy);
        }
    },
    archer: function(spawn) {
        var index = spawn.memory.creepIndex || 0;
        var creepName = 'Archer' + index++;
        var code = spawn.createCreep(
            [Game.TOUGH, Game.MOVE, Game.MOVE, Game.RANGED_ATTACK],
            creepName,
            { role: 'guard' }
        );
        spawn.memory.lastCreep = "archer";
        if (code !== Game.ERR_NOT_ENOUGH_ENERGY) {
            spawn.memory.creepIndex = index + 1;
        } else {
            console.log("Not enough energy for archer. Current energy " + spawn.energy);
        }
    },
    healer: function(spawn, includedRole) {
        var index = spawn.memory.creepIndex || 0;
        var creepName = 'Healer' + index++;
        var code = spawn.createCreep(
            [Game.TOUGH, Game.HEAL, Game.MOVE, Game.MOVE],
            creepName,
            { role: 'healer', included: includedRole }
        );
        spawn.memory.lastCreep = "healer";
        if (code !== Game.ERR_NOT_ENOUGH_ENERGY) {
            spawn.memory.creepIndex = index + 1;
        } else {
            console.log("Not enough energy for healer. Current energy " + spawn.energy);
        }
    }
};
