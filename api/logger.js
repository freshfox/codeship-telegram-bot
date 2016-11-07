module.exports = {

    log: function () {
        let args = Array.from(arguments);
        args.unshift(new Date().toISOString());
        console.log.apply(console, args);
    },

    error: function () {
        let args = Array.from(arguments);
        args.unshift(new Date().toISOString());
        console.error.apply(console, args);
    }

};