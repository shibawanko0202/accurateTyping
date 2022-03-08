"use strict"

//問題集
const questions = [

  //言語
  {word : "javascript",
    mean : "ブラウザ上でサイトへ動きを与える言語"},
  {word : "cascadingstylesheets",
    mean : "cssの正式名称"},
  {word : "hypertextmarkuplanguage",
    mean : "htmlの正式名称"},
  
  //html
  {word : "viewport",
    mean : "表示領域を指定する為のmeta要素のname属性"},
  {word : "charset",
    mean : "文字エンコーディングを指定する為のmeta要素の属性名"},
  {word : "header",
    mean : "サイトのヘッダー部分を囲うhtmlタグ"},
  {word : "body",
    mean : "サイトの主要部分を囲うhtmlタグ"},
  {word : "footer",
    mean : "サイトのフッター部分を囲うhtmlタグ"},
  {word : "aside",
    mean : "広告や補足的部分を囲うhtmlタグ"},
  {word : "div",
    mean : "意味を持たないhtmlタグ、使いやすいが使い過ぎないように"},
  {word : "title",
    mean : "ページのタイトルを指定するhtmlタグ"},
  {word : "table",
    mean : "表を作成する為のhtmlタグ"},
  {word : "section",
    mean : "章、節を意味するhtmlタグ、見出しタグの挿入必須"},

  //css
  {word : "stylesheet",
    mean : "外部cssを適用する為のlink要素のrel属性"},
  {word : "font-family",
    mean : "フォントを指定する為のプロパティ"},
  {word : "font-size",
    mean : "フォントのサイズを指定するためのプロパティ"},
  {word : "justify-content",
    mean : "display:flexを使用した際の要素の間隔を決めるプロパティ"},
  {word : "padding",
    mean : "boxの内側の余白を指定する為のプロパティ"},
  {word : "margin",
    mean : "boxの外側の余白を指定する為のプロパティ"},
  {word : "display",
    mean : "要素にblockやinlineを指定する為のプロパティ"},
  {word : "text-align",
    mean : "block要素内のコンテンツの揃え位置を指定するためのプロパティ"},
  {word : "transition",
    mean : "要素の２つの状態間の変化を指定するプロパティ"},
  {word : "transform",
    mean : "要素を回転、拡大縮小、傾斜、移動する為のプロパティ"},
  {word : "border-radius",
    mean : "要素の境界の角を丸める為のプロパティ"},
  {word : "box-shadow",
    mean : "要素に影を付ける為のプロパティ"},
  {word : "cursor",
    mean : "要素の上にマウスポインタ―がある際の表示を指定するプロパティ"},
  {word : "pointer",
    mean : "要素をクリックした時にイベントが発生することを示すcursorの値"},
  {word : "background-color",
    mean : "要素の背景色を指定する為のプロパティ"},

  //javascript
  {word : "helloworld",
  mean : "コンピュータへの一般的な挨拶"},
  {word : "usestrict",
    mean : "厳格モードの宣言"},
  {word : "window",
    mean : "最上位オブジェクト、documentはこの下に位置している"},
  {word : "document",
    mean : "DOMツリーへアクセスする為のオブジェクト"},
  {word : "getelementbyid",
    mean : "指定されたidを取得する為のメソッド"},
  {word : "textcontent",
    mean : "ノードとその子孫のテキストを表すプロパティ"},
  {word : "addeventlistener",
    mean : "指定したイベントに対して関数を発火するメソッド"},
  {word : "console.log",
    mean : "webコンソールにメッセージを出力する為のメソッド"},
  {word : "return",
    mean : "関数の実行を終了して値を返すメソッド"},
  {word : "true",
    mean : "boolean型の値のひとつ"},
  {word : "false",
    mean : "boolean型の値のひとつ"},
  {word : "documentobjectmodel",
    mean : "DOMの正式名称、htmlを操作する技術でツリー構造を持つ"},
  {word : "classlist",
    mean : "要素のclass属性を読み取るプロパティ"},
  {word : "foreach",
    mean : "配列の各要素に関数を1度ずつ実行するメソッド"},
  {word : "while",
    mean : "条件式がtrueの間、関数を実行するメソッド"},
  {word : "switch",
    mean : "()の式を評価し、caseと一致する場合に処理を実行するメソッド"},
  {word : "new",
    mean : "オブジェクトの新しいインスタンスを生成する為の演算子"},
  {word : "constructor",
    mean : "classで作成されたオブジェクトを行う為のメソッド"},
  {word : "math.random",
    mean : "0以上1未満のランダムな浮動小数点を生成するメソッド"},
  {word : "length",
    mean : "文字数や配列数を取得する為のメソッド"},
  {word : "function",
    mean : "関数宣言"},
  {word : "undefind",
    mean : "定義されていないデータ"},
  {word : "createelement",
    mean : "指定したタグの要素を生成するメソッド"},
  {word : "appendchild",
    mean : "指定した親ノードの末尾に()のノードを生成するメソッド"},

  //命名
  {word : "current",
    mean : "「現在の」変数名などでよく使用される"},

  //ファイル名
  {word : "index.html",
    mean : "サイトのトップページに命名するhtml名"},
  {word : "main.js",
    mean : "主要なjsファイルによく命名されるjs名"},
  {word : "style.css",
    mean : "よく命名されるcss名"},
  
  //エラー
  {word : "referenceerror",
    mean : "参照元が存在しないエラー"},
  {word : "syntaxerror",
    mean : "構文エラー"},

  //ソフトウェア
  {word : "github",
    mean : "ソースコードを共有する為のプラットフォーム"},



  //追加予定
    // {word : "this",
    //   mean : ""},
];

  //問題の単語数の確認
  console.log(`問題数は ${questions.length} です`)
  let totalLength = questions.reduce(function(sum,element){
    return sum + element.word;
  });
  console.log(`問題の総文字数は ${totalLength.length} です`)