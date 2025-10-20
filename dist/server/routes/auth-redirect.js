"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
// authRouter is /auth/google
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.get('/', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {
    // console.log('user attempting login', req.body.user);
});
authRouter.get('/callback', passport_1.default.authenticate('google', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('/');
});
authRouter.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
// use this to make user context on frontend as well
authRouter.get('/user', (req, res) => {
    res.send(req.user);
});
//# sourceMappingURL=auth-redirect.js.map