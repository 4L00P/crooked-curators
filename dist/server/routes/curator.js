"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.curatorRouter = void 0;
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const { HARVARD_API_KEY } = process.env;
const curatorRouter = (0, express_1.Router)();
exports.curatorRouter = curatorRouter;
// Chicago Art Institute API endpoint
const CHICAGO_API_URL = 'https://api.artic.edu/api/v1/artworks/search';
curatorRouter.get('/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.params.title;
    if (!query) {
        return res.status(400).send({ message: 'Query parameter is required' });
    }
    try {
        console.log(`Fetching artwork for query: ${query}`);
        // First try Chicago API
        const chicagoResponse = yield axios_1.default.get(CHICAGO_API_URL, {
            params: {
                q: query,
                fields: ['id', 'title', 'description', 'image_id'],
                limit: 20
            }
        });
        let pieces = chicagoResponse.data.data.map(record => ({
            title: record.title.substring(0, 60),
            description: record.description || 'No description available',
            image: record.image_id ? `https://www.artic.edu/iiif/2/${record.image_id}/full/843,/0/default.jpg` : ''
        }));
        // Filter out pieces without images and shuffle
        pieces = pieces.filter(({ image }) => image).sort(() => 0.5 - Math.random());
        console.log(`Found ${pieces.length} pieces from Chicago API`);
        // If pieces length is < 4, add harvard pieces
        if (pieces.length < 4) {
            const harvardResponse = yield axios_1.default.get(`https://api.harvardartmuseums.org/object?apikey=${HARVARD_API_KEY}&hasimage=1&title=${query}&sortorder=desc`);
            const harvardPieces = harvardResponse.data.records.map(record => ({
                title: record.title.substring(0, 60),
                description: record.description || 'No description available',
                image: record.images.length > 0 ? record.images[0].baseimageurl : ''
            }));
            // Combine and shuffle all pieces
            pieces = [...pieces, ...harvardPieces.filter(({ image }) => image)]
                .sort(() => 0.5 - Math.random());
        }
        // Take first 4 pieces
        const selection = pieces.slice(0, 4);
        if (selection.length === 0) {
            return res.status(404).send({ message: 'No artwork found matching your search' });
        }
        else {
            return res.send(selection);
        }
    }
    catch (err) {
        console.error('Error fetching artwork:', err);
        return res.status(500).send({ message: 'Error fetching artwork' });
    }
}));
curatorRouter.post('/select', (req, res) => {
    // update reference in db
    res.sendStatus(201);
});
//# sourceMappingURL=curator.js.map