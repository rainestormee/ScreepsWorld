var spawnCreeps = function () {

    var creepsTargets = {
        harvester: { total: 2, priority: 1 },
        builder: { total: 2, priority: 2 },
        upgrader: { total: 2, priority: 3 }
    };

    for (var target in creepsTargets) {
        creepsTargets[target].count = _.filter(Game.creeps, (creep) => creep.memory.role == target).length;
    }

    var sortedTargets = _.sortBy(Object.keys(creepsTargets), (target) => creepsTargets[target].priority);

    for (var i = 0; i < sortedTargets.length; i++) {
        var target = sortedTargets[i];
        if (creepsTargets[target].count < creepsTargets[target].total) {

            var newName = target.charAt(0).toUpperCase() + target.slice(1) + Game.time;

            console.log('Spawning new ' + target + ': ' + newName);
            var result = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: target } });
            return;
        }
    }
}

module.exports = spawnCreeps;