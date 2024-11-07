"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
app.use('/api/posts', postRoutes_1.default);
config_1.default.sync().then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
});
