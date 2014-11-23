/* global Game, console, module */
module.exports = {
    harvester: function(spawn) {
        // spawn = Game.spawns.Spawn1
        var index = spawn.memory.creepIndex || 0;
        var creepName = 'Worker' + index++;
        var code = spawn.createCreep(
            [Game.WORK, Game.CARRY, Game.MOVE],
            creepName,
            { role: 'harvester' }
        );
        if (code !== Game.ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns.Spawn1.memory.creepIndex = index + 1;
        } else {
            console.log("Not enough energy");
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
        if (code !== Game.ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns.Spawn1.memory.creepIndex = index + 1;
        } else {
            console.log("Not enough energy");
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
        if (code !== Game.ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns.Spawn1.memory.creepIndex = index + 1;
        } else {
            console.log("Not enough energy. Current energy " + spawn.energy);
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
        if (code !== Game.ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns.Spawn1.memory.creepIndex = index + 1;
        } else {
            console.log("Not enough energy");
        }
    },
    healer: function(spawn) {
        var index = spawn.memory.creepIndex || 0;
        var creepName = 'Healer' + index++;
        var code = spawn.createCreep(
            [Game.TOUGH, Game.HEAL, Game.MOVE, Game.MOVE],
            creepName,
            { role: 'healer' }
        );
        if (code !== Game.ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns.Spawn1.memory.creepIndex = index + 1;
        } else {
            console.log("Not enough energy for healer");
        }
    }
};
