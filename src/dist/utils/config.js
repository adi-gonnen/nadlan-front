"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let path;
switch (process.env.NODE_ENV) {
    case 'test':
        path = `${__dirname}/../../.env.test`;
        break;
    case 'production':
        path = `${__dirname}/../../.env.production`;
        break;
    default:
        path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path: path });
exports.APP_ID = process.env.APP_ID;
exports.LOG_LEVEL = process.env.LOG_LEVEL;
//# sourceMappingURL=config.js.map