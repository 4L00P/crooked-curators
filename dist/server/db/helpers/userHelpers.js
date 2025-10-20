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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSocketId = exports.updateUsername = void 0;
const users_1 = require("../schemas/users");
// const getUserId = (req) => {
//   return req.user.id
// }
// updates the username in the DB based on the player selected name
// takes in new username and userId
const updateUsername = (newUsername, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield users_1.User.update({ username: newUsername }, { where: { id: userId } })
        .catch((err) => {
        console.error('failed to update username in db', err);
    });
});
exports.updateUsername = updateUsername;
// updates the socketId of a user
// takes in the socketId and a userId
const updateSocketId = (socketId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield users_1.User.update({ socketId: socketId }, { where: { id: userId } })
        .catch((err) => {
        console.error('failed to update socketId in db', err);
    });
});
exports.updateSocketId = updateSocketId;
//# sourceMappingURL=userHelpers.js.map