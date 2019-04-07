"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
let dbConn = null;
const connectToMongo = () => __awaiter(this, void 0, void 0, function* () {
    // Reuse existing connection if exist
    if (dbConn)
        return dbConn;
    console.log(process.env.DB_URL);
    const client = yield mongodb_1.MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true });
    dbConn = client.db();
    console.log('Connected to MongoDB');
    client.on('close', () => {
        console.log('MongoDB Diconnected!');
        dbConn = null;
    });
    return dbConn;
});
exports.default = {
    connect: connectToMongo
};
//# sourceMappingURL=dbClient.js.map