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
const arweave_1 = __importDefault(require("arweave"));
const fs_1 = __importDefault(require("fs"));
const buffer_1 = require("buffer");
const crypto_1 = __importDefault(require("crypto"));
const arweave = arweave_1.default.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http',
});
function downloadAndDecrypt(transactionId, passphrase) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = yield arweave.transactions.get(transactionId);
        const encryptedDataWithIv = transaction.get('data', { decode: true, string: false });
        // ソルトとIVを取得（アップロード時に保存したもの）
        const salt = encryptedDataWithIv.slice(0, 16);
        const iv = encryptedDataWithIv.slice(16, 32);
        const encryptedData = encryptedDataWithIv.slice(32);
        // キーを導出
        const keyLength = 32; // AES-256のキーレングス
        const iterations = 10000; // PBKDF2の反復回数
        const digest = 'sha256'; // ハッシュ関数
        const derivedKey = crypto_1.default.pbkdf2Sync(passphrase, salt, iterations, keyLength, digest);
        // 復号化
        const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', derivedKey, iv);
        let decrypted = buffer_1.Buffer.concat([decipher.update(encryptedData), decipher.final()]);
        fs_1.default.writeFileSync('./public/get/img.png', decrypted);
        console.log('Image decrypted and saved.');
    });
}
// トランザクションIDとパスフレーズを指定
// うまく以下に場合はtransactionIdを直接指定してください
const transactionIdData = fs_1.default.readFileSync('transactionID.json', 'utf-8');
const transactionIdObj = JSON.parse(transactionIdData);
downloadAndDecrypt(transactionIdObj.transactionID, 'your_passphrase');
