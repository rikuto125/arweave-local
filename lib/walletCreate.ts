//walletCreate.ts
import Arweave from 'arweave';
import { writeFileSync } from 'fs';

const arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http',
});

async function createWallet() {
    const key = await arweave.wallets.generate();
    console.log('Key:', key);

    const address = await arweave.wallets.jwkToAddress(key);
    console.log('Address:', address);

    // ウォレットキーをJSONファイルに保存
    writeFileSync('./wallet.json', JSON.stringify(key, null, 4));
    console.log('ウォレットキーをwallet.jsonに保存しました。');

    // addressをJsonファイルに保存
    const jsonAddress = { jsonAddress: address };
    writeFileSync('./address.json', JSON.stringify(jsonAddress, null, 4));
    console.log('アドレスをaddress.jsonに保存しました。');
}

createWallet();
