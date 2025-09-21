const questions = {
  Artale: [
    {
      id: 1,
      points: 200,
      question: "Artale繁體中文服是在20205年的幾月幾號上線?",
      options: ["(A) 03/31", "(B) 04/24", "(C) 04/19", "(D) 04/10"],
      correctAnswer: "(B) 04/24",
      answerImage: "/images/Artale上線.png",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 400,
      question: "台服的Artale成為第一個沒有拍賣的伺服器，沒有拍賣玩家只好到discord群組交易裝備，非常不便引發玩家不滿。\n請問拍賣場第一次關閉的日期是?",
      options: ["(A) 04/30", "(B) 05/05", "(C) 05/15", "(D) 06/12"],
      correctAnswer: "(C) 05/15",
      answerImage: "/images/Artale拍賣場公告.png",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 600,
      question: "2025/06/12新拍賣重開後不堪負載，又再次大當機，只撐了一陣子後便再次關閉，請問新拍賣場共撐了多久時間？",
      options: ["(A) 30分鐘", "(B) 1小時", "(C) 1個半小時", "(D) 2小時"],
      correctAnswer: "(B) 1小時",
      timeLimit: 30,
    },
    {
      id: 4,
      points: 800,
      question:
        "某女實況主於實況中衝套服卷時，於+5時因顯示錯誤沒注意到衝錯卷，套智60衝成套防60，導致該裝備最後雖為+10套服，但實際上是（衝過9次套智60與1次套防60卷）。經女實況主反應遭遇顯示錯誤後，官方GM直接飛來實況主旁並直接給予實況主一個全過套智60的套服，引發玩家的不滿。\n請問該裝備的名稱為？",
      options: ["請簡答"],
      correctAnswer: "藍色神仙之服(+10)",
      answerImage: "/images/藍色神仙之服.png",
      timeLimit: 45,
    },
    {
      id: 5,
      points: 1000,
      question: "金勾海賊團在Artale上線後馬上引來玩家的不滿，因為官方無預警改動將金鉤海賊團經驗大下修，並將獎勵裝備、卷軸全數拔掉。\n請問金勾海賊團原始(其他伺服器)的經驗值加上Artale現版本的經驗值約等於多少(完成一輪)?",
      options: ["(A) ~60,000 XP", "(B) ~100,000 XP", "(C) ~120,000 XP", "(D) ~150,000 XP"],
      correctAnswer: "(B) ~100,000 XP",
      explanation: "原始大約 ~60,000 XP，Artale版大約 ~38,000XP",
      timeLimit: 120,
    },
  ],
  職業與技能: [
    {
      id: 1,
      points: 200,
      questionImage: "/images/虎咆嘯.png",
      question: "上圖的技能屬於哪一個職業？",
      options: ["(A) 英雄", "(B) 格鬥家", "(C) 十字軍", "(D) 槍神"],
      correctAnswer: "(C) 十字軍",
      explanation: "劍士三轉十字軍技能 虎咆嘯",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 400,
      question: "龍魔導士的龍「米勒」完成第九階段成長(九轉)時，角色等級至少要多少？",
      options: ["請簡答"],
      correctAnswer: "Lv 120",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 600,
      questionImage: "/images/天怒.png",
      question: "請問主教的技能書 天怒20 最初是由哪個怪物掉落？", 
      options: [
        "(A) 海怒斯",
        "(B) 拉圖斯",
        "(C) 噴火龍",
        "(D) 殘暴炎魔",
      ],
      correctAnswer: "(D) 殘暴炎魔",
      timeLimit: 30,
    },
    {
      id: 4,
      points: 800,
      question: "暗殺者的技能「風魔手裡劍」可以消耗三個飛鏢投擲出大型飛鏢對敵人造成傷害，且會貫穿對多數敵人造成傷害。請問風魔手裡劍點到幾級時可以貫穿最多敵人，且最多貫穿的數量為? (每個答案得400分)",
      options: ["請簡答"],
      correctAnswer: "21級，6個",
      answerImage: "/images/風魔手裡劍.png",
      timeLimit: 30,
    },
    {
      id: 5,
      points: 1000,
      question: "請列出最初五個職業的所有轉職(1~4轉)，每列出一個職業的所有轉職得200分",
      options: ["請簡答"],
      correctAnswer: "如下圖",
      answerImage: "/images/所有轉職.png",
      timeLimit: 120,
    },
  ],
  一般知識與道具: [
    {
      id: 1,
      points: 200,
      question: "請列出楓之谷最原始的伺服器",
      options: ["請簡答"],
      correctAnswer: "雪吉拉、菇菇寶貝、星光精靈",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 400,
      question: "按照地圖順序，以下哪一個隱藏地圖是玩家第一個會發現的隱藏地圖",
      options: ["(A)肥肥海岸 ", "(B) 藍菇菇樹林", "(C) 石人寺院門外", "(D) 菇菇山脈"],
      correctAnswer: "(D) 菇菇山脈",
      timeLimit: 30,
    },    
    {
      id: 3,
      points: 600,
      questionImage: "/images/藍色龍牙拳刃.png",
      question: "在Big Bang之前，只有打倒哪隻BOSS才有機率掉落「藍色龍牙拳刃」？",
      options: ["(A)闇黑龍王 ", "(B) 黑道長老", "(C) 噴火龍", "(D) 寒霜冰龍"],
      correctAnswer: "(A)闇黑龍王",
      timeLimit: 30,
    },
    {
      id: 4,
      points: 800,
      questionImage: "/images/各飛鏢.png",
      question:
        "請按照攻擊力排序圖中的飛鏢(按順序答對四個選項200分，八個選項400分，十個選項600分，全對800分)",
      options: ["請簡答"],
      correctAnswer: "海星鏢+15=>迴旋鏢+17=>雪球+17=>黑色利刃+19=>木製陀螺+19=>紙飛機+20=>橘子+20=>雪花鏢+21=>冰柱+21=>楓葉鏢+21=>梅之鏢+23=>雷之鏢+25=>日之鏢+27=>月之鏢+27",
      timeLimit: 300,
    },
    {
      id: 5,
      points: 1000,
      question:
        "數學題:假設我現在HP為0，我喝了3瓶【紅色藥水】、1瓶【橘色藥水】、2瓶【新手冒險家的紅色藥水】、1瓶【馴鹿奶】，再吃了2顆【白色藥丸】、5顆【雞蛋】、1個【蛋糕】、3個【大熱狗】、2個【棒冰棒】、4個【魷魚乾】、7個【漢堡】、6個【西瓜】，我現在的HP為?",
      options: ["請簡答"],
      correctAnswer: "22,430",
      explanation:   "紅色藥水             +50   *3 = 150\n橘色藥水             +150  *1 = 150\n新手冒險家的紅色藥水  +40   *2 = 80\n馴鹿奶               +5000 *1 = 5000\n白色藥丸             +300  *2 = 600\n雞蛋                 +50   *5 = 250\n蛋糕                 +100  *1 = 100\n大熱狗               +300  *3 = 900\n棒冰棒               +2000 *2 = 4000\n魷魚乾               +600  *4 = 2400\n漢堡                 +400  *7 = 2800\n西瓜                 +1000 *6 = 6000\n",
      timeLimit: 300,
    },
  ],
  任務與NPC: [
    {
      id: 1,
      points: 200,
      question: "以下哪一個怪物的掉落物不是任務「明明夫人的第一個煩惱」所需要的？",
      options: ["(A) 綠水靈珠", "(B) 蝴蝶結", "(C) 藍水靈珠", "(D) 火獨眼獸尾巴"],
      correctAnswer: "(D) 火獨眼獸尾巴",
      answerImage: "/images/明明夫人.png",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 400,
      questionImage: "/images/公安C.png",
      question: "請問上圖中的NPC是?",
      options: ["(A) 公安A", "(B) 公安B", "(C) 公安C", "(D) 公安D"],
      correctAnswer: "(C) 公安C",
      answerImage: "/images/各公安.png",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 600,
      question: "以下哪一個任務不需要打 (Lv.32)鱷魚 來完成?",
      options: ["(A) 遺失的玻璃鞋", "(B) 超級綠水靈", "(C) 伊卡路斯的熱氣球", "(D) 內拉和墮落城市居民的委託(2)"],
      correctAnswer: "(D) 內拉和墮落城市居民的委託(2)",
      answerImage: "/images/鱷魚任務.png",
      timeLimit: 60,
    },
    {
      id: 4,
      points: 800,
      question: "史匹奈爾可以幫玩家傳送去各特色地圖，請列出所有史匹奈爾所在的地圖? \n(答對三個選項200分，六個選項400分，九個選項600分，全對800分)",
      options: ["請簡答"],
      correctAnswer: "桃花仙境、天空之城、冰原雪域、玩具城、西門町、101大道、神木村、上海灘、水上市集、弓箭手村、勇士之存、墮落城市",
      timeLimit: 300,
    },
    {
      id: 5,
      points: 1000,
      question:
        "在玩具城101組隊任務中，第六關需要玩家按照順序採箱子，總共五層，請問每層的順序為何? (每層全隊+200)",
      options: ["請簡答"],
      correctAnswer:
        "133 221 333 123 111",
      timeLimit: 120,
    },
  ],
  音樂題: [
    {
      id: 1,
      points: 200,
      question: "請問這是哪個音樂?",
      options: ["請簡答"],
      correctAnswer: "Big Bang前的登入",
      timeLimit: 30,
      youtube: "https://www.youtube.com/watch?v=BVSPMg-GWDc"
    },
    {
      id: 2,
      points: 400,
      question: "請問這是哪個地圖的音樂?",
      options: ["請簡答"],
      correctAnswer: "水世界",
      youtube: "https://www.youtube.com/watch?v=3jdRxzy3K9s",
      timeLimit: 30,
      answerImage: "/images/水世界.jfif"
    },
    {
      id: 3,
      points: 600,
      question: "請問這是甚麼音效?",
      options: ["請簡答"],
      correctAnswer: "轉職成功",
      timeLimit: 60,
      youtube: "https://www.youtube.com/watch?v=rBMilP89Wm4"
    },
    {
      id: 4,
      points: 800,
      question:
        "請問這是哪個地圖的音樂?",
      options: ["請簡答"],
      correctAnswer:
        "墮落城市-祕密花園",
      timeLimit: 60,
      youtube: "https://www.youtube.com/watch?v=C0xN8QcxqXk",
      answerImage: "/images/墮落城市-祕密花園.jpg"
    },
    {
      id: 5,
      points: 1000,
      question:
        "請問這是哪個地圖的音樂?",
      options: ["請簡答"],
      correctAnswer: "菇菇王國-菇菇城堡",
      timeLimit: 60,
      youtube: "https://www.youtube.com/watch?v=ClLLtA3naSo",
      answerImage: "/images/菇菇王國-菇菇城堡.jfif"
    },
  ]
};

export const pointValues = [200, 400, 600, 800, 1000];

export default questions;
