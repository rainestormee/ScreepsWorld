/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.scout');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {
        if (creep.memory.room != creep.room.name) {
            creep.memory.signed = false;
            creep.memory.room = creep.room.name;
        }
        if (!creep.memory.signed) {
 
            // if (creep.room.controller.sign.text)
            //     creep.memory.signed = true;
 
            if(creep.signController(creep.room.controller, "hello world") == 0) {
                creep.memory.signed = true;
            }
         
            creep.moveTo(creep.room.controller.pos);
        } else {
            if (creep.memory.target) {
                // var exit = creep.room.findExitTo(creep.memory.target);
                // var path = creep.pos.findClosestByPath(exit);
                // console.log(path);
                // creep.moveTo(path);    
                creep.moveTo(49, 32);
            }
        }
        
    }
    
};