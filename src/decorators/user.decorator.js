"use strict";
exports.__esModule = true;
var common_1 = require("@nestjs/common");
exports.User = common_1.createParamDecorator(function (data, req) {
    return data ? req.user && req.user[data] : req.user;
});
