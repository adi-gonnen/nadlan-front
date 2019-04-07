"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const email_queue_1 = require("./../queue/email.queue");
const getStatusDict = () => ({
    delivered: [],
    processed: [],
    deferred: [],
    dropped: [],
    bounce: []
});
exports.default = (app) => {
    app.post('/sendgrid_notifaction', (req, res) => {
        const sendgridEvents = req.body;
        const eventsByStatus = sendgridEvents.reduce((acc, sendgridEvent) => {
            acc[sendgridEvent.event].push(sendgridEvent);
            return acc;
        }, getStatusDict());
        eventsByStatus.delivered
            .map(ev => ev.sg_message_id.split('.')[0])
            .forEach(email_queue_1.markTransactionEmailRecived);
    });
};
//# sourceMappingURL=email.route.js.map