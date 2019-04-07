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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
const fs_1 = require("fs");
const path = __importStar(require("path"));
const util_1 = require("util");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY1);
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
exports.sendPaymentRecived = (emailConfig) => __awaiter(this, void 0, void 0, function* () {
    let template = yield getPaymentReceivedTemplate(emailConfig);
    const msg = {
        to: emailConfig.to,
        from: 'pilatnoreplay@pilat.com',
        subject: 'פילת: הזמנתך התקבלה',
        text: 'פילת: הזמנתך התקבלה',
        html: template
    };
    const response = yield mail_1.default.send(msg);
    return response[0].toJSON().headers['x-message-id'];
});
function getPaymentReceivedTemplate(emailConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const readFileAsync = util_1.promisify(fs_1.readFile);
        let template = yield readFileAsync(path.join(process.cwd(), '/backend/src/views/emailTemplate.html'), 'utf8');
        template = template.replace('{{firstName}}', emailConfig.firstName);
        template = template.replace('{{lastName}}', emailConfig.lastName);
        template = template.replace('{{price}}', emailConfig.sum + '');
        return template;
    });
}
//# sourceMappingURL=email.service.js.map