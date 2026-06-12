var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleReserver = require('role.reserver');
var roleDefender = require('role.defender');
var roleRepairer = require('role.repairer');
var roleScout = require('role.scout');
var runTower = require('tower');
var spawnCreeps = require('screep-spawner');

module.exports.loop = function () {
    
    for (var name in Memory.creeps) {

        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    runTower();

    console.log('Current game tick is ' + Game.time);
    spawnCreeps();

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        switch (creep.memory.role) {
            case 'harvester': {
                roleHarvester.run(creep);
                break;
            }
            case 'upgrader': {
                roleUpgrader.run(creep);
                break;
            }
            case 'builder': {
                roleBuilder.run(creep);
                break;
            }
            case 'reserver': {
                roleReserver.run(creep);
                break;
            }
            case 'defender': {
                roleDefender.run(creep);
                break;
            }
            case 'repairer': {
                roleRepairer.run(creep);
                break;
            }
            case 'scout': {
                roleScout.run(creep);
                break;
            }
        }
    }
}
