/* global Game, console, module */
module.exports = function (creep, damagedCreeps, defendedSpawn) {
    var findHealTargetOptions = {
        maxOps: 500,
        filter: function(object) {
            // Skip creeps which does not have wounds
            if (object.hits == object.hitsMax) {
                return false;
            }

            // We heal only those who selected
            // or other healers.
            if (creep.memory.included.indexOf(object.memory.role) == -1 && object.memory.role != "healer") {
                return false;
            }

            // Skip yourself
            return object != creep;
        }
    };
    var creepToHeal = creep.pos.findNearest(Game.MY_CREEPS, findHealTargetOptions);
    if (creepToHeal !== null) {
        creep.memory.creepToHeal = creepToHeal.name;
	    var enemiesAround = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
        if (enemiesAround === null || enemiesAround.length === 0 || true) {
            // console.log("HEALER: Not found enemy creeps in range, moving to heal target");
            creep.moveTo(creepToHeal);
            creep.heal(creepToHeal);
        } else {
            console.log("HEALER: Scary to heal since " + enemiesAround.length + " enemies around, go home");
            creep.moveTo(defendedSpawn);
        }
    } else {
        // console.log("HEALER: All done, go home");
        if (!creep.pos.inRangeTo(defendedSpawn, 3)) {
            creep.moveTo(defendedSpawn);
        }
    }
};
