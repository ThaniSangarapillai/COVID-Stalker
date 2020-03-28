"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
const s2 = require('@radarlabs/s2');
const port = 3000;
App_1.default.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    const cell1 = new s2.CellId(9926595695177891840n);
    console.log(cell1.token());
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=Index.js.map