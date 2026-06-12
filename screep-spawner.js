var spawnCreeps = function () {

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '!️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    } else {
        var room = Game.spawns['Spawn1'].room;
        var level = room.controller.level;
        var hostiles = room.find(FIND_HOSTILE_CREEPS).length;
        var building = room.find(FIND_MY_CONSTRUCTION_SITES).length > 0;

        var creepsTargets = {
            // reserver: { total: 1, priority: 0, attributes: [MOVE, CLAIM] },
            harvester: { total: level, priority: 1, attributes: [WORK, CARRY, MOVE] },
            defender: { total : hostiles + 2, priority: 2, attributes: [ATTACK, ATTACK, MOVE, MOVE, TOUGH]  },
            upgrader: { total: 2 * level, priority: 2, attributes: [WORK, CARRY, MOVE] },
            repairer: { total: level, priority: 2, attributes: [WORK, CARRY, MOVE] },
            builder: { total: building * level, priority: 3, attributes: [WORK, CARRY, MOVE] },
            scout: {total: 1, priority: 10, attributes: [MOVE, MOVE, MOVE]},
        };
        
        if (room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION}}).length == 5) {
            creepsTargets['harvester'].attributes = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
            creepsTargets['upgrader'].attributes = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
            creepsTargets['builder'].attributes = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
            creepsTargets['repairer'].attributes = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
            creepsTargets['defender'].attributes = [ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH];
        }

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
                    { memory: { role: target, target: 'W4N8' } });
                if (result == 0) {
                    
                    console.log('Spawning new ' + target + ': ' + newName);
                    break;
                }

            }
        }
    }
}

module.exports = spawnCreeps;