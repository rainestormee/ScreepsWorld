var roleReserver = {
    run: function (creep) {
        console.log("Running reserver " + creep.name);
        // let controller = creep.room.controller;

        // if (creep.pos.isNearTo(controller)) {
        //     creep.reserveController(controller);
        // } else {
        //     creep.moveTo(controller);
        // }
    }
};

module.exports = roleReserver;