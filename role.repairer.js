var roleRepairer = {

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
            var priorityTargets = creep.room.find(FIND_MY_STRUCTURES, { filter: (site) => { return site.hits != sites.hitsMax} });
            
            if (priorityTargets.length) {
                creep.say('building prio');
                if (creep.repair(priorityTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(priorityTargets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        } else {
            var sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleRepairer;