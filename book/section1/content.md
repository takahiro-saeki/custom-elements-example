# introduction: web componentsについて
ここ数年でjavascript applicationを開発したことがある人なら一度はgruntやgulp、webpackといったweb applicationを使用した開発を行ったことがあると思います。また同時に何かしらのjavascriptフレームワーク(angular, React.js, Vue.js等の)を使用した経験もあると思います。
きっと誰も初めは「どうしてjavascript界隈はこんなに複雑になってしまったのだろう」と考えたことがあるでしょう。
環境や状況は違えど、数年前と比較するとfront-endの実装領域は拡張され、jQueryを使ったちょっとした動きのある実装をすれば良いだけで済まないケースが多いと思います。

上記に上げたツールはどれも素晴らしいツールだと思います。著者は普段React.jsを使用したwebページやweb application開発を行っていますが、テストケースを書く時や型定義、またproduction, development環境毎の設定等、細かい部分まで設定出来るのは一重にReact.jsのコミニュティのエコシステムが整っているからだと実感します。

ただ、現在ちゃんとした環境を構築するにはdevelopment用のツール(例えばwebpackやjest, flow-type等)の使い方、即ちAPIを使えるようにしなければなりません。またもちろん使用するフレームワークのAPIも使えるようにならないと行けません。

個人的な意見ですが、昨今のjavascriptの勢いは新規参入者の敷居を上げていたり、技術的格差を作っているように思えます。

ただ、もし複雑な設定無く、必要なscriptタグを一行追加し、指定したcustom tagを一つ追加するだけで魅力的なヘッダーコンポーネントを追加出来たらどうでしょう？
また同様にスライダーやボタンやajax通信が発生するようなコンポーネントcustom tag一つで追加出来たらどうでしょうか？

例えばフロントの知識が浅かったとしても、あまりモダンな環境に興味がなかったとしてもまずは誰かが作ったcustom elementsを使用して、次に自分でcustom elementsを作る。そうした良い学習サイクルが作り出せるのではないでしょうか？
残念ながらまだcustom elementsをプロダクション環境で使用するには時期尚早ではあると思いますが、今後のブラウザ側の実装によってどんどんweb componentsはサポートされて行く(と信じています)思います。

今回も基本的な解説とサンプルコードを交えた2章立ての内容となっています。さぁ、web componentsの世界へ飛び込んでみましょう！

# 第1章 web componentsとは
## webcomponentsの構成内容
皆さんはweb componentsをご存知でしょうか？web componentsとは
`再利用可能でカプセル化された独自のHTMLタグを作成するためのWebプラットフォームのAPIです。`
引用: https://qiita.com/jtakiguchi/items/b1315f53b3726ff11b61

また以下の4つの仕様をベースに構成されています。
- Custom Elements
- Shadow DOM
- template
- HTML Imports

簡単に上記の説明をすると
### Custom Elements
新しいHTMLタグを作成したり、既存のHTMLタグを拡張し、より使い易くしたりする仕様です。

### Shadow DOM
HTMLタグやstyleをカプセル化し、隠蔽する仕様です。

### template
HTMLのマークをアップを予めtemplateタグ内に記述することによってページの読み込みの際には使用されないが、template内のDOMをレンダリングする処理を実行する際に読み込まれる仕様です。

### HTML Imports
HTMLを他のHTMLへ読み込ませれるようにする仕様です。

上記のうち、今回はCustom Elementsを中心に説明して行きたいと思います。

## Custom Elementsの使い方
まずはCustom Elementsを使用してみましょう。
また今回のExample Codeは下記GitHubにあります。
https://github.com/takahiro-saeki/custom-elements-example

### custom-btnを作ってみよう
まず簡単なボタンコンポーネントを作ってみましょう。
