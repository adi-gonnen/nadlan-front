"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbClient_1 = __importDefault(require("../dbClient"));
const email_service_1 = require("../services/email.service");
setInterval(() => __awaiter(this, void 0, void 0, function* () {
    const TransctionCollection = yield dbClient_1.default.connect().then(db => db.collection('transaction'));
    const MS_PER_MINUTE = 60000;
    const fiveMinuteAgo = new Date(Date.now() - 5 * MS_PER_MINUTE);
    // find only to trnasaction that last try to send mail was more five one minute age or not tried at all.
    const notSendTransactions = yield TransctionCollection
        .find({
        $and: [
            { isSent: false },
            { status: 'completed' },
            {
                $or: [{ lastTry: { $lt: fiveMinuteAgo } }, { lastTry: null }]
            }
        ]
    })
        .toArray();
    // send mail to each transaction and update the lastTry and sendgridId in db.
    notSendTransactions.forEach((trans) => __awaiter(this, void 0, void 0, function* () {
        console.log('send mail', trans);
        const sendgridId = yield email_service_1.sendPaymentRecived({
            to: trans.email,
            firstName: trans.firstName,
            lastName: trans.lastName,
            sum: trans.sum
        });
        TransctionCollection.updateOne({ _id: trans._id }, { $set: { sendgridId: sendgridId, lastTry: new Date() } });
    }));
}), 5000);
// find the transaction by the sendgridId and mark it as send (isSent:true)
exports.markTransactionEmailRecived = (sendgridId) => __awaiter(this, void 0, void 0, function* () {
    console.log('mark as sent ', sendgridId);
    const db = yield dbClient_1.default.connect();
    db.collection('transaction').updateOne({ sendgridId }, { $set: { isSent: true } });
});
//# sourceMappingURL=email.queue.js.map