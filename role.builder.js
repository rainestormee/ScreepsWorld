var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            var priorityTargets = creep.room.find(FIND_MY_CONSTRUCTION_SITES, { filter: (site) => { return site.structureType == STRUCTURE_EXTENSION || site.structureType == STRUCTURE_CONTAINER} });
            
            if (priorityTargets.length) {
                creep.say('building prio');
                if (creep.build(priorityTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(priorityTargets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
                creep.say('buillding non prio');
                if (targets.length) {
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
                else {
                    creep.say('im finished');
                    creep.moveTo(20, 20);
                }
            }
        }
        else {
            var sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleBuilder;