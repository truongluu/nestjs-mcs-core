"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var http_exception_1 = require("@nestjs/common/exceptions/http.exception");
var ValidationPipe = /** @class */ (function () {
    function ValidationPipe() {
    }
    ValidationPipe.prototype.transform = function (value, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var metatype, object, errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!value) {
                            throw new common_1.BadRequestException('No data submitted');
                        }
                        metatype = metadata.metatype;
                        if (!metatype || !this.toValidate(metatype)) {
                            return [2 /*return*/, value];
                        }
                        object = class_transformer_1.plainToClass(metatype, value);
                        return [4 /*yield*/, class_validator_1.validate(object)];
                    case 1:
                        errors = _a.sent();
                        if (errors.length > 0) {
                            throw new http_exception_1.HttpException({ message: 'Input data validation failed', errors: this.buildError(errors) }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [2 /*return*/, value];
                }
            });
        });
    };
    ValidationPipe.prototype.buildError = function (errors) {
        var result = {};
        errors.forEach(function (el) {
            var prop = el.property;
            Object.entries(el.constraints).forEach(function (constraint) {
                result[prop + constraint[0]] = "" + constraint[1];
            });
        });
        return result;
    };
    ValidationPipe.prototype.toValidate = function (metatype) {
        var types = [String, Boolean, Number, Array, Object];
        return !types.find(function (type) { return metatype === type; });
    };
    ValidationPipe = __decorate([
        common_1.Injectable()
    ], ValidationPipe);
    return ValidationPipe;
}());
exports.ValidationPipe = ValidationPipe;