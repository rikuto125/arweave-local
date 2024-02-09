import Arweave from 'arweave';
import fs from 'fs';
import { Buffer } from 'buffer';
import crypto from 'crypto';

const arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http',
});

async function downloadAndDecrypt(transactionId: string, passphrase: string) {
    const transaction = await arweave.transactions.get(transactionId);
    const encryptedDataWithIv = transaction.get('data', {decode: true, string: false});

    // ソルトとIVを取得（アップロード時に保存したもの）
    const salt = encryptedDataWithIv.slice(0, 16);
    const iv = encryptedDataWithIv.slice(16, 32);
    const encryptedData = encryptedDataWithIv.slice(32);

    // キーを導出
    const keyLength = 32; // AES-256のキーレングス
    const iterations = 10000; // PBKDF2の反復回数
    const digest = 'sha256'; // ハッシュ関数
    const derivedKey = crypto.pbkdf2Sync(passphrase, salt, iterations, keyLength, digest);

    // 復号化
    const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, iv);
    let decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

    fs.writeFileSync('./public/get/img.png', decrypted);
    console.log('Image decrypted and saved.');
}

// トランザクションIDとパスフレーズを指定
// うまく以下に場合はtransactionIdを直接指定してください
const transactionIdData = fs.readFileSync('transactionID.json', 'utf-8');
const transactionIdObj = JSON.parse(transactionIdData);


downloadAndDecrypt(transactionIdObj.transactionID, 'your_passphrase');
