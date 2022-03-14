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
  const balloonRoom = document.getElementById("balloonroom");
  const hambarger = document.getElementById("hambarger");
  const overlay = document.getElementById("overlay");
  const close = document.getElementById("close");
  const restart = document.getElementById("restart");

  //サウンドエフェクト
  const typeSound = new Audio("sound/カタッ(Enterキーを押した音).mp3");
  typeSound.volume = 0.4;
  const resetSound = new Audio("sound/受話器置く03.mp3");
  resetSound.volume = 0.8;
  const bubbleSound = new Audio("sound/パッ.mp3");
  bubbleSound.volume = .9;
  const finishSound = new Audio("sound/クイズ正解3.mp3");

  //ミスタイプのキーリスト
  const missType = [];

  //時間関係
  let isTyping = false;
  let missHold = false;
  
  //出題数(文字数)
  const QuestionLength = 350;

  //正誤カウント
  let scoreCount = 0;
  let badCount = 0;
  let accuracyRate = 0;
  let continuousCorrect = 0;
  let bonusPoint = 0;

  //問題のセット
  function setQuestion(){
    const q = questions.splice(Math.floor(Math.random() * questions.length),1)[0];
    untype.textContent = q.word;
    typed.textContent = "";
    mean.textContent = q.mean;
  };

  //ボーナスアニメーション
  function getBonus(point){
    let bonus = document.createElement("div");
    bonus.className = "bonus";
    bonus.style.top = `${Math.random() * 40 + 40}%`;
    //左右どっちに作るか
    let LorR = Math.floor(Math.random() * 2);
    if(LorR === 0){
      bonus.style.left = `${Math.random() * 20}%`;
    } else {
      bonus.style.right = `${Math.random() * 20}%`;
    };
    bonus.textContent = `${point * 10}type`;
    bonus.style.width = `${point * 6 + 60}px`;
    bonus.style.height = `${point * 6 + 60}px`;
    bonus.style.lineHeight = `${point * 6 + 75}px`;
    bonus.style.fontSize = `${point * 1.5 + 16}px`;
    bonus.style.backgroundColor = `hsla(${Math.random() * 360}, 65%, 55%, .6)`;
    //アニメーションが全て終わったら消す
    let animeCount = 0;
    bonus.addEventListener("animationend",()=>{
      if(animeCount == 1){
        bonus.classList.add("disabled");
        return;
      };
      animeCount++;
      bubbleSound.currentTime = 0;
      bubbleSound.play();
    });
    balloonRoom.appendChild(bonus);
    bubbleSound.currentTime = 0;
    bubbleSound.play()
  };

  //パーセンテージの表示
  function renderRate(){
    accuracyRate = (scoreCount / (scoreCount + badCount) * 100).toFixed(2);
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
    isTyping = false;
    typed.textContent = "";
    const finishScore = ((scoreCount + bonusPoint - QuestionLength) * (accuracyRate / 100)).toFixed(2);
    untype.textContent = finishScore;
    finishSound.currentTime = 0;
    finishSound.play();
    untype.classList.add("score");
    restart.classList.add("show");
    mean.textContent = "finished!";
  };

  //ミスしたキーのバルーンを作成
  function createBalloon(key){
    let balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.id = `${key}`;
    balloon.style.top = `${Math.random() * 98 + 1}%`;
    balloon.style.left = `${Math.random() * 98 + 1}%`;
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
    //クリックしたら破裂
    balloon.addEventListener("click",()=>{
      balloon.classList.add("explosion");
      bubbleSound.currentTime = 0;
      bubbleSound.play();
      //アニメーションが終了したら要素を消す
      balloon.addEventListener("animationend",()=>{
        balloon.classList.add("disabled");
      });
    });
    balloonRoom.appendChild(balloon);
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
      continuousCorrect++;
      score.textContent = scoreCount;
      renderRate();
      //連続正解したらボーナス(10の倍数ごと)
      if((continuousCorrect % 10) == 0){
        getBonus(continuousCorrect / 10);
        bonusPoint += (continuousCorrect / 10);
      };
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
      if(missHold){
        return;
      };
      //ミスタイプに加点
      badCount++;
      continuousCorrect = 0;
      bad.textContent = badCount;
      renderRate();
      //文字を跳ねさせる
      bad.classList.add("pyon");
      bad.addEventListener("animationend",()=>{
        bad.classList.remove("pyon");
      });
      //ブザーを鳴らす
      bubbleSound.currentTime = 0;
      bubbleSound.play();

      //ミスタイプのキーをカウント
      if(missType.find((v) => v.key === e.key)){ //すでにあるなら加点
        missType.find((v) => v.key === e.key).num++;
        const missKey = document.getElementById(`${e.key}`);
        //大きくする倍率指定
        missKey.style.transform = `scale(${(missType.find((v) => v.key === e.key).num) * 0.9})`;
        //破裂させたバルーンを復活
        missKey.classList.remove("explosion","disabled");
      } else { //初めてのミスキーカウント
        createBalloon(e.key);
        missType.push({
          key:e.key,
          num:1,
        });
      };//ミスタイプのキーをカウント
      //ミスして終了した場合
      if(questions.length === 0){
        finish();
      };
      setQuestion();
      //連続で問題が飛ばされないように1秒キープ
      missHold = true;
      setTimeout(()=>{
        missHold = false;
      },1000);
    };//ミスした場合
  });//キーボードを叩いたら

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
    setQuestion();
    isTyping = true;
    resetSound.currentTime = 0;
    resetSound.play();
  });

})();