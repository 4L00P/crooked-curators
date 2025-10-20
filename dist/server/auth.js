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
const passport_1 = __importDefault(require("passport"));
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./db/schemas/users');
require('dotenv').config();
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;
// implement new google strategy: updates/creates user upon login
passport_1.default.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${BASE_URL}/auth/google/callback`
}, function (_accessToken, _refreshToken, profile, cb) {
    // access users schema with findOrCreate
    User.findOrCreate({
        where: { googleId: profile.id },
        defaults: {
            username: 'randomUser',
            email: profile.emails[0].value
        }
    })
        .then(results => {
        const user = results[0].dataValues;
        return cb(null, user);
    })
        .catch((err) => {
        console.log('failed to find or create user', err);
        return cb(err, null);
    });
}));
passport_1.default.serializeUser(function (user, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        process.nextTick(function () {
            return cb(null, user.googleId);
        });
    });
});
passport_1.default.deserializeUser(function (userId, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User.findOne({ where: { googleId: userId } });
            cb(null, user.dataValues);
        }
        catch (err) {
            console.error('Error deserializing user', err);
            cb(err, null);
        }
    });
});
//# sourceMappingURL=auth.js.map