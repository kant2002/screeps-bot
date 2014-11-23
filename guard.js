/* global Game, console, module */
module.exports = function (creep, targets, defendedSpawn) {
    if (targets.length !== 0) {
        var targetToAttack = creep.pos.findNearest(Game.HOSTILE_CREEPS, { maxOps: 500 });
        if (creep.pos.inRangeTo(defendedSpawn, 2) || creep.pos.inRangeTo(targetToAttack, 3)) {
            creep.moveTo(targetToAttack);
        }

        creep.attack(targetToAttack);
    } else {
        if (!creep.pos.inRangeTo(defendedSpawn, 3)) {
            creep.moveTo(defendedSpawn);
        }
    }
};
