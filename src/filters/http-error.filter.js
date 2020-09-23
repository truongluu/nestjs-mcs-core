"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var HttpErrorFilter = /** @class */ (function () {
    function HttpErrorFilter() {
    }
    HttpErrorFilter.prototype["catch"] = function (exception, host) {
        var ctx = host.switchToHttp();
        var request = ctx.getRequest();
        var response = ctx.getResponse();
        var status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception.getStatus && typeof exception.getStatus === 'function') {
            status = exception.getStatus();
        }
        var errorResponse = {
            code: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: exception['errmsg'] || exception.message.message || exception.message.error || null
        };
        common_1.Logger.error(request.method + " " + request.url, JSON.stringify(errorResponse), 'ExceptionFilter');
        response.status(status).json(errorResponse);
    };
    HttpErrorFilter = __decorate([
        common_1.Catch()
    ], HttpErrorFilter);
    return HttpErrorFilter;
}());
exports.HttpErrorFilter = HttpErrorFilter;
