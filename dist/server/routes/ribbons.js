"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ribbonsRouter = void 0;
const express_1 = require("express");
const ribbons_1 = require("../db/schemas/ribbons");
exports.ribbonsRouter = (0, express_1.Router)();
exports.ribbonsRouter.get('/', (req, res) => {
    // helper for random index
    const randomIndex = (length) => {
        return Math.floor(Math.random() * length);
    };
    // find all ribbons
    ribbons_1.Ribbon.findAll({})
        .then((ribbons) => {
        const fullRibbons = [];
        // split ribbons into blue, white, and red arrays
        const blueRibbons = ribbons.filter(({ dataValues }) => {
            return dataValues.color === 'BLUE';
        });
        fullRibbons.push(blueRibbons[randomIndex(blueRibbons.length)]);
        const whiteRibbons = ribbons.filter(({ dataValues }) => {
            return dataValues.color === 'WHITE';
        });
        fullRibbons.push(whiteRibbons[randomIndex(whiteRibbons.length)]);
        const redRibbons = ribbons.filter(({ dataValues }) => {
            return dataValues.color === 'RED';
        });
        fullRibbons.push(redRibbons[randomIndex(redRibbons.length)]);
        // map over all to alter objects
        const roundRibbons = fullRibbons.map(({ dataValues }) => {
            const { id, color, description, points, source } = dataValues;
            let ribbon = {
                id: id,
                color: color,
                description: description,
                points: points,
                source: source,
            };
            return ribbon;
        });
        res.json(roundRibbons);
    });
});
//# sourceMappingURL=ribbons.js.map