const questions = {
    "地理": [
        {
            id: 1,
            points: 100,
            question: "世界上最長的河流是哪一條？",
            options: ["亞馬遜河", "長江", "尼羅河", "密西西比河"],
            correctAnswer: "\\n(A)尼羅河\\n(B)長江",
            timeLimit: 60
        },
        {
            id: 2,
            points: 200,
            question: "世界上面積最大的國家是哪一個？",
            options: ["加拿大", "俄羅斯", "美國", "中國"],
            correctAnswer: "俄羅斯",
            explanation: "俄羅斯是世界上面積最大的國家"
        },
        {
            id: 3,
            points: 400,
            question: "地中海與哪個大洋相連？",
            options: ["大西洋", "印度洋", "太平洋", "北冰洋"],
            correctAnswer: "大西洋",
            explanation: "地中海通過直布羅陀海峽與大西洋相連",
            // timeLimit: 30
        },
        {
            id: 4,
            points: 600,
            question: "哪一個國家的首都擁有世界上最多的橋樑，並且被稱為「橋樑之城」？",
            options: ["荷蘭", "威尼斯", "倫敦", "巴黎"],
            correctAnswer: "荷蘭",
            explanation: "荷蘭阿姆斯特丹被稱為「橋樑之城」",
            // timeLimit: 30
        },
        {
            id: 5,
            points: 1000,
            question: "中國萬里長城總長度為多少？",
            options: ["21196公里", "15000公里", "18000公里", "25000公里"],
            correctAnswer: "21196公里",
            explanation: "根據最新測量，萬里長城總長度為21196公里",
            // timeLimit: 30
        }
    ],
    "歷史": [
        {
            id: 1,
            points: 100,
            question: "古埃及的金字塔主要用於什麼目的？",
            options: ["廟宇", "宮殿", "墳墓", "住宅"],
            correctAnswer: "墳墓",
            explanation: "金字塔是古埃及法老的陵墓",
            // timeLimit: 30
        },
        {
            id: 2,
            points: 200,
            question: "世界上第一位女性總理是誰？",
            options: ["英女王伊麗莎白", "英國首相瑪格麗特·撒切爾", "德國總理安格拉·梅克爾", "斯里蘭卡總理錫娜·迪納瓦"],
            correctAnswer: "英國首相瑪格麗特·撒切爾",
            explanation: "瑪格麗特·撒切爾是英國首位女首相",
            // timeLimit: 30
        },
        {
            id: 3,
            points: 400,
            question: "中世紀的十字軍東征是由誰發起的？",
            options: ["法國國王路易九世", "教宗烏爾班二世", "英國國王亨利八世", "西班牙女王伊莎貝拉"],
            correctAnswer: "教宗烏爾班二世",
            explanation: "十字軍東征是由教宗烏爾班二世發起的",
            // timeLimit: 30
        },
        {
            id: 4,
            points: 600,
            question: "臺灣的「二二八事件」發生於哪一年？",
            options: ["1945年", "1946年", "1947年", "1948年"],
            correctAnswer: "1947年",
            explanation: "二二八事件發生於1947年",
            // timeLimit: 30
        },
        {
            id: 5,
            points: 1000,
            question: "臺灣歷史上最早的原住民族有哪些？",
            options: ["阿美族、排灣族、魯凱族、泰雅族、布農族", "卑南族、雅美族、賽夏族、鄒族、邵族", "噶瑪蘭族、太魯閣族、撒奇萊雅族、賽德克族", "平埔族、凱達格蘭族、道卡斯族、巴宰族"],
            correctAnswer: "阿美族、排灣族、魯凱族、泰雅族、布農族",
            explanation: "阿美族、排灣族、魯凱族、泰雅族、布農族是臺灣最早的原住民族",
            // timeLimit: 30
        }
    ],
    "電影": [
        {
            id: 1,
            points: 100,
            question: "好萊塢位於美國加州的哪一個城市？",
            options: ["底特律", "波士頓", "舊金山", "洛杉磯"],
            correctAnswer: "洛杉磯",
            explanation: "好萊塢位於美國加州的洛杉磯",
            // timeLimit: 30
        },
        {
            id: 2,
            points: 200,
            question: "【讓子彈飛】這部電影中湯師爺的真名是什麼？",
            options: ["馬邦德", "馬邦良", "馬幫主", "馬邦輝"],
            correctAnswer: "馬邦德",
            explanation: "湯師爺的真名是馬邦德",
            // timeLimit: 30
        },
        {
            id: 3,
            points: 400,
            question: "《星際大戰：帝國反擊戰》中，達斯·維達告訴盧克什麼秘密？",
            options: ["他是盧克的父親", "他是帝國的叛徒", "他是絕地武士", "他是西斯尊主"],
            correctAnswer: "他是盧克的父親",
            explanation: "達斯·維達是盧克的父親",
            // timeLimit: 30
        },
        {
            id: 4,
            points: 600,
            question: "漫威宇宙中，無限手套鑲嵌了幾顆寶石？",
            options: ["四顆", "五顆", "六顆", "七顆"],
            correctAnswer: "六顆",
            explanation: "無限手套鑲嵌了六顆寶石",
            // timeLimit: 30
        },
        {
            id: 5,
            points: 1000,
            question: "在漫威電影中，這六顆寶石分別是什麼？",
            options: [
                "心靈寶石、靈魂寶石、空間寶石、力量寶石、時間寶石、現實寶石",
                "生命寶石、死亡寶石、空間寶石、力量寶石、時間寶石、現實寶石",
                "心靈寶石、靈魂寶石、維度寶石、力量寶石、時間寶石、現實寶石",
                "心靈寶石、靈魂寶石、空間寶石、能量寶石、永恆寶石、現實寶石"
            ],
            correctAnswer: "心靈寶石\\n靈魂寶石\\n空間寶石\\n力量寶石\\n時間寶石\\n現實寶石",
            explanation: "這六顆寶石分別是：\\n心靈寶石 - 控制思想\\n靈魂寶石 - 操縱靈魂\\n空間寶石 - 空間傳送\\n力量寶石 - 強大力量\\n時間寶石 - 時間控制\\n現實寶石 - 改變現實",
            timeLimit: 30
        }
    ],
    "動漫(一)": [
        {
            id: 1,
            points: 100,
            question: "在《鬼滅之刃》中，炭治郎的耳飾上畫的是什麼圖案？",
            options: ["火焰", "太陽", "月亮", "風暴"],
            correctAnswer: "太陽",
            explanation: "炭治郎的耳飾上畫的是太陽",
            // timeLimit: 30
        },
        {
            id: 2,
            points: 200,
            question: "《JOJO的奇妙冒險》中，DIO的替身能力是什麼？",
            options: ["迴音", "黃金體驗", "世界（The World）", "白金之星"],
            correctAnswer: "世界（The World）",
            explanation: "DIO的替身能力是世界（The World）",
            // timeLimit: 30
        },
        {
            id: 3,
            points: 400,
            question: "《Re:從零開始的異世界生活》中，貝特魯吉烏斯的魔女教職位是？",
            options: ["憤怒", "暴食", "怠惰", "色慾"],
            correctAnswer: "怠惰",
            explanation: "貝特魯吉烏斯的魔女教職位是怠惰",
            // timeLimit: 30
        }
    ],
    "動漫(二)": [
        {
            id: 1,
            points: 100,
            question: "【獵人】中，小傑一夥人初次使用同行卡片前往的地方是哪裡？",
            options: ["壽富拉比", "瑪莎多拉", "安多奇拔", "友克鑫"],
            correctAnswer: "瑪莎多拉",
            explanation: "小傑一夥人初次使用同行卡片前往的地方是瑪莎多拉",
            // timeLimit: 30
        },
        {
            id: 2,
            points: 200,
            question: "名偵探柯南：往天國的倒數計時，這部電影版中劇情到了最後步美是精準的默數了幾秒鐘才讓大家得以逃出生天？",
            options: ["15秒", "20秒", "25秒", "30秒"],
            correctAnswer: "30秒",
            explanation: "步美在電影版中精準地默數了30秒鐘才讓大家得以逃出生天",
            // timeLimit: 30
        },
        {
            id: 3,
            points: 400,
            question: "在《刀劍神域》中，亞絲娜在Aincrad篇中所屬的公會是？",
            options: ["血盟騎士團", "艾恩葛朗防衛隊", "神聖之刃", "劍聖會"],
            correctAnswer: "血盟騎士團",
            explanation: "亞絲娜在Aincrad篇中所屬的公會是血盟騎士團",
            // timeLimit: 30
        }
    ],
    "卡通": [
        {
            id: 1,
            points: 100,
            question: "【花木蘭】這部卡通中，木須龍的中文配音員是誰？",
            options: ["張克帆", "吳宗憲", "成龍", "胡大衛"],
            correctAnswer: "吳宗憲",
            explanation: "木須龍的中文配音員是吳宗憲",
            // timeLimit: 30
        },
        {
            id: 2,
            points: 200,
            question: "在《海綿寶寶》中，派大星的褲子花紋跟底色分別是什麼顏色？",
            options: ["黃色花紋+綠底", "綠色花紋+紫底", "紫色花紋+綠底", "紫色花紋+黃底"],
            correctAnswer: "紫色花紋+綠底",
            explanation: "派大星的褲子花紋是紫色，底色是綠色",
            // timeLimit: 30
        },
        {
            id: 3,
            points: 400,
            question: "請說出讓野原廣智背了三十二年房貸的公寓名稱？",
            options: ["胯下痛公寓", "雞飛狗跳莊", "幸福人生莊", "和平小築"],
            correctAnswer: "胯下痛公寓",
            explanation: "野原廣智背了三十二年房貸的公寓名稱是胯下痛公寓",
            // timeLimit: 30
        }
    ]
};

export const pointValues = [100, 200, 400, 600, 1000];

export default questions; 