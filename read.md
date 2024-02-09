## 事前準備
・makeコマンドが使える環墧を用意
```bash
    (Linux)
    sudo apt install make
    
    (Mac)
    brew install make
    
    (Windows)
    choco install make
```
<font color="red">注意:</font>makeコマンドはこのプロジェクトrootディレクトリで実行してください。


・ArLocalのimageをインストール
```bash
make docker_pull
```
・コンテナを起動(1984ポートで起動)
```bash
make docker_run
```

## wallet作成
wallet作成をすると、walletのアドレスと秘密鍵が表示されます。
rootディレクトリにwallet.jsonが作成されます。
```bash
  $ make create_address
  
  ## log
    Key: {
    kty: 'RSA',
    n: 'sfNPBZZy0UwXamfGuDEQCVKf9lU1OaN5l8wB-foMqKfiVUbOIasZWJ545FGdTVE0IrIPzpoRhq7THQtlPP6gm1bhHsgjIp_oi9OGXa9sZEH_T1Lz3ectqGqUsUkm_RzxgXnWMtqH0kifRT3JK0H_3GltaMFJSEftrvEY1F5hTvEOpn_YyGpo2fFpHFvh_ZY0rQbvOJUzi3Ki3k2FCtgrNAz_5ubPOV6JB0TRmnvJrMMDoKt6Y4tc_1uEKBwKA9cGsAiVLEeUgvMXpx9PFO5ILMj3-xy7VqHKCh88qoiebGhFILPLIRKvCt_EYDACc0-vOc6HoPI7_oGA9D_iPL8S3_TyYDmQBg9kZFNe1AiG5gEvb7xNEkt_x2BYjIqQFtNtMhxlNaZ91Kun5M8EuTArqoZPegJwHPHuKdjwo_RjJsojI4i8J0_p2Icae6c8Sdgo18f9mAcCrfBU4-nuY-jlagUjDBhtS4iwa7yA2kvngPoVaiA0NLAoe4t1kCF5snfXhuY-LCoO68ij2N-yZ09o-lijIdPHOxwTKzpeWv73P53vjVhNfGAIdDfaET5L8PlSu_OIptsTvCofwGl_13Xn96MsQrKBVG3neiK6JzVEiCCAbLqdJvY333g9v93ozK2PjbTkJHwK4SFaeMlOaUfyOK2CbxibV0iimAjJQMe0nYE',
    e: 'AQAB',
    d: 'I1rUoqbRQZGVXmPnaK2AwuVqWCH2PPEkhZr38o8ySCjw0CIM7sYEd2Wm3a_0aYneap1HhDP6kvB1i8H5l3x8cth4SioXxveP14YLXl4t0h6Fp-AyiO43FUy1paKDz0qale-btcdSsF4S3Moph4FpoQRGQ0eRtH1r9PO8S-dDfJBqqXxhmPIBSnnK-SItPHmFFjJ4QVztXIGGZ9XtfqnTrZf-mMTXO43zeiD7Zu68sykctaWUH6Zu7-IiF-j4OWqVjtBpuN4w3LKJCsBu8RjleJZmJHtBIjVrQ4cQwc36cc3mnBh0nWnNosKyDK1FM11L0lec_UZbUpWuxfhSTeDlkgoB8O7VIdA-kOYCUCC1PCd4BJA5FXz7G5s0eNA_tx8j-U-N6wpIpaSiL9tVV5SQfrofw7cvA1p524P7OCmANG2pzJhDGFIXmmJ_P0rPAzkzUp252rUJVFJ0kNBHb4EpR4HoR2FzwTaKf7ueRM_xs8JRjgTzE622fQA9_kziSJkneLZHD-O2ejJgU8_PgQ1zdvHx1b7MFiH6CzGM9XrzWDUhsU1-UKqLQY-WPC3YNCZC3OsqEJjKoL8pUN9PfgBerM_U59hX1IBfBVlYx6tcotUT9JxJ0jXQ3a76YUZDlghkbplqH-RNgC9IbLgfX84O0sRwci3fw0rxI6QyXyK77qU',
    p: '3lFDEqVFhuuhJ79_HfdPsYODwQCay6HN9hRfCNCtkDoU3j7upJS7JGaOJ_R1jtDLxmE06Q_kf9bTIWU3i3OMPP_WMeHA3Ahw_JcxM5VFuixgqxfOpaBIzSs8XxpSgqGDKRbHceSDJW4yUACPZMlhXOXVFP-FGCBq-4WBxzE1WmTF3rCV8A_7e9J-fG1QPQNTLQMeWqflhpsrMN2evA33s62mN-IT9bEA6sP8lQ2eOoyqWJnwOpOpOXeP41MF_ZuJA2w3UcVwFV1F8-ewbHR5CWjDn-FOx3PIFHRNg9KUjKtcvO8WS85LppPao3u5UNXagbUAt47esj7miDmZ_N16jQ',
    q: 'zOk9vBBB4Tz-ymokK-bZl4EZhDqvKwnDKhnyG1keMKmWRl5Cj2RNKssRgTUZwl--xhg4O2jKu6X73LG5nTFAwKyuw0tNK4FU8JrCogvTrF_nbgx0wcvAPE5rhoSLNPM3Bzo-lyWf4qR_vSPxEV5kHL1iiOawQbO3Ei5_kpDZ4ubM49Vnp3w5i3jFoWgtgD4JzR1IykBpCD2obRok4kQ5bith7hcWvyaJb_-MiYDRDDVAsAsxKBtrS6WClNhD5PD9kZNF5g0ehgPgRc2fRzn6djELRYRs3aD2U_42LoVbTCGgfkf9MCU3lpMB_q0fJi50VWkeaWznlEW1dQ8qb1ZLxQ',
    dp: 'C1ApUJ6Wbio5djNZfaXjKU5e-whT2D7wozAgMeukmW1LOJANRtTGvTB21XOsM8tOQ1cZAS8s2pCNB-sFq5QCs-v0827giJHpZgEvoMdc1_-AH9TDUExayA4GMXS-dCVR7lpZZeNSBSqZZtbQdTmGOdr8P-hM1pB3wTrnAsLvSx1LsGxeBOxbSM7KXvyVE7XCmszI06YtmO72gLMWa81uKHeSuM9JYrxSJqA4j0E1JxeXZ5DV17VB7Em4ScIk0OYET-dG3WNls8CeWa4VnT9EFYV-RvmJL78llFziwO2LX6ksu_SStuLVmLF3c9BM-t8XEniqg6zCimGHC7Gas3J11Q',
    dq: 'G1B8CjWgkoWu8Qx1BeUf3DI5VIb-Ep6ahWIwA7U9cP8qKPcnqDWWk72995s8c8yPgZh45nJxk9HsYN7P_0QxfX2HTkEbaFE1IV1_1Fn_PVsLXoAKkEq4tVE-xA-m_sfs7em1rjA1v-BtpqjD2azba3lTSSx3EksCfEn2d3MXmEdryHMJ_ilxAkZ3EazxY8bhR5Y_vbYYSiDt8p0pjX_KqATgaPxq69AXQfaupSWmuBnhJZZYVyBQjSTi4zRw2HPHWUBocOIOz450ttlSAgyYdmjTN9EPMfvi2g9o6YqdQOi6nBq8hU5wuoGeInSxUkWe_EOm6ia6N-mS5qe-4FiAgQ',
    qi: 'UVWgrHnW2hC4WfMz4aPv36yzLfX_o9hMMdHJwnUoW8Klg7I91RpT69IfmRQOB6USTWNEuZ7GJTD0C66GeIcpma96FNrA71JM3S7j40Q5feTjy_Yp07jT8FoTWh4eVs_RKFWjAxYDOWDxb1fFHaBRG3fq6b1OIVFBlpiFBFM9OEE8TbMO48chCGZkEt2O5CGIMmFwGAIWTyJWGw-WXyqy_AsiQ78_xcN8ewpwWAP8FdlDjZXB5ER-Qgu5yr2G-OAIl4fem_ZbAS3iMYv8IAp0eC8F3wf1y8O60X1wrVVCUnOaVtnzT1m-LmGt5dgIlUHD1OqY3XG3-mNxL225BtVlHw'
  }
  Address: IR3q2gYKajv7QOsVPm07rzuhVwNA18XGTIKSqA5-5oE
```


## 画像をアップロード
画像はpublic folderのpathを指定
```bash
    $ make upload_img
    (node:30116) [DEP0106] DeprecationWarning: crypto.createCipher is deprecated.
    (Use `node --trace-deprecation ...` to show where the warning was created)
    Transaction ID: 5MyhynA5GkAzdoeiKqTLQHrx2t5MVG-xQMtmygKrKtY
    Response: 410
```

## 410エラー回避
トランザクション送信すると410エラー
残高不足の可能性があるため残高を増やす
http://127.0.0.1:1984/mint/＜任意のWallet Address＞/100000000000000
再度トランザクション送信
```bash
    $ make upload_img
    Transaction ID: kTRpHFpl3G8lxjb0jWW43sZMslTqpXZ7An1V-q-EMug
    Response: 200
```

## 画像を取得
画像はpublic folderのpathを指定
```bash
    $ make download_img
    npx tsc
    node dist/downloadAndDecryptImage.js
    Image decrypted and saved.
```


## apiのコード

http://127.0.0.1:1984/[任意のpath] にアクセスすると、以下のようにapiのコードが表示されます。
```javascript
    this.router.get('/logs', utils_2.logsRoute);
    this.router.get('/', status_1.statusRoute);
    this.router.get('/info', status_1.statusRoute);
    this.router.get('/peers', peer_1.peersRoute);
    this.router.get('/reset', utils_2.resetRoute);
    this.router.get('/mine/:qty?', mine_1.mineRoute);
    this.router.get('/mineWithFails/:qty?', mine_1.mineWithFailsRoute);
    this.router.get('/tx_anchor', transaction_1.txAnchorRoute);
    this.router.get('/price/:bytes/:addy?', (ctx) => __awaiter(this, void 0, void 0, function* () { return (ctx.body = Math.round((+ctx.params.bytes / 1000) * 65595508).toString()); }));
    // tx filter endpoint to restrict ans-104 txs
    this.router.get(/^\/tx(?:\/|$)/, transaction_2.txAccessMiddleware);
    this.router.get('/tx/:txid/offset', transaction_1.txOffsetRoute);
    this.router.get('/tx/:txid/status', transaction_1.txStatusRoute);
    this.router.get('/tx/:txid/data', transaction_1.txRawDataRoute);
    this.router.get('/tx/:txid/data.:ext', transaction_1.txDataRoute);
    this.router.get('/tx/:txid/:field', transaction_1.txFieldRoute);
    this.router.get('/tx/:txid/:file', transaction_1.txFileRoute);
    this.router.get('/tx/:txid', transaction_1.txRoute);
    this.router.delete('/tx/:txid', transaction_1.deleteTxRoute);
    this.router.post('/tx', transaction_2.txValidateMiddleware, transaction_1.txPostRoute);
    this.router.post('/chunk', chunk_1.postChunkRoute);
    this.router.get('/chunk/:offset', chunk_1.getChunkOffsetRoute);
    this.router.get('/block/hash/:indep_hash', blocks_1.blocksRoute);
    this.router.get('/block/height/:height', blocks_1.blocksRouteViaHeight);
    this.router.post('/wallet', wallet_1.createWalletRoute);
    this.router.patch('/wallet/:address/balance', wallet_1.updateBalanceRoute);
    this.router.get('/mint/:address/:balance', wallet_1.addBalanceRoute);
    this.router.get('/wallet/:address/balance', wallet_1.getBalanceRoute);
    this.router.get('/wallet/:address/last_tx', wallet_1.getLastWalletTxRoute);
    this.router.head(data_1.dataRouteRegex, data_1.dataHeadRoute);
    this.router.get(data_1.dataRouteRegex, data_1.dataRoute);
    this.router.get('/(.*)', data_1.subDataRoute);
    this.router.get('/:other', (ctx) => {
        ctx.type = 'application/json';
        ctx.body = {
            status: 400,
            error: 'Request type not found.',
        };
    });
```
