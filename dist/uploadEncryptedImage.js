"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs_1 = __importStar(require("fs"));
const buffer_1 = require("buffer");
const crypto_1 = __importDefault(require("crypto"));
const arweave_1 = __importDefault(require("arweave"));
const arweave = arweave_1.default.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http',
});
// ウォレットキーを読み込む
const key = JSON.parse(fs_1.default.readFileSync('./wallet.json', 'utf-8'));
function encryptAndUpload(imagePath, passphrase) {
    return __awaiter(this, void 0, void 0, function* () {
        // パスフレーズからキーを生成（PBKDF2を使用）
        const salt = crypto_1.default.randomBytes(16); // 適切なセキュリティを確保するためのランダムなソルト
        const keyLength = 32; // AES-256のキーレングス
        const iterations = 10000; // PBKDF2の反復回数
        const digest = 'sha256'; // ハッシュ関数
        const iv = crypto_1.default.randomBytes(16); // 初期化ベクトル
        // crypto.pbkdf2Syncを使用してパスフレーズからキーを導出
        const derivedKey = crypto_1.default.pbkdf2Sync(passphrase, salt, iterations, keyLength, digest);
        // 画像ファイルを読み込む
        const imageBuffer = fs_1.default.readFileSync(imagePath);
        // 暗号化
        const cipher = crypto_1.default.createCipheriv('aes-256-cbc', derivedKey, iv);
        let encrypted = cipher.update(imageBuffer);
        encrypted = buffer_1.Buffer.concat([encrypted, cipher.final()]);
        // 暗号化されたデータとIVを結合（IVは復号化時に必要）
        const encryptedDataWithIv = buffer_1.Buffer.concat([salt, iv, encrypted]);
        // Arweaveトランザクションを作成
        const transaction = yield arweave.createTransaction({
            data: encryptedDataWithIv,
        }, key);
        // コンテンツタイプと暗号化方式をタグとして追加
        transaction.addTag('Content-Type', 'application/octet-stream');
        transaction.addTag('Encryption', 'aes-256-cbc');
        transaction.addTag('Encryption-Salt', salt.toString('hex'));
        transaction.addTag('Encryption-IV', iv.toString('hex'));
        // トランザクションを署名して送信
        yield arweave.transactions.sign(transaction, key);
        const response = yield arweave.transactions.post(transaction);
        console.log('Transaction ID:', transaction.id);
        console.log('Response:', response.status);
        //restponse.statusが200の場合はjsonでトランザクションIDを返す
        if (response.status === 200) {
            const transactionIdObj = { transactionID: transaction.id };
            (0, fs_1.writeFileSync)('./transactionID.json', JSON.stringify(transactionIdObj, null, 4));
        }
    });
}
// 画像パスとパスフレーズを指定
encryptAndUpload('./public/img.png', 'your_passphrase');
