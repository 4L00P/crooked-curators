"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomizeName = exports.nameRandomizerRouter = void 0;
const express_1 = require("express");
const randomUsernames_json_1 = __importDefault(require("../randomUsernames.json"));
const nameRandomizerRouter = (0, express_1.Router)();
exports.nameRandomizerRouter = nameRandomizerRouter;
// HELPER
const randomizeName = () => {
    // destructure FIRST and LAST from the json
    const { FIRST, LAST } = randomUsernames_json_1.default;
    // helper for random index
    const randomIndex = (length) => {
        return Math.floor(Math.random() * length);
    };
    return `${FIRST[randomIndex(FIRST.length)]} ${LAST[randomIndex(LAST.length)]}`;
};
exports.randomizeName = randomizeName;
nameRandomizerRouter.get('/', (req, res) => {
    res.send(randomizeName());
});
//# sourceMappingURL=name-randomizer.js.map