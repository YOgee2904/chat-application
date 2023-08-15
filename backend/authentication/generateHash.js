"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHash = exports.createHash = exports.createSalt = void 0;
const crypto_1 = __importDefault(require("crypto"));
// Generate salt
function createSalt() {
    return crypto_1.default.randomBytes(16).toString('hex');
}
exports.createSalt = createSalt;
// Generate hash
function createHash(password, salt) {
    return crypto_1.default.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}
exports.createHash = createHash;
//verify hash
function verifyHash(obj) {
    const hash = createHash(obj.password, obj.salt);
    return hash === obj.hash;
}
exports.verifyHash = verifyHash;
