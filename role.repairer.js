var roleBuilder = require('role.builder');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }

        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('repair');
        }

        if (creep.memory.building) {

            var priorityTargets = creep.room.find(
                FIND_MY_STRUCTURES,
                {
                    filter: structure => structure.hits < structure.hitsMax && structure.hits < 3000
                }
            );

            priorityTargets.sort((a, b) =>
                (a.hits / a.hitsMax) - (b.hits / b.hitsMax)
            );

            if (priorityTargets.length > 0) {
                var target = priorityTargets[0];

                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {
                        visualizePathStyle: { stroke: '#ffffff' }
                    });
                }
            } else {
                var targets = creep.room.find(
                    FIND_STRUCTURES,
                    {
                        filter: structure => structure.hits < structure.hitsMax
                    }
                );
    
                targets.sort((a, b) =>
                    (a.hits / a.hitsMax) - (b.hits / b.hitsMax)
                );
                
                if (targets.length > 0) {
                    creep.say("non p rep");
                    var target = targets[0];
                    if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {
                            visualizePathStyle: { stroke: '#ffffff' }
                        });
                    }
                } else {
                    roleBuilder.run(creep);
                }
            }

        } else {

            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

            if (source) {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {
                        visualizePathStyle: { stroke: '#ffaa00' }
                    });
                }
            }
        }
    }
};

module.exports = roleRepairer;