/* global Game, console, module */
function distance(pos1, pos2) {
    var dx = pos1.x - pos2.x;
    var dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function cdistance(pos1, pos2) {
    var dx = pos1.x - pos2.x;
    var dy = pos1.y - pos2.y;
    return Math.max(dx, dy);
}

module.exports = function (creep, targets, defendedSpawn) {
    var spawnDistance = distance(creep.pos, defendedSpawn.pos);
    if (targets.length !== 0) {
        var targetToAttack = creep.pos.findNearest(Game.HOSTILE_CREEPS, { maxOps: 500 });
        var targetDistance = targetToAttack === null ? 100000 : distance(creep.pos, targetToAttack.pos);
        if (spawnDistance <= 2 || targetDistance <= 3) {
            creep.moveTo(targetToAttack);
        } else {
            if (spawnDistance > 4) {
                creep.moveTo(defendedSpawn);
            }
        }

        creep.attack(targetToAttack);
    } else {
        if (spawnDistance > 4) {
            creep.moveTo(defendedSpawn);
        }
    }
};
