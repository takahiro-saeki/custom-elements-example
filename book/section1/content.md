# introduction: web componentsについて
ここ数年でjavascript applicationを開発したことがある人なら一度はgruntやgulp、webpackといったweb applicationを使用した開発を行ったことがあると思います。また同時に何かしらのjavascriptフレームワーク(angular, React.js, Vue.js等の)を使用した経験もあると思います。
きっと誰もが初めは「どうしてjavascript界隈はこんなに複雑になってしまったのだろう」と考えたことがあるでしょう。
環境や状況は違えど、数年前と比較するとfront-endの実装領域は拡張され、jQueryを使ったちょっとした動きのある実装をすれば良いだけで済まないケースが多いと思います。

上記に上げたツールはどれも素晴らしいツールだと思います。著者は普段React.jsを使用したwebページやweb application開発を行っていますが、テストケースを書く時や型定義、またproduction, development環境毎の設定等、細かい部分まで設定出来るのは一重にReact.jsのコミニュティのエコシステムが整っているからだと実感します。

ただ、現在ちゃんとした環境を構築するにはdevelopment用のツール(例えばwebpackやjest, flow-type等)の使い方、即ちAPIを使えるようにしなければなりません。また、もちろん使用するフレームワークのAPIも使えるようにならないと行けません。

個人的な意見ですが、昨今のjavascriptの勢いは新規参入者の敷居を上げていたり、技術的格差を作っているように思えます。

ただ、もし複雑な設定無く、必要なscriptタグを一行追加し、指定したcustom tagを一つ追加するだけで魅力的なヘッダーコンポーネントを追加出来たらどうでしょう？
また同様にスライダーやボタンやajax通信が発生するようなコンポーネントcustom tag一つで追加出来たらどうでしょうか？

例えばフロントの知識が浅かったとしても、あまりモダンな環境に興味がなかったとしてもまずは誰かが作ったcustom elementsを使用して、次に自分でcustom elementsを作る。そうした良い学習サイクルが作り出せるのではないでしょうか？
残念ながらまだcustom elementsをプロダクション環境で使用するには時期尚早ではあると思いますが、今後のブラウザ側の実装によってどんどんweb componentsはサポートされて行く(と信じています)思います。

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

## Custom Elementsのブラウザの対応状況
Custom Elementsのブラウザの対応状況は下記のようになります。
` ここに画像 `
EDGEとFIREFOX以外は基本的に問題無く使用出来、且つEDGEやFIREFOXでもpolyfillを使用することにより使用することが出来ます。
現状モダンブラウザーでpolyfillを使用することにより問題無く動作することが出来ます。

またpolyfillは `webcomponentsjs` を使用します。
https://github.com/webcomponents/webcomponentsjs

## Custom Elementsの使い方
まずはCustom Elementsを使用してみましょう。
また今回のExample Codeは下記GitHubにあります。
https://github.com/takahiro-saeki/custom-elements-example

## Custom Elementsのライフサイクル
Custom Elementsにはライフサイクルメソッドが存在します。
主なメソッドは、
- constructor
要素が生成される時や、アップグレードがされる時に呼びだされるメソッド。
shodowDOMの設定やaddEventListenerでのeventの設定などをする

- connectedCallback
要素がDOMにレンダリングされる度に呼び出される。
セットアップの処理等をここで記述する。
またaddEventListenerするが、何かしらの処理でそのDOM要素を破棄しなければならない場合に、ここでaddEventListenerを付与する処理を記述する。

- disconnectedCallback
要素がDOMから削除される度に読み込まれる。addEventListenerの破棄等、データのクリーンアップ処理を記述する。

- attributeChangedCallback(attrName, oldVal, newVal)
observedAttributesで購読されているattributeに変更が加わった際に呼び出されるメソッド。このメソッドには3つの引数があり、第1引数が何のattributeが変更されたかのattributeの名前、第2引数が変更される前のattributeのパラメーター、第3引数が変更後のパラメーターになります。

- adoptedCallback()
カスタム要素が新しい document に移動されたときに使用する
今後のサンプルの中でも上記のメソッドを使用しますので、その際に都度詳細に説明したいと思います。

### custom-btnを作ってみよう
まずは簡単なボタンコンポーネントを作ってみましょう！
`src/section1/CustomBtn/index.js`
今回このようなボタンのコンポーネントを作ります。
`ここにindex.htmlのスクショ画像`

このボタンの仕様としては
- width, height, colorの3つのattributeがある。
- clickをするとボタンの色が変わり、ボタン要素内のテキストを `changed!` に変更する

です。まずはコードを見て行きましょう。
`src/section1/CustomBtn` には二つのJSファイルがあります。
- btnTemplate.js
- index.js

btnTemplateに関してはボタンのUI用のタグの記述とstyleの記述がされています。index.jsはロジックの処理が記述されています。
btnTemplate内に `<slot></slot>` という記述がありますが、これはhtml内にタグを読み込む際にタグとタグの中に入れた要素(あるいはテキスト)を反映させます。
例: `<button>ここに要素かテキストが入る</button>`
`<slot>ここに要素かテキストが入る</slot>`

またbtnTemplateは関数なのでattributeそれぞれの値を引数で受け取っています。
それではindex.jsの中身を見てみましょう。

`index.js`
index.jsの全体のコードを載せる。
まず初めにcustom elementsを使用するには作成するclassに対して `HTMLElement` を継承する必要があります。
この `HTMLElement` を継承し、後ほど説明する `define`メソッドで定義することによってhtmlのタグとして使用することが出来ます。

次に `static get observedAttributes()` observedAttributesメソッド内に購読するattributeの設定をします。
次にconstructor内にshadowDOMを使用する設定を記述します。下記の
```
this.attachShadow({
  mode: 'open'
});
```

this.attachShadow() を実行することによってshadowDOMを生成することが出来ます。
実際には読み込んだcustom-tag 内に `#shadow-root(open)` が追加され、custom-tag内で記述したDOMやstyleが展開されます(今回の場合だと`btnTemplate内に記述しているDOMやstyle`)。
ちなみにこのshadowRoot内のDOMにアクセスをする場合は下記のように
`this.shadowRoot.querySelector('.something')` 指定することによってDOMやstyleを参照出来ます。

またattachShadow内の madeに `open` が記述されていますが、openにすることによってthis.attachShadowにアクセス出来、`closed` にすると`null` が戻り値として返って来ます。

connectedCallbackにはDOMの生成addEventListenerでeventの付与をしています。クリックイベントが発生した場合、 `color` のattributeの値を `red` に書き換えています。またこのクリックイベントを発火し、attributeの値が変更されることによって `attributeChangedCallback` が呼び出され、ボタンのアップデートを行います。

## CustomBtnをHTML内で使えるようにする
それではCustomBtnをHTML内で使えるようにしてみましょう！
初めに`js/index.js` に 作成したコンポーネント (`CustomBtn`) を読み込みその後に
`customElements.define()` メソッドでコンポーネントを定義します。

`customElements.define('custom-btn', CustomBtn);`
これにより、HTML内で `custom-btn` タグを記述することによって使用することが出来ます。
`src/index.ejs` を見てみましょう
`src/index.ejsの中身`

これにより、custom-elements を生成することが出来ます。

## Custom Elementsを継承する
また、作成したCustom Elementsを継承することが出来ます。
`src/js/ExtensibleBtn` を見てみましょう。
`extends` に `HTMLElement` ではなく、作成したCustom Elementsを継承することによって元々のコンポーネントを拡張した形でコンポーネントを作成することが出来ます。

また要素自体を拡張することも出来ます。その際は下記のような
`class GreatButton extends HTMLButtonElement` のように各それぞれの要素を指定する必要があります。

## Tabコンポーネントを作ってみよう
Tabコンポーネントには主に二つのファイルで構成されています。
- dom.js
DOMとstyle要素が記述されています。
- index.js
主な処理が記述されています。

まず初めにtemplateタグを生成し、templateタグ内にdom.js内のDOMをレンダリングしています。
ちなみにtemplateタグは初期ロードでは読み込みされず、javascript側でレンダリングすることによって初めてブラウザにレンダリングされます。
custom-elementsをレンダリングする際に非常に使い勝手が良いです。

またdom.js内に以下のような
`slotの部分`

記述がされていますが、tab.ejs内の以下の部分のように
`tab.ejs`の部分

custom-elementsを読み込むことでそれぞれのslot内にDOMを読み込むことが出来ます。

最終的には以下のようなタブが出来上がります。
`Tabの画像`
これによりタブとしての機能を保持しつつ、ユーザーはHTMLのみを記述するだけで使えるタブが出来上がります。
昨今は一つのdivタグの中にjavascript側からDOMの描画をまとめてするケースが多いと思いますが、このようにcustom-elementsである程度レンダリングを制御し、実際に使用する際はHTMLを記述しコントロール出来るのはフロントエンドエンジニア以外の人達にも受けれ易いと思います。
以上でTabコンポーネントの解説を終わります。

## カウンターコンポーネントを作ってみよう
ここからはカウンターコンポーネントのサンプルを通して説明したいと思います。まずは `src/js/Counter/index.js` を見てみましょう。
`Counterのスクショ`
非常に簡単なサンプルですが、 +を押下すると数値が 1 プラスされ、逆に -を押下すると数値が-1されます。またreset btnを押下することによって数値を0にすることが出来ます。
またこのコンポーネントはボタンの色のスタイルをCSSから変更することが出来ます。コードを見てみましょう。
`css variable の部分`

上記はCSS Variablesといい、CSSに変数を指定することが出来ます。これにより、このように別ファイルにて指定の変数に値を入れることによってCustom Elements 内のスタイルを変更することが出来ます。
```
:root {
  --custom-color: red;
}
```

コンポーネント側でこのようにスタイルで変更出来る箇所を明示的に表すことが出来、他は参照出来ないようすることによってコンポーネントをピュアな状態で保つことが出来ます。

以上で第1章の解説を終了したいと思います。紙面の都合上限られたサンプルでの紹介でしたが、GitHubのサンプルには他にhもTabのコンポーネントやCardコンポーネントのexampleもあるので、是非参考にしてみてください。

## 第2章 Todo Exampleを通しての解説
第2章ではフレームワークの解説ではもはや定番となりつつあるToDo Exampleの解説を通してCustom Elementsを紹介して行きたいと思います。早速 `src/js/section2` を見てみましょう！

`SimpleTodoのスクショ`
これからSimpleTodoというコンポーネントの解説をしたいと思います。このSimpleTodoは4つのファイルで構成されています。
- defaultState.js
Todoリストのデータの初期値
- dom.js
DOM要素やstyle要素用の関数
- listDOM.js
Todoリストの子要素をレンダリングする為の関数
- index.js
初期設定が記述されているファイル

index.js内の各メソッドは以下の役割を担っています。
- observedAttributes
チェック済みか、未チェックかを購読する。また新しくTODOを追加した時にobservedAttributesを呼び出すupdateも購読している。

- attributeChangedCallback
全体のTODOの数をTODOが更新される度にレンダリングする。またTODOの数が0だった場合、フッターを非表示にする。
またソートボタンを押下した際の処理が記述されている。

- constructor
shadowRootの生成と初期TODOのデータを初期化しています。

- countTodo
TODOの数をカウントする処理が記述されています。

- isDisplay
TODOの数が0だった場合、フッターを非表示にする処理が記述されています。

- deleteTodo
TODOを削除した際の処理が記述されています。

- completeTodo
コンプリートボタンを押下した際の処理が記述されています。

- addTodo
TODOを追加した時の処理が記述されています。

- createDOM
初期ロードやソートボタンを押下した際にTODOのリストをレンダリングする処理が記述されています。

- sortTodo
ソートボタンを押下した際に発火する処理が記述されています。

- connectedCallback
初期描画時の処理が記述されています。

基本的な構成としては役割毎になるべく細かくメソッドに分割し、必要な処理の際にメソッドを呼び出すようになっています。
また下記の
`this.state`
各TODOのデータを保持しています。これにより例えば初期読み込み時にRequestをしてデータを取得し、データ整形をした後にthis.state内に値を代入すればRequestで得たデータを画面に描画することが出来ます。

またポイントとしては
this.setAttribute('data', 'something')
のようにそのコンポーネント自身のattributeを変更する際にattributeChangedCallbackでattributeを設定して置くとsetAttributeした後にattributeChangedCallback内の処理は実行されますが、そのコンポーネントの子要素のattributeを変えた場合はattributeChangedCallbackが実行されません。その為、今回はコンポーネントの親階層にupdateというattributeを付与し、子要素のattributeがアップデートされる度にattributeChangedCallbackするように実装しました。

実装していて感じたのはもっと子要素の役割を薄め、attributeChangedCallback内の処理を厚くする方が機能の拡張の際に良いかもしれません。

また`listDOM`内の
`listDOM`のコードを挿入する
ES2015のTemplateStringsで関数をDOMのテンプレートとして使用しています。個人的にはこういう風にコンポーネント単位で細かく管理するのが凄く好きです(React.jsのように)。

SimpleTodoになります。

Polymerについて
PolymerとはGoogle社が開発したweb componentsの技術要素を取り入れたUIフレームワークになります。書籍の中でも説明した通り、まだ全てのモダンブラウザでpolyfill無しでweb componentsを使用することは出来ませんが、polymerはそのpolyfillの役目を担っています。
polymerは簡単にshadowDOMを使えたり、polymerで作られているコンポーネントやMaterial Designのコンポーネントを使用出来ます。

また今までHTMLImportsを使用していましたが、polymer 3.0からES Modulesに変わります。ES Moduleは多くのフロントエンドに馴染みがあるのと思いますし、個人的にpolymerの今後に期待しています。
またpolymer 3.0はpreviewですが、実際にpolymer 3.0がリリースされた際にはブログ等でガンガン解説して行きたいと思います。

第1章 web componentsとは
webcomponentsの構成内容
Custom Elementsのブラウザの対応状況

Custom Elementsの使い方
Custom Elementsのライフサイクル

custom-btnを作ってみよう

CustomBtnをHTML内で使えるようにする

Custom Elementsを継承する
Tabコンポーネントを作ってみよう

カウンターコンポーネントを作ってみよう

第2章 とある電子の単純管理(シンプルTODO)

コードの説明
