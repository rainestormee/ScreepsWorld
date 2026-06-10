var spawnCreeps = function () {

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    } else {
        var level = Game.spawns['Spawn1'].room.controller.level;

        var creepsTargets = {
            harvester: { total: 2 * level, priority: 1 },
            builder: { total: 2 * (level - 1), priority: 2 },
            upgrader: { total: 2 * level, priority: 3 }
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
}

module.exports = spawnCreeps;