var spawnCreeps = function () {

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '!️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    } else {
        var level = Game.spawns['Spawn1'].room.controller.level;

        var creepsTargets = {
            // reserver: { total: 1, priority: 0, attributes: [MOVE, CLAIM] },
            harvester: { total: level, priority: 1, attributes: [WORK, CARRY, MOVE] },
            defender: { total : 5 * level, priority: 2, attributes: [ATTACK, ATTACK, MOVE, MOVE, TOUGH]  },
            builder: { total: level, priority: 2, attributes: [WORK, CARRY, MOVE] },
            upgrader: { total: 2 * level, priority: 3, attributes: [WORK, CARRY, MOVE] },
            builder: { total: level + 1, priority: 2, attributes: [WORK, CARRY, MOVE] },
            repairer: { total: 2, priority: 2, attributes: [WORK, CARRY, MOVE] }
        };

        for (var target in creepsTargets) {
            creepsTargets[target].count = _.filter(Game.creeps, (creep) => creep.memory.role == target).length;
        }

        var sortedTargets = _.sortBy(
            Object.keys(creepsTargets),
            (target) => [creepsTargets[target].count, creepsTargets[target].priority]
        );
        
        for (var i = 0; i < sortedTargets.length; i++) {
            var target = sortedTargets[i];
            if (creepsTargets[target].count < creepsTargets[target].total) {

                var newName = target.charAt(0).toUpperCase() + target.slice(1) + Game.time;
                console.log("Attempting spawn: " + target);

                var result = Game.spawns['Spawn1'].spawnCreep(creepsTargets[target].attributes, newName,
                    { memory: { role: target } });
                if (result == 0) {
                    
                    console.log('Spawning new ' + target + ': ' + newName);
                    break;
                }

            }
        }
    }
}

module.exports = spawnCreeps;