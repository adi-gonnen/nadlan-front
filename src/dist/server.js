"use strict";
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
// load the env variables from .env files.
require("./utils/config");
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const jwt_service_1 = require("./services/jwt.service");
const transaction_route_1 = __importDefault(require("./routes/transaction.route"));
const email_route_1 = __importDefault(require("./routes/email.route"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
require("./queue/email.queue");
const app = express_1.default();
const PORT = process.env.PORT || 3000;
const users = [
    { username: 'pilatAdmin', password: 'pilAd1@', id: 1 },
    { username: 'pliatAdmin', password: 'pilAd1@', id: 2 }
];
app.use(cors_1.default());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
transaction_route_1.default(app);
email_route_1.default(app);
app.get('/something', jwt_service_1.jwtCheck, (req, res) => {
    res.json({ msg: 'this is the secret content' });
});
app.get('/getUser', jwt_service_1.jwtCheck, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoedToken = jwt_service_1.decodeJwt(token);
    const id = decoedToken.payload.id;
    const user = users.find(user => user.id === id);
    const userWithoutPass = Object.assign({}, user);
    delete userWithoutPass.password;
    res.json({ user: userWithoutPass });
});
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.status(400).send('you need username and password');
        return;
    }
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        res.status(401).send('User not found!');
        return;
    }
    const token = jwt_service_1.getJwt(user);
    res.status(200).send({ access_token: token });
});
app.use(express_1.default.static('./backend/public'));
app.use(connect_history_api_fallback_1.default());
app.listen(PORT, () => console.log(`app is running at port ${PORT}`));
//# sourceMappingURL=server.js.map