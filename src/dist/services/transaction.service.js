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
const mongodb_1 = require("mongodb");
const dbClient_1 = __importDefault(require("../dbClient"));
const getRange = (from, to) => {
    const range = {};
    if (from !== undefined)
        range.$gte = from;
    if (to !== undefined)
        range.$lte = to;
    return range;
};
const createdAtRange = (filterOptions) => (filterOptions.createdAtFrom || filterOptions.createdAtTo) ?
    ({ createdAt: getRange(filterOptions.createdAtFrom, filterOptions.createdAtTo) })
    : {};
const passToExamineAtRange = (filterOptions) => (filterOptions.passToExamineeFrom || filterOptions.passToExamineeTo) ?
    { passToExamineAt: getRange(filterOptions.passToExamineeFrom, filterOptions.passToExamineeTo) }
    : {};
const passToWriterRange = (filterOptions) => (filterOptions.passToWriterTo || filterOptions.passToWriterFrom) ?
    { passToWriterAt: getRange(filterOptions.passToWriterFrom, filterOptions.passToWriterTo) }
    : {};
const simpleFilter = (filterOptions, prop) => (filterOptions[prop] !== undefined) ? { [prop]: filterOptions[prop] } : {};
exports.query = ({ pageSize = 50, pageNumber = 1, sortBy = 'createdAt', order = -1, everything = false, } = {}, filterOptions = {}) => __awaiter(this, void 0, void 0, function* () {
    const filter = Object.assign({}, simpleFilter(filterOptions, 'branch'), simpleFilter(filterOptions, 'isPassedToExaminee'), simpleFilter(filterOptions, 'isPassedToWrtier'), createdAtRange(filterOptions), passToExamineAtRange(filterOptions), passToWriterRange(filterOptions));
    const db = yield dbClient_1.default.connect();
    var collectionCursor = db.collection('transaction').find(filter);
    if (everything) {
        const results = yield collectionCursor
            .sort({ [sortBy]: order })
            .toArray();
        return { elements: results, count: results.length, maxPage: 1 };
    }
    const countPrm = collectionCursor.count();
    const dataPrm = collectionCursor
        .sort({ [sortBy]: order })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .toArray();
    const [count, elements] = yield Promise.all([countPrm, dataPrm]);
    const maxPage = Math.ceil(count / pageSize);
    return { count, elements, maxPage };
});
exports.add = (transaction) => __awaiter(this, void 0, void 0, function* () {
    const TransactionCollection = yield getTransactionCollection();
    const { insertedId } = yield TransactionCollection
        .insertOne(transaction);
    return TransactionCollection.findOne({ _id: insertedId });
});
exports.update = (transaction) => __awaiter(this, void 0, void 0, function* () {
    const _id = new mongodb_1.ObjectID(transaction._id);
    delete transaction._id;
    const db = yield dbClient_1.default.connect();
    return db
        .collection('transaction')
        .updateOne({ _id }, { $set: transaction });
});
exports.findById = (_id) => __awaiter(this, void 0, void 0, function* () {
    const transactionCollection = yield getTransactionCollection();
    return transactionCollection.findOne({
        _id: new mongodb_1.ObjectID(_id)
    });
});
function getTransactionCollection() {
    return dbClient_1.default.connect().then(db => db.collection('transaction'));
}
//# sourceMappingURL=transaction.service.js.map