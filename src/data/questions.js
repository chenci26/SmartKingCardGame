const questions = {
  //A
  任務與NPC: [
    {
      id: 1,
      points: 200,
      question: "以下哪一個任務不需要打 葛雷士兵Lv42?",
      questionImage: "/images/葛雷士兵.png",
      options: ["獵殺葛雷", "怪物騎乘", "戰鬥生命體葛雷金剛", "傑塔雷帝奎朗的歷史"],
      correctAnswer: "(A) 獵殺葛雷",
      answerImage: "/images/葛雷任務.png",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 400,
      question: "我是誰?",
      questionImage: "/images/蒐集狂麥森.png",
      options: ["請簡答"],
      correctAnswer: "蒐集狂麥森",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 600,
      question: "威廉古堡公會組隊任務中，哪一個怪會掉老舊鑰匙?",
      questionImage: "/images/老舊鑰匙.png",
      options: [
          { value: "", text: "", image: "/images/紅A.png", label: "A" },
          { value: "", text: "", image: "/images/紅B.png", label: "B" },
          { value: "", text: "", image: "/images/紅C.png", label: "C" },
          { value: "", text: "", image: "/images/紅D.png", label: "D" },
      ],
      correctAnswer: "(A) 紅色化石巨人A",
      answerImage: "/images/紅A.png",
      timeLimit: 30,
    },
    {
      id: 4,
      points: 800,
      question:
        "以下哪一位是幹員C?",
      options: [
          { value: "", text: "", image: "/images/幹員E.png", label: "A" },
          { value: "", text: "", image: "/images/幹員M.png", label: "B" },
          { value: "", text: "", image: "/images/幹員W.png", label: "C" },
          { value: "", text: "", image: "/images/幹員C.png", label: "D" },
          { value: "", text: "", image: "/images/幹員P.png", label: "E" },
          { value: "", text: "", image: "/images/幹員O.png", label: "F" },
      ],
      correctAnswer: "D",
      answerImage: "/images/幹員C.png",
      timeLimit: 45,
    },
    {
      id: 5,
      points: 1000,
      question: "在活動任務\"狂狼勇士的預告\"活動，玩家需要蒐集多少張\"狂狼勇士的痕跡\"?",
      questionImage: "/images/狂狼勇士的預告.jpg",
      options: ["3", "8", "12", "16"],
      correctAnswer: "(C)",
      answerImage: "/images/狂狼勇士.png",
      timeLimit: 120,
    },
  ],
  //B
  怪物與Boss: [
    {
      id: 1,
      points: 200,
      question: "水世界的\"花鯰魚\"有幾片花瓣?",
      options: ["請簡答"],
      correctAnswer: "4片",
      answerImage: "/images/花鯰魚.png",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 400,
      question: "下列哪一種怪物出現在新葉城?",
      options: [
          { value: "", text: "", image: "/images/新葉城A.png", label: "A" },
          { value: "", text: "", image: "/images/新葉城B.png", label: "B" },
          { value: "", text: "", image: "/images/新葉城C.png", label: "C" },
          { value: "", text: "", image: "/images/新葉城D.png", label: "D" },
          { value: "", text: "", image: "/images/新葉城E.png", label: "E" }
      ],
      correctAnswer: "(C) 小雪球",
      answerImage: "/images/新葉城答案.png",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 600,
      question: "下列哪些怪物不在幽靈船上？", 
      options: [
          { value: "", text: "", image: "/images/幽靈船A.png", label: "A" },
          { value: "", text: "", image: "/images/幽靈船B.png", label: "B" },
          { value: "", text: "", image: "/images/幽靈船C.png", label: "C" },
          { value: "", text: "", image: "/images/幽靈船D.png", label: "D" },
          { value: "", text: "", image: "/images/幽靈船E.png", label: "E" }
      ],
      correctAnswer: "(B) 海軍中士幽靈 (C) 鬼盜船艦長",
      timeLimit: 30,
    },
    {
      id: 4,
      points: 800,
      question: "烏魯城BOSS叫什麼？",
      options: ["杜庫 ", "史萊奇", "維壯", "克雷賽爾"],
      correctAnswer: "(A) 杜庫",
      answerImage: "/images/杜庫.png",
      timeLimit: 30,
    },
    {
      id: 5,
      points: 1000,
      question: "請按照等級順序排列以下的怪物: 黑企鵝王、暴走族族長、紅藍雙怪、小丑柏菲、幽靈船夫",
      options: ["請簡答"],
      correctAnswer: "答: 幽靈船夫lv60=>小丑柏菲lv61=>暴走族族長lv62=>紅藍雙怪lv63=>黑企鵝王lv64",
      answerImage: "/images/等級排序.png",
      timeLimit: 120,
    },
  ],
  //C
  職業與技能: [
    {
      id: 1,
      points: 200,
      question: "台版楓之谷四轉正式上線是西元幾年? ",
      options: ["2006 ", "2007", "2008", "2009"],
      correctAnswer: "(B) 2007",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 400,
      question: "Big Bang以前，海盜的技能裡沒有以下哪一種動物? ",
      options: ["鯊魚 ", "章魚", "海鷗", "猴子"],
      correctAnswer: "(D) 猴子 (重砲指揮官為BB後職業)",
      timeLimit: 30,
    },    
    {
      id: 3,
      points: 600,
      questionImage: "/images/飛毒殺.png",
      question: "暗影神偷技能飛毒殺30級的技能書需要打以下哪個BOSS?",
      options: ["海怒斯 ", "惡靈13", "殘暴炎魔", "拉圖斯"],
      correctAnswer: "(C) 殘暴炎魔",
      answerImage: "/images/暗影神偷技能書.png",
      timeLimit: 30,
    },
    {
      id: 4,
      points: 800,
      questionImage: "/images/轉職.png",
      question:
        "請配對以下四轉轉職任務NPC的名稱(左到右)",
      options: ["漢摩尼亞、瑞吉爾、海倫、薩穆埃爾、葛雷托"],
      correctAnswer: "海倫、瑞吉爾、漢摩尼亞、葛雷托、薩穆埃爾",
      timeLimit: 300,
    },
    {
      id: 5,
      points: 1000,
      question:
        "列出所有Big Bang 以前，箭神需要「解任務」才能獲得/解鎖的技能?",
      options: ["請簡答"],
      correctAnswer: "念力集中(極致的試煉)、召喚鳳凰(傳說中的火鳥)、龍魂之箭(泰勒斯綁架陰謀)、楓葉淨化(堅固的意志)、暴風神射(發射眼睛看不見的弓箭)",
      answerImage: "/images/箭神技能書.png",
      timeLimit: 300,
    },
  ],
  //D
  道具與裝備: [
    {
      id: 1,
      points: 200,
      question: "休菲凱曼的項鍊需要幾個楓葉黃金標誌來兌換?",
      options: ["請簡答"],
      correctAnswer: "50個",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 400,
      questionImage: "/images/聖火.png",
      question: "請問這是什麼武器?",
      options: ["請簡答"],
      correctAnswer: "獎盃武器、聖火，來自2008年北京奧運活動",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 600,
      questionImage: "/images/羅達手套.png",
      question: "藍色羅達手套有裝備屬性限制才能配戴，請問該裝備限制哪些屬性，且限制多少(上下30都算對)",
      options: ["請簡答"],
      correctAnswer: "智力338、幸運113",
      answerImage: "/images/羅達手套限制.png",
      timeLimit: 60,
    },
    {
      id: 4,
      points: 800,
      question: "配對題：以下4種道具對應的掉落怪物?",
      options: [     
          { value: "時間置換30", text: "時間置換30", image: "/images/時間置換30.png", label: "1" },
          { value: "活力充沛的飲料", text: "活力充沛的飲料", image: "/images/活力充沛的飲料.png", label: "2" },
          { value: "頭盔智力卷軸60%", text: "頭盔智力卷軸60%", image: "/images/頭盔智力卷軸60.png", label: "3" },
          { value: "字母餅乾R", text: "字母餅乾R", image: "/images/字母餅乾R.png", label: "4" },
          { value: "暗黑龍王", text: "暗黑龍王", image: "/images/暗黑龍王.png", label: "A" },
          { value: "奧芙赫班", text: "奧芙赫班", image: "/images/奧芙赫班.png", label: "B" },
          { value: "黑道大姊頭", text: "黑道大姊頭", image: "/images/黑道大姊頭.png", label: "C" },
          { value: "多多", text: "多多", image: "/images/多多.png", label: "D" }],
      correctAnswer: "1A 2B 3D 4C",
      timeLimit: 300,
    },
    {
      id: 5,
      points: 1000,
      question:
        "請問消耗兵法書(孫子)+兵法書(司馬法)+兵法書(戰國策)總共會獲得多少經驗值?",
      options: ["505000", "78000", "125600", "105300"],
      correctAnswer: "D",
      explanation: "兵法書(孫子)-100,000\n兵法書(司馬法)-5,000\n兵法書(戰國策)-300",
      answerImage: "/images/兵法書.png",
      timeLimit: 120,
    },
  ],
  //E
  聲音題: [
    {
      id: 1,
      points: 200,
      question: "請問這是哪一隻王的主題曲?",
      options: ["請簡答"],
      correctAnswer: "殘暴炎魔",
      timeLimit: 30,
      youtube: "https://www.youtube.com/watch?v=rEtDrkAYs68"
    },
    {
      id: 2,
      points: 400,
      question: "請問這是哪個地圖的音樂?",
      options: ["請簡答"],
      correctAnswer: "卡姆那 或 遺忘的森林",
      youtube: "https://www.youtube.com/watch?v=BB1l4zunOVU",
      timeLimit: 30,
      answerImage: "/images/遺忘的森林.png"
    },
    {
      id: 3,
      points: 600,
      question: "哪一個是少林寺的BGM?",
      options:  [ 
          {
            label: "A",
            audio: { type: "youtube", id: "by7VRYj4HU4"}  
          },
          {
            label: "B",
            audio: { type: "youtube", id: "rNnYpo9-cRw"} // YouTube 片段
          },
          {
            label: "C",
            audio: { type: "youtube", id: "RE-3HU4wvdU"} // YouTube 片段
          },
          {
            label: "D",
            audio: { type: "file", src: "/songs/武陵道場4_MureungSchool4.mp3"} 
          }
        ],
      correctAnswer: "轉職成功",
      timeLimit: 60,
      youtube: "https://www.youtube.com/watch?v=rBMilP89Wm4"
    },
    {
      id: 4,
      points: 800,
      question:
        "以下哪些BGM不是組隊任務內的BGM?(對一個400分)",
      options: [ 
          {
            label: "A",
            audio: { type: "youtube", id: "s6zoD2gnYrA"}  
          },
          {
            label: "B",
            audio: { type: "youtube", id: "8bvx6bZ8WnA"} // YouTube 片段
          },
          {
            label: "C",
            audio: { type: "youtube", id: "YUeCX11El2s"} // YouTube 片段
          },
          {
            label: "D",
            audio: { type: "youtube", id: "gNafzBfyoTo"} // YouTube 片段
          },
          {
            label: "E",
            audio: { type: "youtube", id: "wWB1hTbtoNQ"} // YouTube 片段
          }
        ],
      correctAnswer: "(B) 楓葉古城 城堡內部 (D) 馬來西亞 鄉村鎮 ",
      explanation: "(A)夢幻龍族（龍騎士組隊）、(C) 月妙組隊、(E) 101眼睛洞",
      timeLimit: 60,
    },
    {
      id: 5,
      points: 1000,
      question:
        "請問說出這一套技能組合音效順序?",
      options: [{
            label: "A",
            audio: { type: "file", src: "/songs/楓之谷音效.mp3"}  
          }],
      correctAnswer: "楓葉淨化=>神聖之火=>楓葉祝福=>降魔咒",
      timeLimit: 60,
      answerImage: "/images/技能連鎖.png"
    },
  ]
};

export const pointValues = [200, 400, 600, 800, 1000];

export default questions;
