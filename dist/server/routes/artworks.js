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
const axios_1 = __importDefault(require("axios"));
// -------------------[SCHEMAS]------------------
const games_1 = require("../db/schemas/games");
const rounds_1 = require("../db/schemas/rounds");
const artworks_1 = require("../db/schemas/artworks");
const ribbons_1 = require("../db/schemas/ribbons");
// -------------------[ROUTER]-------------------
exports.artworkRouter = (0, express_1.Router)();
// ----------------[POST ARTWORK]----------------
// post artworks to database by s3 get url
exports.artworkRouter.post('/', ({ body, user }, res) => {
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
            })
                .then(() => {
                res.sendStatus(201);
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
// ----------------[GET ARTWORKS]----------------
// retrieve artworks from database for judging view
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
                const allArtworks = yield artworks.map((_a) => __awaiter(void 0, [_a], void 0, function* ({ dataValues }) {
                    // make status for default value. used for drag & drop in client
                    dataValues.status = 'FORGERIES';
                    const source = dataValues.source;
                    // make a request while having access to s3 link and await response, reassigning source to body: URI
                    yield axios_1.default.get(source)
                        .then(({ data }) => {
                        dataValues.source = data.body;
                    });
                    return dataValues;
                }));
                // send array of artwork uri's back
                Promise.all(allArtworks)
                    .then((artworks) => res.status(200).json(artworks))
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
// gets all artworks with a ribbon for the ending game gallery
// currently will just pull ALL artworks from the game
// goal is to have only artworks that earned ribbons to show
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
                .then((artworks) => res.status(200).json(artworks))
                .catch((err) => console.error('Failed to PROMISE ALL artwork requests: SERVER:', err));
        }));
    })
        .catch((err) => {
        console.error('Failed to find Game via Game Code: SERVER:', err);
    });
});
// retrieve artworks from the game and calculate points based on ribbons awarded
exports.artworkRouter.get('/points/:user_id/:gameCode', ({ params }, res) => {
    // pull user id and game code from params
    const { user_id, gameCode } = params;
    // find game by code
    games_1.Game.findOne({
        where: {
            gameCode: gameCode
        }
    })
        .then((game) => {
        // get all artworks from the game and user
        artworks_1.Artwork.findAll({
            where: {
                game_id: game.id,
                artist_id: user_id
            }
        })
            .then((artworks) => __awaiter(void 0, void 0, void 0, function* () {
            // to accumulate player's points from each artwork
            let playerPoints = 0;
            // filter artworks to only artworks that have ribbons !== null
            const artworksThatHaveRibbons = artworks.filter(({ dataValues }) => {
                return dataValues.ribbon_id !== null;
            });
            // reduce over filtered artworks
            const artworksWithRibbons = yield artworksThatHaveRibbons.map((_a) => __awaiter(void 0, [_a], void 0, function* ({ dataValues }) {
                const obj = {
                    artwork: dataValues,
                    ribbon: {}
                };
                yield ribbons_1.Ribbon.findOne({
                    where: dataValues.ribbon_id
                }, {
                    attributes: ['id', 'description', 'points', 'source']
                })
                    .then(({ dataValues }) => {
                    // add ribbon to artwork object with points, title, and source
                    obj.ribbon = dataValues;
                })
                    .catch((err) => {
                    console.error('Failed to get A Ribbon for an Artwork: SERVER:', err);
                });
                return obj;
            }), []);
            // promise all to ensure that the values resolve
            yield Promise.all(artworksWithRibbons)
                .then((values) => {
                values.forEach((artwork) => {
                    const { points } = artwork.ribbon;
                    playerPoints += points;
                });
            })
                .catch((err) => console.error('Failed to PROMISE ALL artworks with their ribbon requests: SERVER:', err));
            // send back points in response
            res.status(200).json(playerPoints);
        }));
    })
        .catch((err) => {
        console.error('Failed to find Game with GameCode: SERVER:', err);
    });
});
// ---------------[PATCH ARTWORK]----------------
// updates artwork when awarded a ribbon from judging
exports.artworkRouter.patch('/ribbons', (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ body }, res) {
    // pull artworks and ribbons from the body of the req
    const { artworks, ribbons } = body;
    // filter through ribbons to separate each ribbon for easier access
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
    // update db with artwork and ribbon
    yield artworksRibbons.forEach((artworkRibbon) => {
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
            res.send(500);
            console.error('Failed to PATCH Artwork with Ribbon awarded: SERVER:', err);
            res.sendStatus(500);
        });
    });
    res.sendStatus(201);
}));
//# sourceMappingURL=artworks.js.map