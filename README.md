# うまなり地蔵堂 Public Demo

> このrepositoryは、完全架空データだけを使用した公開UIデモです。

このPublic Demoは競馬予想サービス本体ではありません。実際の予想提供、馬券購入、投票行動を推奨するものではなく、すべての表示はUI確認用の完全架空情報です。

競馬の迷い道に、そっと灯るAIのお堂。

AI妙味指数で、激走馬と危険人気馬を読み解く。
買う勇気も、買わない勇気も。

## 含まれるもの

- うまなり地蔵堂の静的UIデモ
- 完全架空のレースカード
- 画像未配置時にも成立する文字・絵文字fallback
- 公開安全性を確認するテスト

## 含まれないもの

- 実競馬データ、実結果、実オッズ
- 予測モデル、特徴量、学習・予測資産
- DB接続、収集処理、内部運用資料
- Private repositoryの履歴・内容

## デモを見る

静的ファイルを配信できる任意の安全な環境で `web/index.html` を表示してください。
画面上の情報はすべて `web/demo/race_cards.demo.json` の完全架空データです。

## 検証

```powershell
python -m unittest discover -s tests
python -m compileall tests
git diff --check
```

## データ・ライセンス・ブランド

- データ利用条件: [DATA_USAGE.md](DATA_USAGE.md)
- ブランド資産利用条件: [BRAND_ASSET_USAGE.md](BRAND_ASSET_USAGE.md)
- セキュリティ方針: [SECURITY.md](SECURITY.md)
- コード・文書・完全架空demo data: Apache License 2.0

正式画像は未配置です。画面上の「馬蹄 × カ × 宝珠」は正式紋画像ではなく、正式画像未配置時の文字による代替表示です。Apache License 2.0は、名称、キャラクター、正式紋、ロゴ、画像、コピーなどに関する商標権・ブランド利用権を許諾しません。詳細は `BRAND_ASSET_USAGE.md` を参照してください。
