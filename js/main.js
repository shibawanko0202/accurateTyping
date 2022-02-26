"use strit"
{
  //DOMの取得
  const typed = document.getElementById("typed");
  const untype = document.getElementById("untype");
  const score = document.getElementById("score");
  const bad = document.getElementById("bad");
  const miss = document.getElementById("miss");
  const more = document.getElementById("more");
  const accuracy = document.getElementById("accuracy"); 
  const ar = document.getElementById("ar");
  const container = document.getElementById("container");
  const hambarger = document.getElementById("hambarger");
  const overlay = document.getElementById("overlay");
  const close = document.getElementById("close");

  //サウンドエフェクト
  const typeSound = new Audio("sound/カタッ(Enterキーを押した音).mp3");
  typeSound.volume = 0.5;
  const resetSound = new Audio("sound/受話器置く03.mp3");
  const badSound = new Audio("sound/パッ.mp3");
  badSound.volume = .9;
  const finishSound = new Audio("sound/クイズ正解3.mp3");

  //ミスタイプのキーリスト
  const missType = [];

  //時間関係
  let isTyping = false;

  //問題集
  const questions = [
    "helloworld",
    "apple",
    "googlechrome",
    "google",
    "facebook",
    "amazon",
    "microsoft",
    "javascript",
    "cascadingstylesheets",
    "hypertextmarkuplanguage",
    "usestrict",
    "document",
    "listener",
    "getelementbyid",
    "textcontent",
    "addeventlistener",
    "current",
    "function",
    "font-family",
    "font-size",
    "justify-content",
    "padding",
    "margin",
    "display",
    "stylesheet",
    "text-align",
    "index.html",
    "main.js",
    "style.css",
    "referenceerror",
    "console",
    "window",
    "github",
    "viewport",
    "charset",
    "header",
    "body",
    "footer",
    "aside",
    "typography",
    "return",
    "true",
    "false",
    "documentobjectmodel",
    "classlist",
    "foreach",
    "new",
    "constructor",
    "this",
    "transition",
    "transform",
    "div",
    "title",
    "math",
    "random",
    "length",

  ];

  //正誤カウント
  let scoreCount = 0;
  let badCount = 0;
  let accuracyRate;

  //問題のセット
  function q(){
    untype.textContent = questions.splice(Math.floor(Math.random() * questions.length),1)[0];
    typed.textContent = "";
    more.textContent = `another ${questions.length}`;
  };

  //パーセンテージの表示
  function rate(){
    let accuracyRate = (scoreCount / (scoreCount + badCount) * 100).toFixed(2);
    accuracy.textContent = accuracyRate;
    ar.classList.remove("safe","caution","dead");
    if(accuracyRate >= 95){
      ar.classList.add("safe");
    } else if(accuracyRate >= 80){
      ar.classList.add("caution");
    } else {
      ar.classList.add("dead");
    };
  };

  //終了
  function finish(){
    typed.textContent = "";
    untype.textContent = "finished!";
    isTyping = false;
    more.textContent = "";
    finishSound.currentTime = 0;
    finishSound.play();
  };

  //ミスしたキーのバルーンを作成
  function missBaloon(key){
    let balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.id = `${key}`;
    balloon.style.top = "calc(" + 1 * Math.random() * 100 + "%)";
    balloon.style.left = "calc(" + 1 *Math.random() * 100 + "%)";
    balloon.textContent = `${key}`;
    container.appendChild(balloon);
  };

  //ハンバーガーメニュー
  hambarger.addEventListener("click",()=>{
    overlay.classList.add("show");
    hambarger.classList.add("hidden");
  });
  close.addEventListener("click",()=>{
    overlay.classList.remove("show");
    hambarger.classList.remove("hidden");
  });
  
  //キーボードを叩いたら
  window.addEventListener("keydown",(e)=>{
    if(!isTyping){
      return;
    };
    //ハンバーガーメニューを開いていたらリターン
    if(overlay.className === "show"){
      return;
    };
    //untypeの1文字目と一致していたら
    if(e.key === untype.textContent.charAt(0)){
      //untypeから削ってtypedに足す
      typed.textContent += "_";
      untype.textContent = untype.textContent.slice(1);

      //スコアを加点
      scoreCount++;
      score.textContent = scoreCount;
      rate();

      //タイプ音を鳴らす
      typeSound.currentTime = 0;
      typeSound.play();

      //もしuntypeが無くなったら次の問題へ
      if(untype.textContent.length === 0){
        //問題が無くなったら終了
        if(questions.length === 0){
          finish();
          return;
        };
        q();
        resetSound.currentTime = 0;
        resetSound.play();
      };

    } else { //ミスタイプした場合
      //ミスタイプに加点
      badCount++;
      bad.textContent = badCount;
      rate();

      //ブザーを鳴らす
      badSound.currentTime = 0;
      badSound.play();

      //ミスタイプのキーをカウント
      if(miss.textContent.match(e.key)){ //すでにあるなら加点
        let mt = missType.find((v) => v.key === e.key).num;

        miss.textContent = miss.textContent.replace(`${e.key}:${mt}`,`${e.key}:${mt + 1}`);
        missType.find((v) => v.key === e.key).num++;

        document.getElementById(`${e.key}`).style.transform = `scale(${(missType.find((v) => v.key === e.key).num)})`;

      } else { //初めてのミスキーカウント
        missBaloon(e.key);
        missType.push({
          key:e.key,
          num:1,
        });
        miss.textContent += `${missType[missType.length - 1].key}:${missType[missType.length - 1].num}  `;
      };
      q();
      //ミスして終了した場合
      if(questions.length === 0 && untype.textContent.length === 0){
        finish();
      };
    };
  });

  //始めの問題をセット
  window.addEventListener("keydown",(e)=>{
    if(isTyping){
      return;
    };
    if(questions.length === 0){
      return;
    };
    if(!(e.key === " " || e.key === "Enter")){
      return;
    };
    q();
    isTyping = true;
    resetSound.currentTime = 0;
    resetSound.play();
  });

}