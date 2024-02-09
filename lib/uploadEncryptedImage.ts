import fs, {writeFileSync} from 'fs';
import { Buffer } from 'buffer';
import crypto from 'crypto';
import Arweave from "arweave";

const arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http',
});

// ウォレットキーを読み込む
const key = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'));

async function encryptAndUpload(imagePath: string, passphrase: string) {
    // パスフレーズからキーを生成（PBKDF2を使用）
    const salt = crypto.randomBytes(16); // 適切なセキュリティを確保するためのランダムなソルト
    const keyLength = 32; // AES-256のキーレングス
    const iterations = 10000; // PBKDF2の反復回数
    const digest = 'sha256'; // ハッシュ関数
    const iv = crypto.randomBytes(16); // 初期化ベクトル

    // crypto.pbkdf2Syncを使用してパスフレーズからキーを導出
    const derivedKey = crypto.pbkdf2Sync(passphrase, salt, iterations, keyLength, digest);

    // 画像ファイルを読み込む
    const imageBuffer = fs.readFileSync(imagePath);

    // 暗号化
    const cipher = crypto.createCipheriv('aes-256-cbc', derivedKey, iv);
    let encrypted = cipher.update(imageBuffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // 暗号化されたデータとIVを結合（IVは復号化時に必要）
    const encryptedDataWithIv = Buffer.concat([salt, iv, encrypted]);

    // Arweaveトランザクションを作成
    const transaction = await arweave.createTransaction({
        data: encryptedDataWithIv,
    }, key);

    // コンテンツタイプと暗号化方式をタグとして追加
    transaction.addTag('Content-Type', 'application/octet-stream');
    transaction.addTag('Encryption', 'aes-256-cbc');
    transaction.addTag('Encryption-Salt', salt.toString('hex'));
    transaction.addTag('Encryption-IV', iv.toString('hex'));

    // トランザクションを署名して送信
    await arweave.transactions.sign(transaction, key);
    const response = await arweave.transactions.post(transaction);

    console.log('Transaction ID:', transaction.id);
    console.log('Response:', response.status);

    //restponse.statusが200の場合はjsonでトランザクションIDを返す
    if (response.status === 200) {
        const transactionIdObj = { transactionID: transaction.id };
        writeFileSync('./transactionID.json', JSON.stringify(transactionIdObj, null, 4));
    }
}

// 画像パスとパスフレーズを指定
encryptAndUpload('./public/img.png', 'your_passphrase');
