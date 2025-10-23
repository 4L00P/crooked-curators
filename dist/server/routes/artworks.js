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
exports.artworkRouter = void 0;
const express_1 = require("express");
const games_1 = require("../db/schemas/games");
const rounds_1 = require("../db/schemas/rounds");
const artworks_1 = require("../db/schemas/artworks");
const axios_1 = __importDefault(require("axios"));
exports.artworkRouter = (0, express_1.Router)();
// post artworks to database by s3 get url
exports.artworkRouter.post('/', ({ body, user }, res) => {
    // destructure body from request
    // const { body, user } = req;
    // destructure game code and image url from body
    const { gameCode, imageUrl } = body;
    // search db by game code to get the game id, then rounds with that game id
    games_1.Game.findOne({
        where: {
            gameCode: gameCode
        }
    })
        .then((game) => {
        const { id } = game;
        // find rounds by game id; sorting by most recent and limiting result to 1
        rounds_1.Round.findAll({
            where: {
                game_id: id,
            },
            limit: 1,
            order: [['createdAt', 'DESC']]
        })
            .then((round) => {
            // with most recent round id, add to artworks with round id, user id, and artwork url
            artworks_1.Artwork.create({
                createdAt: new Date(),
                updatedAt: new Date(),
                artworkSrc: imageUrl,
                round_id: round[0].dataValues.id,
                artist_id: user.id,
                game_id: game.id
            });
        })
            .catch((err) => {
            console.error('Failed to find Rounds with Game ID: SERVER:', err);
        });
    })
        .catch((err) => {
        console.error('Failed to find Game with Game Code, adding Artwork: SERVER:', err);
    });
});
// retrieve artwork from database
exports.artworkRouter.get('/judging/:gameCode', ({ params, user }, res) => {
    // get user and game code from request params
    const { gameCode } = params;
    // search db for game by code
    games_1.Game.findOne({
        where: {
            gameCode: gameCode
        }
    })
        .then((game) => {
        // grab game id and query for round with that id, filtering for most recent
        const { id } = game;
        rounds_1.Round.findAll({
            where: {
                game_id: id,
            },
            limit: 1,
            order: [['createdAt', 'DESC']]
        })
            .then((round) => {
            // get all artworks from that round via round id
            artworks_1.Artwork.findAll({
                where: {
                    round_id: round[0].dataValues.id,
                },
                attributes: ['id', ['artworkSrc', 'source']]
            })
                .then((artworks) => __awaiter(void 0, void 0, void 0, function* () {
                // map over artworks to add status of "FORGERIES" to each
                // make a request while having access to s3 link and await response, reassigning source to body: URI
                const allArtworks = yield artworks.map((_a) => __awaiter(void 0, [_a], void 0, function* ({ dataValues }) {
                    dataValues.status = 'FORGERIES';
                    // make get request to each artwork's source s3 urls
                    const source = dataValues.source;
                    yield axios_1.default.get(source)
                        .then(({ data }) => {
                        dataValues.source = data.body;
                    });
                    return dataValues;
                }));
                // send array of artwork uri's back
                Promise.all(allArtworks)
                    .then((artworks) => res.json(artworks))
                    .catch((err) => console.error('Failed to PROMISE ALL artwork requests: SERVER:', err));
            }));
        })
            .catch((err) => {
            console.error('Failed to find Round via Game ID: SERVER:', err);
        });
    })
        .catch((err) => {
        console.error('Failed to find Game via Game Code: SERVER:', err);
    });
});
// updates artwork with ribbon awarded
exports.artworkRouter.patch('/addRibbons', (req, res) => {
});
// gets all artworks with a ribbon for the ending game gallery
// currently will just pull ALL artworks from the game
exports.artworkRouter.get('/gallery/:gameCode', ({ params }, res) => {
    // get game code from request params
    const { gameCode } = params;
    // find game by game code
    games_1.Game.findOne({
        where: {
            gameCode: gameCode
        }
    })
        .then((game) => {
        // grab game id and query for artworks with that id
        const { id } = game;
        // search artworks with matching round ids & ribbon !== null
        artworks_1.Artwork.findAll({
            where: {
                game_id: id
            }
        })
            .then((artworks) => __awaiter(void 0, void 0, void 0, function* () {
            // map over all artworks to make requests to get image URIs
            const allArtworks = yield artworks.map((_a) => __awaiter(void 0, [_a], void 0, function* ({ dataValues }) {
                // make get request to each artwork's source s3 urls
                const source = dataValues.artworkSrc;
                yield axios_1.default.get(source)
                    .then(({ data }) => {
                    dataValues.source = data.body;
                });
                return dataValues;
            }));
            // promise all artworks to complete requests
            Promise.all(allArtworks)
                // send array of artwork uri's back
                .then((artworks) => res.json(artworks))
                .catch((err) => console.error('Failed to PROMISE ALL artwork requests: SERVER:', err));
        }));
    })
        .catch((err) => {
        console.error('Failed to find Game via Game Code: SERVER:', err);
    });
});
exports.artworkRouter.patch('/ribbons', ({ body }, res) => {
    // pull artworks and ribbons from the body of the req
    const { artworks, ribbons } = body;
    // console.log(ribbons);
    const blueRibbon = ribbons.filter((ribbon) => ribbon.color === 'BLUE')[0];
    const whiteRibbon = ribbons.filter((ribbon) => ribbon.color === 'WHITE')[0];
    const redRibbon = ribbons.filter((ribbon) => ribbon.color === 'RED')[0];
    // get matching artwork and ribbon
    const artworksRibbons = artworks.reduce((acc, artwork) => {
        // object to return to the array
        const obj = {
            artworkId: 0,
            ribbonId: 0
        };
        if (artwork.status === 'BLUE') {
            obj['artworkId'] = artwork.id;
            obj['ribbonId'] = blueRibbon.id;
        }
        else if (artwork.status === 'WHITE') {
            obj['artworkId'] = artwork.id;
            obj['ribbonId'] = whiteRibbon.id;
        }
        else if (artwork.status === 'RED') {
            obj['artworkId'] = artwork.id;
            obj['ribbonId'] = redRibbon.id;
        }
        acc.push(obj);
        return acc;
    }, []);
    console.log(artworksRibbons);
    // update db with artwork and ribbon
    artworksRibbons.forEach((artworkRibbon) => {
        artworks_1.Artwork.update({
            ribbon_id: artworkRibbon.ribbonId
        }, {
            where: {
                id: artworkRibbon.artworkId
            }
        })
            .then(() => {
            console.log('Successful PATCH for Artwork with Ribbon awarded.');
        })
            .catch((err) => {
            console.error('Failed to PATCH Artwork with Ribbon awarded: SERVER:', err);
        });
    });
});
//# sourceMappingURL=artworks.js.map