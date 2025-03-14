const questions = {
  地理: [
    {
      id: 1,
      points: 100,
      question: "世界上最長的河流是哪一條？",
      options: ["(A) 亞馬遜河", "(B) 長江", "(C) 尼羅河", "(D) 密西西比河"],
      correctAnswer: "(C) 尼羅河",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question: "世界上面積最大的國家是哪一個？",
      options: ["(A) 加拿大", "(B) 俄羅斯", "(C) 美國", "(D) 中國"],
      correctAnswer: "(B) 俄羅斯",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question: "地中海與哪個大洋相連？",
      options: ["(A) 大西洋", "(B) 印度洋", "(C) 太平洋", "(D) 北冰洋"],
      correctAnswer: "大西洋",
      timeLimit: 30,
    },
    {
      id: 4,
      points: 600,
      question:
        "哪一個國家的首都擁有世界上最多的橋樑，並且被稱為「橋樑之城」？",
      options: ["請簡答"],
      correctAnswer: "荷蘭",
      explanation: "荷蘭阿姆斯特丹被稱為「橋樑之城」",
      timeLimit: 45,
    },
    {
      id: 5,
      points: 1000,
      question: "中國萬里長城總長度為多少公里？ (最接近的隊伍得分)",
      options: ["請簡答"],
      correctAnswer: "21196公里",
    },
  ],
  歷史: [
    {
      id: 1,
      points: 100,
      question: "古埃及的金字塔主要用於什麼目的？",
      options: ["(A) 廟宇", "(B) 宮殿", "(C) 墳墓", "(D) 住宅"],
      correctAnswer: "(C) 墳墓",
      explanation: "金字塔是古埃及法老的陵墓",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question: "世界上第一位女性總理是誰？",
      options: [
        "(A) 英女王伊麗莎白",
        "(B) 英國首相瑪格麗特·撒切爾",
        "(C) 德國總理安格拉·梅克爾",
        "(D) 斯里蘭卡總理錫娜·迪納瓦",
      ],
      correctAnswer: "(B) 英國首相瑪格麗特·撒切爾",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question: "中世紀的十字軍東征是由誰發起的？",
      options: [
        "(A) 法國國王路易九世",
        "(B) 教宗烏爾班二世",
        "(C) 英國國王亨利八世",
        "(D) 西班牙女王伊莎貝拉",
      ],
      correctAnswer: "(B) 教宗烏爾班二世",
      timeLimit: 30,
    },
    {
      id: 4,
      points: 600,
      question: "臺灣的「二二八事件」發生於哪一年？ (答案最接近的隊伍得分)",
      options: ["請簡答"],
      correctAnswer: "1947年",
    },
    {
      id: 5,
      points: 1000,
      question: "臺灣歷史上最早的原住民族有哪些？(共5個，每個答案200分)",
      options: ["請簡答"],
      correctAnswer: "阿美族、排灣族、魯凱族、泰雅族、布農族",
    },
  ],
  電影: [
    {
      id: 1,
      points: 100,
      question: "好萊塢位於美國加州的哪一個城市？",
      options: ["(A) 底特律", "(B) 波士頓", "(C) 舊金山", "(D) 洛杉磯"],
      correctAnswer: "(D) 洛杉磯",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question: "【讓子彈飛】這部電影中湯師爺的真名是什麼？",
      options: ["請簡答"],
      correctAnswer: "馬邦德",
    },
    {
      id: 3,
      points: 400,
      question: "《星際大戰：帝國反擊戰》中，達斯·維達告訴盧克什麼秘密？",
      options: ["請簡答"],
      correctAnswer: "我是你的父親",
    },
    {
      id: 4,
      points: 600,
      question:
        "漫威宇宙中 無限手套總共有鑲嵌六顆寶石 請說出有哪些寶石(一個100分)",
      options: ["請簡答"],
      correctAnswer: "心靈寶石 靈魂寶石 空間寶石 力量寶石 時間寶石 現實寶石",
    },
    {
      id: 5,
      points: 1000,
      question:
        "哈利波特中 佛地魔非常相信數字七的魔法屬性 他的七個分靈體分別有哪些，說出物件就好(一個100分，全對1000)",
      options: ["請簡答"],
      correctAnswer: "日記 戒指 王冠 小金匣 獎盃 哈利波特 蛇",
    },
  ],
  "動漫(一)": [
    {
      id: 1,
      points: 100,
      question: "在《鬼滅之刃》中，炭治郎的耳飾上畫的是什麼圖案？",
      options: ["(A) 太陽", "(B) 火焰", "(C) 月亮", "(D) 風暴"],
      correctAnswer: "(A) 太陽",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question: "《JOJO的奇妙冒險》中，DIO的替身能力是什麼？",
      options: ["(A) 迴音", "(B) 黃金體驗", "(C) 世界", "(D) 白金之星"],
      correctAnswer: "(C) 世界",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question: "《Re:從零開始的異世界生活》中，貝特魯吉烏斯的魔女教職位是？",
      options: ["(A) 憤怒", "(B) 暴食", "(C) 怠惰", "(D) 色慾"],
      correctAnswer: "(C) 怠惰",
      timeLimit: 30,
    },
    {
      id: 4,
      points: 600,
      question:
        "《鋼之鍊金術師》中，愛德華·艾力克的禁忌鍊金術導致他與他弟弟分別失去了什麼？ 共三樣東西 每個答案200分",
      options: ["請簡答"],
      correctAnswer: "愛德華的右手與左腿 弟弟的身體",
      timeLimit: 30,
    },
    {
      id: 5,
      points: 1000,
      question:
        "在《火影忍者》中，尾獸是由六道仙人將十尾的查克拉分割後創造出的九個強大生物。它們分別是甚麼動物? 每個答案100分 全對1000分",
      options: ["請簡答"],
      correctAnswer:
        "貍貓 貓妖 巨龜 猴子 馬與海豚 螢火蟲與蛞蝓 獨角仙 章魚與牛 狐狸",
    },
  ],
  "動漫(二)": [
    {
      id: 1,
      points: 100,
      question: "【獵人】中，小傑一夥人初次使用同行卡片前往的地方是哪裡？",
      options: ["(A) 壽富拉比", "(B) 瑪莎多拉", "(C) 安多奇拔", "(D) 友克鑫"],
      correctAnswer: "(B) 瑪莎多拉",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question:
        "名偵探柯南：往天國的倒數計時，這部電影版中劇情到了最後步美是精準的默數了幾秒鐘才讓大家得以逃出生天？",
      options: ["(A) 15秒", "(B) 20秒", "(C) 25秒", "(D) 30秒"],
      correctAnswer: "(D) 30秒",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question: "在《刀劍神域》中，亞絲娜在Aincrad篇中所屬的公會是？",
      options: [
        "(A) 血盟騎士團",
        "(B) 艾恩葛朗防衛隊",
        "(C) 神聖之刃",
        "(D) 劍聖會",
      ],
      correctAnswer: "(A) 血盟騎士團",
      timeLimit: 30,
    },
    {
      id: 4,
      points: 600,
      question:
        "在《一拳超人》中，埼玉在初次成為職業英雄時，請問他的階級與牌位分別是多少?(分別300分)",
      options: ["請簡答"],
      correctAnswer: "屬於C級，並且排名為 第337位",
    },
    {
      id: 5,
      points: 1000,
      question:
        "海賊王的草帽一行人入夥順序分別是?(共9位，位置正確的答案每個100分，全對1000分",
      options: ["請簡答"],
      correctAnswer: "魯夫 索隆 娜美 烏索普 喬巴 羅賓 弗朗奇 布魯克 甚平",
    },
  ],
  卡通: [
    {
      id: 1,
      points: 100,
      question: "【花木蘭】這部卡通中，木須龍的中文配音員是誰？",
      options: ["(A) 張克帆", "(B) 吳宗憲", "(C) 成龍", "(D) 胡大衛"],
      correctAnswer: "(B) 吳宗憲",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question: "在《海綿寶寶》中，派大星的褲子花紋跟底色分別是什麼顏色？",
      options: [
        "(A) 黃色花紋+綠底",
        "(B) 綠色花紋+紫底",
        "(C) 紫色花紋+綠底",
        "(D) 紫色花紋+黃底",
      ],
      correctAnswer: "(C) 紫色花紋+綠底",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question: "請說出讓野原廣智背了三十二年房貸的公寓名稱？",
      options: ["請簡答"],
      correctAnswer: "胯下痛公寓",
    },
    {
      id: 4,
      points: 600,
      question:
        "Cartoon Network 在90年代的經典有名卡通，請說出六個(每個答案100分)",
      options: ["請簡答"],
      correctAnswer:
        "德克斯特的實驗室 飛天小女警 雞與牛 拼命郎約翰尼 膽小狗英雄 搗蛋三傻",
    },
    {
      id: 5,
      points: 1000,
      question:
        "《數碼寶貝大冒險》（1999）（第一代）主角團的數碼寶貝名稱(共八隻  答對一之100分 全對1000分)",
      options: ["請簡答"],
      correctAnswer: "亞古獸 加布獸 比丘獸 甲蟲獸 巴魯獸 哥瑪獸 巴達獸 迪路獸",
    },
  ],
  運動: [
    {
      id: 1,
      points: 100,
      question: "足球比賽中，一場比賽的標準時長為多少分鐘？",
      options: ["(A) 60分鐘", "(B) 80分鐘", "(C) 90分鐘", "(D) 120分鐘"],
      correctAnswer: "(C) 90分鐘",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question: "NBA歷史上，最年輕的MVP得主是誰？",
      options: [
        "(A) 沙奎爾·奧尼爾",
        "(B) 勒布朗·詹姆斯",
        "(C) 德克·諾維茨基",
        "(D) 凱文·杜蘭特",
      ],
      correctAnswer: "(B) 勒布朗·詹姆斯",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question: "2020年東京奧運會的開幕式在哪個月舉行？",
      options: ["請簡答"],
      correctAnswer: "7月",
    },
    {
      id: 4,
      points: 600,
      question: "正規排球場的長跟寬各為幾公尺(各300分)",
      options: ["請簡答"],
      correctAnswer: "長18公尺 寬9公尺",
    },
    {
      id: 5,
      points: 1000,
      question:
        "馬拉松比賽的標準距離是多少公里？(最接近的隊伍得分，提示:小數點後3位)",
      options: ["請簡答"],
      correctAnswer: "馬拉松比賽的標準距離為42.195公里",
    },
  ],
  明星: [
    {
      id: 1,
      points: 100,
      question: "在2022年奧斯卡上，哪位男明星走上舞台打了主持人巴掌？",
      options: ["請簡答"],
      correctAnswer: "威爾·史密斯",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question: "請問哪位男藝人因為演唱會意外，只剩下一顆睪丸?",
      options: ["(A) 五佰", "(B) 林俊傑", "(C) 張衛健", "(D) 陳奕迅"],
      correctAnswer: "(D) 陳奕迅",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question: "誰是電影《冰雪奇緣》中的艾莎女王的配音演員？",
      options: [
        "(A) 艾瑪·斯通",
        "(B) 凱特·溫斯萊特",
        "(C) 伊迪娜·曼佐",
        "(D) 泰勒·斯威夫特",
      ],
      correctAnswer: "(C) 伊迪娜·曼佐",
      timeLimit: 30,
    },
    {
      id: 4,
      points: 600,
      question: "曾經組成「F4」的四位台灣男星，請問是哪4位?(一個答案150分)",
      options: ["請簡答"],
      correctAnswer: "言承旭、吳建豪、朱孝天、周渝民",
    },
    {
      id: 5,
      points: 1000,
      question:
        "這世界有四樣東西你不能碰 基努李維的X 連恩尼遜的XX 丹佐華盛頓的XX 傑森斯坦森的XX(一個200，全對1000)",
      options: ["請簡答"],
      correctAnswer: "狗 女兒 朋友 包裹",
    },
  ],
  港片: [
    {
      id: 1,
      points: 100,
      question:
        "在【賭神2】這部電影中 仇笑癡最後拿出的手槍是用什麼材質製作的 才沒有被金屬探測器發現",
      options: ["請簡答"],
      correctAnswer: "象牙",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question:
        "九品芝麻官中，朱二宣稱戚秦氏去找他購買了砒霜，請問他那一年究竟是進了多少斤砒霜?",
      options: ["(A) 半斤", "(B) 一斤", "(C) 兩斤", "(D) 四斤"],
      correctAnswer: "(A) 半斤",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question:
        "【嚦咕嚦咕新年財】最後麻將俠大賽的決賽時，劉青雲在裡面扮演的青雲，最後穿的毛衣是什麼顏色的?",
      options: ["請簡答"],
      correctAnswer: "紫色",
    },
    {
      id: 4,
      points: 600,
      question:
        "【少林足球】電影中 六個師兄弟的武功絕學各是什麼招式(一個100分)",
      options: ["請簡答"],
      correctAnswer:
        "大師兄-鐵頭功 二師兄-旋風地堂腿 三師兄-金鐘罩鐵布衫 四師兄-鬼影擒拿手 五師兄-大力金剛腿 六師弟-輕功水上漂",
    },
    {
      id: 5,
      points: 1000,
      question: "請說出周星馳主演的10部港片(計時兩分鐘，一個100分，滿分1000)",
      options: ["請簡答"],
      correctAnswer: "以主持人那邊的答案為主",
      timeLimit: 120,
    },
  ],
  公民: [
    {
      id: 1,
      points: 100,
      question: "世界各國也都有屬於自己的成年禮，這可說明文化的哪一項特性?",
      options: ["(A) 普遍性", "(B) 變異性", "(C) 累積性", "(D) 差異性"],
      correctAnswer: "(A) 普遍性",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question: "台灣立委有幾席",
      options: ["請簡答"],
      correctAnswer: "113席",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question:
        "根據報導，某國政府教育部近來發布規定，禁止中學成立同性戀社團，此規定與宣布受到人權團體批評。請問下述批評何者最可能為人權團體之訴求？",
      options: ["請簡答"],
      correctAnswer: "違反學生之結社自由",
    },
    {
      id: 4,
      points: 600,
      question:
        "台灣的總統有3項憲法賦予的「特別權力」分別是甚麼?共三個 答對一題200分",
      options: ["請簡答"],
      correctAnswer: "公布法律、發布緊急命令、解散立法院",
    },
    {
      id: 5,
      points: 1000,
      question:
        "台灣的「五院制」指的是中華民國政府的五大權力機關，分別為甚麼?答對一題200分",
      options: ["請簡答"],
      correctAnswer: "行政院 立法院 司法院 考試院 監察院",
    },
  ],
  國文: [
    {
      id: 1,
      points: 100,
      question: "「床前明月光，疑是地上霜」的作者是誰？",
      options: ["(A) 杜甫", "(B) 李白", "(C) 白居易", "(D) 王維"],
      correctAnswer: "(B) 李白",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question: "「齊人之福」這個成語原本指的是什麼？",
      options: [
        "(A) 齊國百姓的幸福生活",
        "(B) 男人同時擁有多位妻妾的快樂",
        "(C) 齊國豐收時的祭典",
        "(D) 齊國國君的壽宴",
      ],
      correctAnswer: "(B) 男人同時擁有多位妻妾的快樂",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question: "四大名著(答出一個一百分)",
      options: ["請簡答"],
      correctAnswer: "《三國演義》《水滸傳》《西游記》《紅樓夢》",
    },
    {
      id: 4,
      points: 600,
      question:
        "「道阻且長，行則將至；行而不辭，何必論道？」 出自哪位哲學家的哪個著作？(各300分)",
      options: ["請簡答"],
      correctAnswer: "老子《道德經》",
    },
    {
      id: 5,
      points: 1000,
      question:
        "以【真】為中心 上下左右加上一個字來造詞 依照教育部國語辭典能查到的給分 (一個100分，滿分1000)",
      options: ["請簡答"],
      correctAnswer: "以國文辭典為主",
    },
  ],
  生物: [
    {
      id: 1,
      points: 100,
      question: "金魚的記憶有幾秒鐘",
      options: ["(A) 3秒", "(B) 5秒", "(C) 10秒", "(D) 15秒"],
      correctAnswer: "(A) 3秒",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question: "可以用屁股呼吸的動物",
      options: ["(A) 鱷魚", "(B) 鯨魚", "(C) 烏龜", "(D) 馬"],
      correctAnswer: "(C) 烏龜",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question: "請說出身體組成 95% 是水的動物",
      options: ["請簡答"],
      correctAnswer: "水母",
    },
    {
      id: 4,
      points: 600,
      question: "請說出DNA跟RNA的中文翻譯名(各三百)",
      options: ["請簡答"],
      correctAnswer: "去氧核糖核酸(DNA) 核糖核酸(RNA)",
    },
    {
      id: 5,
      points: 1000,
      question:
        "吉尼斯世界紀錄中，擁有最長性高潮的哺乳動物是什麼 持續最長時間又是多久(各五百分)",
      options: ["請簡答"],
      correctAnswer: "豬 90分鐘",
    },
  ],
  音樂: [
    {
      id: 1,
      points: 100,
      question: "猜卡通 放主題曲前奏",
      options: ["請簡答"],
      correctAnswer: "小美人魚",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question: "猜歌名 前奏放五秒",
      options: ["請簡答"],
      correctAnswer: "稻香",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question: "下列哪一位作曲家並非「維也納古典學派」的代表人物？",
      options: ["(A) 海頓", "(B) 莫札特", "(C) 貝多芬", "(D) 蕭邦"],
      correctAnswer: "(D) 蕭邦",
    },
    {
      id: 4,
      points: 600,
      question: "說出6張周杰倫的專輯名稱 每個答案100分",
      options: ["請簡答"],
      correctAnswer: "以主持人那的答案庫為主",
    },
    {
      id: 5,
      points: 1000,
      question: "說出美國紐約百老匯的十大音樂劇名稱5個 每個答案200分",
      options: ["請簡答"],
      correctAnswer: "以主持人那的答案庫為主",
    },
  ],
  影集: [
    {
      id: 1,
      points: 100,
      question: "《權力的遊戲》中，哪位角色最初是「金色獅子家族」的領主？",
      options: [
        "(A) 艾德·史塔克",
        "(B) 史塔尼斯·巴拉席恩",
        "(C) 泰溫·蘭尼斯特",
        "(D) 羅柏·史塔克",
      ],
      correctAnswer: "(C) 泰溫·蘭尼斯特",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question: "《華燈初上》的故事主要發生在哪一個年代？",
      options: [
        "(A) 1970 年代",
        "(B) 1980 年代",
        "(C) 1990 年代",
        "(D) 2000 年代",
      ],
      correctAnswer: "(B) 1980 年代",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question:
        "絕命毒師的主角沃特·懷特第一次製作冰毒的純度高達多少? 並且他在業界上的稱號是甚麼?  答對一個得200分",
      options: ["請簡答"],
      correctAnswer: "97% 海森堡",
    },
    {
      id: 4,
      points: 600,
      question:
        "第一季的魷魚遊戲中主角的號碼是多少? 並且她在第二關選到的椪糖圖案是甚麼? 答對一個得300分",
      options: ["請簡答"],
      correctAnswer: "456號 雨傘",
    },
    {
      id: 5,
      points: 1000,
      question: "生活大爆炸的4人主角團分別畢業的學校是?每個答案250分",
      options: ["請簡答"],
      correctAnswer:
        "謝耳朵-加州理工學院 萊納德-普林斯頓大學 霍華德-麻省理工學院 拉金-哈佛大學",
    },
  ],
  飲食與烹飪: [
    {
      id: 1,
      points: 100,
      question: "「宮保雞丁」是屬於哪個中國菜系的經典菜餚？",
      options: ["(A) 四川菜", "(B) 廣東菜", "(C) 江浙菜", "(D) 山東菜"],
      correctAnswer: "(A) 四川菜",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question:
        "「西班牙海鮮燉飯（Paella）」通常會加入哪一種香料來增色與提味？",
      options: ["(A) 迷迭香", "(B) 肉桂", "(C) 番紅花", "(D) 胡椒"],
      correctAnswer: "(C) 番紅花",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question:
        "舒肥（Sous-vide） 是一種先將食物密封並放入低溫水浴中，利用長時間的溫度控制來烹調食物的技術 食物通常會以非常精確的低溫，通常在 ??°C 到 ??°C 之間?",
      options: ["請簡答"],
      correctAnswer: "50°C 到 85°C",
    },
    {
      id: 4,
      points: 600,
      question:
        "戈登·拉姆齊的《地獄廚房》最具代表性的威靈頓牛排，其組成包含以下幾個主要元素? 說出每個元素得100分(共六個)",
      options: ["請簡答"],
      correctAnswer: "菲力牛排 蘑菇醬 帕瑪火腿 黃芥末 千層酥皮 蛋黃液",
    },
    {
      id: 5,
      points: 1000,
      question:
        "截至2023年8月23日，X辣椒（Pepper X）被吉尼斯世界纪录认证为世界上最辣的辣椒，其辣度达到多少斯科维尔指标（SHU）? 最接近者得分",
      options: ["請簡答"],
      correctAnswer: "2693000",
    },
  ],
  神話故事: [
    {
      id: 1,
      points: 100,
      question: "在希臘神話中，冥界的統治者是誰？",
      options: ["(A) 宙斯", "(B) 哈迪斯", "(C) 波塞頓", "(D) 阿瑞斯"],
      correctAnswer: "(B) 哈迪斯",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question: "在印度神話中，濕婆神的第三隻眼睛象徵什麼？",
      options: [
        "(A) 破壞與重生",
        "(B) 仁慈與智慧",
        "(C) 權力與統治",
        "(D) 創造與愛",
      ],
      correctAnswer: "(A) 破壞與重生",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question: "根據中國神話，哪個動物是女媧用來補天的？",
      options: ["請簡答"],
      correctAnswer: "烏龜",
    },
    {
      id: 4,
      points: 600,
      question: "北歐神話中的「世界之樹」叫什麼名字？",
      options: [
        "(A) 米德加爾特",
        "(B) 亞斯加德",
        "(C) 尤克特拉希爾",
        "(D) 芬里爾",
      ],
      correctAnswer: "(C) 尤克特拉希爾",
    },
    {
      id: 5,
      points: 1000,
      question:
        "埃及神話中的主神太陽神，再早晨、中午、傍晚，分別有不同的名字，請問分別為什麼? 每個答案300分 全對1000分",
      options: ["請簡答"],
      correctAnswer:
        "黎明破曉的早晨稱做「凱布利」 蔚藍無比的中午稱做「瑞」或「拉」 彩霞滿天的傍晚稱做「亞圖姆」",
    },
  ],
  電腦遊戲: [
    {
      id: 1,
      points: 100,
      question:
        "《英雄聯盟》（League of Legends）中，以下哪位角色是以「忍者」為主題的？",
      options: ["(A) 提摩", "(B) 亞索", "(C) 劫", "(D) 琴女"],
      correctAnswer: "(C) 劫",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question: "在《艾爾登法環》（Elden Ring）中，玩家的角色被稱為什麼？",
      options: ["(A) 流浪者", "(B) 無名騎士", "(C) 褪色者", "(D) 亡靈"],
      correctAnswer: "(C) 褪色者",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question: "大吉大利，今晚吃雞！ 這句話出自於哪款遊戲?",
      options: ["請簡答"],
      correctAnswer: "絕地求生(PUBG)",
    },
    {
      id: 4,
      points: 600,
      question:
        "《魔獸世界》（World of Warcraft）中，哪位角色被稱為「巫妖王」？說出全名600分，只說出部分名300。",
      options: ["請簡答"],
      correctAnswer: "阿薩斯·米奈希爾",
    },
    {
      id: 5,
      points: 1000,
      question:
        "以下的魔物獵人作品的封面獸分別是甚麼? (每個答案200分)魔物獵人：世界 魔物獵人世界：Iceborne 魔物獵人：崛起（Rise） 魔物獵人崛起：曙光（Sunbreak）魔物獵人：荒野",
      options: ["請簡答"],
      correctAnswer: "滅盡龍 冰呪龍 怨虎龍 爵銀龍 鎖刃龍",
    },
  ],
  掌上遊戲: [
    {
      id: 1,
      points: 100,
      question: "以下哪款手遊被認為是「最燒錢的課金遊戲」之一？",
      options: [
        "(A) 《原神》",
        "(B) 《碧藍航線》",
        "(C) 《Fate/Grand Order》",
        "(D) 《明日方舟》",
      ],
      correctAnswer: "(C) 《Fate/Grand Order》",
      explanation: "FGO 的課金回報機率極低，號稱「真正的高課金遊戲」",
      timeLimit: 30,
    },
    {
      id: 2,
      points: 200,
      question:
        "《神魔之塔》中，哪個數字代表最大 Combo？超過這個數字之後都會以XX+表示",
      options: ["請簡答"],
      correctAnswer: "30",
      timeLimit: 30,
    },
    {
      id: 3,
      points: 400,
      question:
        "Candy Crush 糖果 截至2025/2/26目前已經有幾關可供玩家遊玩? 數字最接近的組別得分",
      options: ["請簡答"],
      correctAnswer: "18560",
    },
    {
      id: 4,
      points: 600,
      question:
        "《瑪利歐賽車 8 豪華版》（Mario Kart 8 Deluxe）中的全部攻擊道具(共6種，三連的就不用說了)說出一種得一百分",
      options: ["請簡答"],
      correctAnswer: "香蕉皮 綠色龜殼 紅色龜殼 尖刺龜殼 火焰花 迴力鏢花",
    },
    {
      id: 5,
      points: 1000,
      question:
        "寶可夢的御三家有哪幾隻? 請分別說出一二三世代 每隻100分 全對1000分",
      options: ["請簡答"],
      correctAnswer:
        "第一世代: 妙蛙種子 小火龍 傑尼龜  第二世代: 菊草葉 火球鼠 小鋸鱷  第三世代: 木守宮 火稚雞 水躍魚",
    },
  ],
};

export const pointValues = [100, 200, 400, 600, 1000];

export default questions;
