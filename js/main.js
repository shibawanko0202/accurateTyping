(function(){
  "use strit"
  
  //Web Font Loader
  window.WebFontConfig = {
    google: { families: ['Ibarra+Real+Nova','Monofett','Xanh+Mono'] },
    active: function() {
      sessionStorage.fonts = true;
    }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

  //DOMの取得
  const typed = document.getElementById("typed");
  const untype = document.getElementById("untype");
  const score = document.getElementById("score");
  const bad = document.getElementById("bad");
  const mean = document.getElementById("mean");
  const accuracy = document.getElementById("accuracy"); 
  const rate = document.getElementById("rate");
  const main = document.getElementById("main");
  const hambarger = document.getElementById("hambarger");
  const overlay = document.getElementById("overlay");
  const close = document.getElementById("close");
  const restart = document.getElementById("restart");

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
  
  //出題数(文字数)
  const QuestionLength = 350;

  //正誤カウント
  let scoreCount = 0;
  let badCount = 0;
  let accuracyRate;

  //問題のセット
  function setQuestion(){
    const q = questions.splice(Math.floor(Math.random() * questions.length),1)[0];
    untype.textContent = q.word;
    typed.textContent = "";
    mean.textContent = q.mean;
  };

  //パーセンテージの表示
  function renderRate(){
    let accuracyRate = (scoreCount / (scoreCount + badCount) * 100).toFixed(2);
    accuracy.textContent = accuracyRate;
    rate.classList.remove("safe","caution","dead");
    if(accuracyRate >= 95){
      rate.classList.add("safe");
    } else if(accuracyRate >= 80){
      rate.classList.add("caution");
    } else {
      rate.classList.add("dead");
    };
  };

  //終了
  function finish(){
    typed.textContent = "";
    untype.textContent = "finished!";
    untype.classList.add("flash");
    isTyping = false;
    mean.textContent = "";
    finishSound.currentTime = 0;
    finishSound.play();
    restart.classList.add("show");
  };

  //ミスしたキーのバルーンを作成
  function createBalloon(key){
    let balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.id = `${key}`;
    balloon.style.top = `${Math.random() * 100}%`;
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.textContent = `${key}`;
    //カーソルをのせたら数値を表示
    balloon.addEventListener("mouseenter",()=>{
      balloon.style.fontSize = "10px";
      balloon.textContent += `:${missType.find((v) => v.key === balloon.textContent).num}`;
    });
    balloon.addEventListener("mouseleave",()=>{
      balloon.style.fontSize = "14px";
      balloon.textContent = `${key}`;
    });
    main.appendChild(balloon);
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
      renderRate();
      //文字を跳ねさせる
      score.classList.add("pyon");
      score.addEventListener("animationend",()=>{
        score.classList.remove("pyon");
      });

      //タイプ音を鳴らす
      typeSound.currentTime = 0;
      typeSound.play();

      //もしuntypeが無くなったら次の問題へ
      if(untype.textContent.length === 0){
        //出題数に達したら終了
        if((scoreCount > QuestionLength) || (questions.length === 0)){
          finish();
          return;
        };
        setQuestion();
        resetSound.currentTime = 0;
        resetSound.play();
      };

    } else { //ミスタイプした場合
      //ミスタイプに加点
      badCount++;
      bad.textContent = badCount;
      renderRate();
      //文字を跳ねさせる
      bad.classList.add("pyon");
      bad.addEventListener("animationend",()=>{
        bad.classList.remove("pyon");
      });

      //ブザーを鳴らす
      badSound.currentTime = 0;
      badSound.play();

      //ミスタイプのキーをカウント
      if(missType.find((v) => v.key === e.key)){ //すでにあるなら加点
        missType.find((v) => v.key === e.key).num++;
        //大きくする倍率指定
        document.getElementById(`${e.key}`).style.transform = `scale(${(missType.find((v) => v.key === e.key).num) * 0.9})`;

      } else { //初めてのミスキーカウント
        createBalloon(e.key);
        missType.push({
          key:e.key,
          num:1,
        });
      };
      //ミスして終了した場合
      if(questions.length === 0){
        finish();
      };
      setQuestion();
    };
  });

  //始めの問題をセット
  window.addEventListener("keydown",(e)=>{
    if(isTyping){
      return;
    };
    //Enter/Space to restart
    if(!(e.key === " " || e.key === "Enter")){
      return;
    };
    //終了していたらリロード
    if((scoreCount > QuestionLength) || (questions.length === 0)){
      location.reload();
      return;
    };
    untype.classList.remove("flash");
    setQuestion();
    isTyping = true;
    resetSound.currentTime = 0;
    resetSound.play();
  });

})();