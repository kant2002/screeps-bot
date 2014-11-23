/* global Game, console, module */
module.exports = function (creep, damagedCreeps, defendedSpawn) {
    var findHealTargetOptions = {
        maxOps: 500,
        filter: function(object) {
            return object.hits < object.hitsMax && object != creep;
        }
    };
    var creepToHeal = creep.pos.findNearest(Game.MY_CREEPS, findHealTargetOptions);
    if (creepToHeal !== null) {
	    console.log("HEALER:", creepToHeal);
	    var enemiesAround = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
        if (enemiesAround === null || enemiesAround.length === 0) {
            console.log("HEALER: Not found enemy creeps in range, moving to heal target");
            creep.moveTo(creepToHeal);
            creep.heal(creepToHeal);
        } else {
            console.log("HEALER: Scary to heal since " + enemiesAround.length + " enemies around, go home");
            creep.moveTo(defendedSpawn);
        }
    } else {
        console.log("HEALER: All done, go home");
        if (!creep.pos.inRangeTo(defendedSpawn, 3)) {
            creep.moveTo(defendedSpawn);
        }
    }
};