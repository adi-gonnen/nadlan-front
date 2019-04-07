"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_service_1 = require("../services/jwt.service");
const TransactionService = __importStar(require("../services/transaction.service"));
exports.default = (app) => {
    app.get('/api/transactions', jwt_service_1.jwtCheck, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const pageSize = req.query.pageSize && +req.query.pageSize;
        const pageNumber = req.query.pageNumber && +req.query.pageNumber;
        const sortBy = req.query.sortBy;
        const order = req.query.order && +req.query.order;
        const everything = req.query.everything === 'true';
        var result = yield TransactionService.query({
            pageNumber,
            pageSize,
            sortBy,
            order,
            everything
        }, {
            isPassedToExaminee: 'isPassedToExaminee' in req.query ? req.query.isPassedToExaminee === 'true' : undefined,
            isPassedToWrtier: 'isPassedToWrtier' in req.query ? req.query.isPassedToWrtier === 'true' : undefined,
            createdAtFrom: req.query.createdAtFrom ? new Date(req.query.createdAtFrom) : undefined,
            createdAtTo: req.query.createdAtTo ? new Date(req.query.createdAtTo) : undefined,
            passToWriterFrom: req.query.passToWriterFrom ? new Date(req.query.passToWriterFrom) : undefined,
            passToWriterTo: req.query.passToWriterTo ? new Date(req.query.passToWriterTo) : undefined,
            passToExamineeFrom: req.query.passToExamineeFrom ? new Date(req.query.passToExamineeFrom) : undefined,
            passToExamineeTo: req.query.passToExamineeTo ? new Date(req.query.passToExamineeTo) : undefined,
            branch: req.query.branch
        });
        res.json(result);
    }));
    app.post('/api/transactions', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const examineeDetails = req.body;
        examineeDetails.examineeId = examineeDetails.examineeId || 'n/a';
        const savedTransaction = yield TransactionService.add(Object.assign({}, examineeDetails, { createdAt: new Date(), isSent: false, 
            // isSent: true,
            status: 'pending', isPassedToExaminee: false, isPassedToWrtier: false }));
        res.json(savedTransaction);
    }));
    app.patch('/api/transactions/:id/passToWriter', jwt_service_1.jwtCheck, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const transaction = yield TransactionService.findById(req.params.id);
        if (transaction.isPassedToWrtier) {
            transaction.passToWriterAt = null;
            transaction.isPassedToWrtier = false;
        }
        else {
            transaction.passToWriterAt = new Date();
            transaction.isPassedToWrtier = true;
        }
        yield TransactionService.update(transaction);
        res.json({
            transaction
        });
    }));
    app.patch('/api/transactions/:id/passToExamine', jwt_service_1.jwtCheck, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const transaction = yield TransactionService.findById(req.params.id);
        if (transaction.isPassedToExaminee) {
            transaction.passToExamineAt = null;
            transaction.isPassedToExaminee = false;
        }
        else {
            transaction.passToExamineAt = new Date();
            transaction.isPassedToExaminee = true;
        }
        yield TransactionService.update(transaction);
        res.json({
            transaction
        });
    }));
    // Tranzila webhook
    app.post('/api/transactions/success', (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.log('in the success route');
        const _id = req.query.transactionId;
        const firstName = req.query.firstName;
        const lastName = req.query.lastName;
        const sum = Number(req.query.sum);
        const email = req.query.email;
        const tel = req.query.tel;
        const confirmationCode = req.body.ConfirmationCode;
        const tranzilaIndex = Number(req.body.index);
        yield TransactionService.update({
            _id,
            firstName,
            lastName,
            sum,
            email,
            tel,
            confirmationCode,
            tranzilaIndex,
            status: 'completed'
        });
        res.sendFile('src/views/paymentSuccess.html', {
            root: process.cwd() + '/backend'
        });
    }));
    app.post('/api/transactions/failed', (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.log('someone hit the fail route');
        const _id = req.query.transactionId;
        const tranzilaIndex = Number(req.body.index);
        yield TransactionService.update({
            _id,
            status: 'failed',
            tranzilaIndex
        });
        res.sendFile('src/views/paymentFailure.html', {
            root: process.cwd() + '/backend'
        });
    }));
    app.post('/api/transactions/notify', (req, res) => {
        console.log('inside notify route');
        res.send('the notify route');
    });
};
//# sourceMappingURL=transaction.route.js.map