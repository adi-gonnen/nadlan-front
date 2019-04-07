"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY2);
const msg = {
    // to: 'eladf@misterbit.co.il',
    // from: 'okc.elad.35@gmail.com',
    to: 'chen.aviv@misterbit.co.il',
    from: 'chenaviv@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
};
mail_1.default.send(msg);
//# sourceMappingURL=sendgrid.js.map