"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ribbonsRouter = exports.artworkRouter = exports.gamesRouter = exports.s3UrlRouter = exports.curatorRouter = exports.nameRandomizerRouter = exports.authRouter = void 0;
const auth_redirect_1 = require("./auth-redirect");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return auth_redirect_1.authRouter; } });
const name_randomizer_1 = require("./name-randomizer");
Object.defineProperty(exports, "nameRandomizerRouter", { enumerable: true, get: function () { return name_randomizer_1.nameRandomizerRouter; } });
const curator_1 = require("./curator");
Object.defineProperty(exports, "curatorRouter", { enumerable: true, get: function () { return curator_1.curatorRouter; } });
const s3_storage_1 = require("./s3-storage");
Object.defineProperty(exports, "s3UrlRouter", { enumerable: true, get: function () { return s3_storage_1.s3UrlRouter; } });
const create_game_1 = require("./create-game");
Object.defineProperty(exports, "gamesRouter", { enumerable: true, get: function () { return create_game_1.gamesRouter; } });
const artworks_1 = require("./artworks");
Object.defineProperty(exports, "artworkRouter", { enumerable: true, get: function () { return artworks_1.artworkRouter; } });
const ribbons_1 = require("./ribbons");
Object.defineProperty(exports, "ribbonsRouter", { enumerable: true, get: function () { return ribbons_1.ribbonsRouter; } });
//# sourceMappingURL=index.js.map