var User = require('../models/user');
module.exports = {
    newUser: function (email, password, role, callback) {
        var newUser = new User();
        newUser.email = email;
        newUser.role = role;
        if (password) newUser.updatePassword(password);
        newUser.save(function (err) {
            if (err)
                throw err;
            callback(newUser);
        });
    }
};