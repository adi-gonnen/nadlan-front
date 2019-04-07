"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const express_jwt_1 = __importDefault(require("express-jwt"));
exports.jwtCheck = express_jwt_1.default({
    secret: 'secretkey'
});
exports.getJwt = (user) => jwt.sign({
    sub: user.id,
    id: user.id,
    username: user.username
}, 'secretkey', { expiresIn: '3 hours' });
exports.decodeJwt = (token) => jwt.decode(token, { complete: true });
//# sourceMappingURL=jwt.service.js.map