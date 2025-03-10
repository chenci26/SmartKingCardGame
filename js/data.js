const quizData = {
    categories: [
        {
            name: "自然科學",
            questions: [
                { points: 100, question: "光合作用需要哪些條件？", answer: "陽光、二氧化碳、水和葉綠素" },
                { points: 200, question: "地球大氣層中含量最多的氣體是什麼？", answer: "氮氣，約佔78%" },
                { points: 400, question: "人體最大的器官是什麼？", answer: "皮膚" },
                { points: 600, question: "聲音在水中的傳播速度比在空氣中快還是慢？", answer: "快，約為空氣中的4倍" },
                { points: 1000, question: "什麼是量子糾纏現象？", answer: "兩個或多個粒子之間的量子態相關，即使相距很遠也能即時影響彼此" }
            ]
        },
        {
            name: "地理",
            questions: [
                { points: 100, question: "台灣最高的山峰是什麼？", answer: "玉山，海拔3,952公尺" },
                { points: 200, question: "世界上最大的沙漠是什麼？", answer: "撒哈拉沙漠" },
                { points: 400, question: "台灣位於哪些板塊交界處？", answer: "歐亞板塊和菲律賓海板塊" },
                { points: 600, question: "世界上最深的海溝是什麼？", answer: "馬里亞納海溝，深度約11,034公尺" },
                { points: 1000, question: "什麼是季風氣候？其特徵為何？", answer: "因季節變化導致風向改變的氣候，特徵是夏季和冬季風向相反" }
            ]
        },
        {
            name: "歷史",
            questions: [
                { points: 100, question: "中國四大發明是什麼？", answer: "指南針、火藥、造紙術和印刷術" },
                { points: 200, question: "台灣最早的原住民屬於哪個語系？", answer: "南島語系" },
                { points: 400, question: "鴉片戰爭發生在哪一年？", answer: "1840年" },
                { points: 600, question: "誰被稱為台灣現代化之父？", answer: "劉銘傳" },
                { points: 1000, question: "何謂「郡縣制」？最早實施於何時？", answer: "中央直接管理地方的行政制度，秦朝時期開始實施" }
            ]
        },
        {
            name: "文學",
            questions: [
                { points: 100, question: "「床前明月光」的下一句是什麼？", answer: "疑是地上霜" },
                { points: 200, question: "誰被稱為「詩仙」？", answer: "李白" },
                { points: 400, question: "「紅樓夢」的作者是誰？", answer: "曹雪芹" },
                { points: 600, question: "什麼是「駢文」？", answer: "句子長短相同，平仄相對的文體" },
                { points: 1000, question: "何謂「意象」？請舉例說明", answer: "作者通過語言文字表達的形象與意境，如「月」象徵思鄉" }
            ]
        },
        {
            name: "藝術",
            questions: [
                { points: 100, question: "梵谷的名畫「星夜」創作於何時？", answer: "1889年" },
                { points: 200, question: "水墨畫的基本顏色是什麼？", answer: "黑色，由墨調水產生不同濃淡" },
                { points: 400, question: "莫內是哪個畫派的代表畫家？", answer: "印象派" },
                { points: 600, question: "台灣民間藝術「剪黏」主要用於何處？", answer: "寺廟建築的裝飾" },
                { points: 1000, question: "何謂「留白」技法？其藝術效果為何？", answer: "在畫面中預留空白處，產生想像空間和意境美" }
            ]
        },
        {
            name: "音樂",
            questions: [
                { points: 100, question: "鋼琴總共有幾個琴鍵？", answer: "88個" },
                { points: 200, question: "貝多芬第五號交響曲被稱為什麼？", answer: "命運交響曲" },
                { points: 400, question: "台灣第一首流行歌曲是什麼？", answer: "望春風" },
                { points: 600, question: "何謂「十二平均律」？", answer: "將八度音程平均分成十二個半音的音律系統" },
                { points: 1000, question: "簡述「十二音列」作曲法的特點", answer: "使用十二個半音，每個音都要用完才能重複使用，避免調性中心" }
            ]
        },
        {
            name: "體育",
            questions: [
                { points: 100, question: "籃球比賽每隊場上應有幾名球員？", answer: "5名" },
                { points: 200, question: "奧林匹克運動會的五環代表什麼？", answer: "代表五大洲的團結" },
                { points: 400, question: "排球比賽中「自由球員」的特點是什麼？", answer: "穿不同顏色球衣，只能在後排防守，不能發球和扣球" },
                { points: 600, question: "何謂「三級跳遠」？", answer: "由單腳跳、跨步跳和跳躍三個動作組成的田徑項目" },
                { points: 1000, question: "解釋「運動生物力學」的研究重點", answer: "研究人體運動中的力學原理，包括重心、槓桿原理等，以提升運動效能" }
            ]
        },
        {
            name: "數學",
            questions: [
                { points: 100, question: "圓周率小數點後第一位是多少？", answer: "3" },
                { points: 200, question: "三角形內角和是多少度？", answer: "180度" },
                { points: 400, question: "什麼是質數？請舉例說明", answer: "只能被1和自身整除的數，如2、3、5、7等" },
                { points: 600, question: "費氏數列的前六個數字是什麼？", answer: "1、1、2、3、5、8" },
                { points: 1000, question: "什麼是「黎曼猜想」？", answer: "關於黎曼ζ函數的零點分布，是數學中最重要的未解決問題之一" }
            ]
        },
        {
            name: "物理",
            questions: [
                { points: 100, question: "光的三原色是什麼？", answer: "紅、綠、藍" },
                { points: 200, question: "牛頓第一運動定律說的是什麼？", answer: "慣性定律：物體保持原有運動狀態，除非受外力作用" },
                { points: 400, question: "什麼是都卜勒效應？", answer: "波源與觀察者相對運動時，觀察者接收到的頻率發生改變的現象" },
                { points: 600, question: "愛因斯坦的質能方程式是什麼？", answer: "E=mc²" },
                { points: 1000, question: "什麼是「量子隧穿效應」？", answer: "量子力學中粒子穿過位能壁壘的現象，違反經典物理學原理" }
            ]
        },
        {
            name: "化學",
            questions: [
                { points: 100, question: "水的化學式是什麼？", answer: "H₂O" },
                { points: 200, question: "常溫下呈氣態的元素有哪些？", answer: "氫、氮、氧、氟、氯等" },
                { points: 400, question: "什麼是pH值？", answer: "氫離子濃度的負對數，用來表示溶液的酸鹼度" },
                { points: 600, question: "何謂「氧化還原反應」？", answer: "電子得失的反應，一方失電子（氧化），另一方得電子（還原）" },
                { points: 1000, question: "解釋「手性分子」的概念", answer: "分子結構互為鏡像但不能重合的現象，如左手和右手的關係" }
            ]
        },
        {
            name: "生物",
            questions: [
                { points: 100, question: "DNA的雙螺旋結構由誰發現？", answer: "華生和克里克" },
                { points: 200, question: "人體最大的器官是什麼？", answer: "皮膚" },
                { points: 400, question: "什麼是「突變」？", answer: "基因或染色體結構的改變，可能導致性狀改變" },
                { points: 600, question: "解釋「細胞凋亡」的意義", answer: "細胞的程序性死亡，是正常的生理過程，可清除異常或衰老的細胞" },
                { points: 1000, question: "什麼是「表觀遺傳學」？", answer: "研究不改變DNA序列但可遺傳的基因表達變化" }
            ]
        },
        {
            name: "天文",
            questions: [
                { points: 100, question: "太陽系中最大的行星是什麼？", answer: "木星" },
                { points: 200, question: "銀河系的形狀是什麼？", answer: "螺旋形" },
                { points: 400, question: "什麼是光年？", answer: "光在真空中傳播一年的距離，約9.46兆公里" },
                { points: 600, question: "何謂「紅移現象」？", answer: "天體遠離時，光譜向紅端偏移的現象，表明宇宙在膨脹" },
                { points: 1000, question: "解釋「暗物質」的概念", answer: "不發光但有引力作用的物質，估計佔宇宙物質的85%" }
            ]
        },
        {
            name: "地質",
            questions: [
                { points: 100, question: "地球的主要板塊有幾個？", answer: "7個" },
                { points: 200, question: "什麼是化石？", answer: "生物遺體或痕跡在地層中保存的現象" },
                { points: 400, question: "地震規模和震度有什麼區別？", answer: "規模表示地震釋放的能量，震度表示地表震動的程度" },
                { points: 600, question: "何謂「超基性岩」？", answer: "含二氧化矽少於45%的火成岩，如橄欖岩" },
                { points: 1000, question: "解釋「地磁逆轉」現象", answer: "地球磁場南北極互換的現象，平均每50萬年發生一次" }
            ]
        },
        {
            name: "環境科學",
            questions: [
                { points: 100, question: "什麼是溫室效應？", answer: "大氣層阻擋地球輻射熱造成溫度升高的現象" },
                { points: 200, question: "臭氧層的主要功能是什麼？", answer: "過濾紫外線輻射" },
                { points: 400, question: "何謂「生物累積」？", answer: "有害物質在食物鏈中逐級富集的現象" },
                { points: 600, question: "解釋「碳足跡」的概念", answer: "個人或組織活動產生的二氧化碳排放量" },
                { points: 1000, question: "什麼是「環境荷爾蒙」？其危害為何？", answer: "干擾內分泌系統的化學物質，可能影響生殖和發育" }
            ]
        },
        {
            name: "科技",
            questions: [
                { points: 100, question: "CPU的全名是什麼？", answer: "中央處理器（Central Processing Unit）" },
                { points: 200, question: "什麼是人工智能？", answer: "模擬人類智能的計算機系統" },
                { points: 400, question: "5G技術的主要優勢是什麼？", answer: "高速率、低延遲、大連接" },
                { points: 600, question: "什麼是區塊鏈技術？", answer: "分散式帳本技術，具有去中心化、不可篡改等特點" },
                { points: 1000, question: "解釋「量子計算機」的工作原理", answer: "利用量子疊加和糾纏效應進行並行計算，大幅提升計算能力" }
            ]
        },
        {
            name: "醫學",
            questions: [
                { points: 100, question: "人體正常體溫是多少攝氏度？", answer: "36.5-37.2度" },
                { points: 200, question: "血液中最多的細胞是什麼？", answer: "紅血球" },
                { points: 400, question: "什麼是自身免疫疾病？", answer: "免疫系統攻擊自身組織的疾病" },
                { points: 600, question: "解釋「幹細胞」的特性", answer: "可以分化為各種類型細胞的未分化細胞" },
                { points: 1000, question: "什麼是「基因編輯」技術？", answer: "使用CRISPR等工具精確修改DNA序列的技術" }
            ]
        },
        {
            name: "心理學",
            questions: [
                { points: 100, question: "什麼是條件反射？", answer: "通過學習將無關刺激與特定反應相連的過程" },
                { points: 200, question: "誰被稱為「精神分析之父」？", answer: "佛洛伊德" },
                { points: 400, question: "什麼是「斯德哥爾摩症候群」？", answer: "人質對綁架者產生好感和認同感的心理現象" },
                { points: 600, question: "解釋「認知失調」理論", answer: "個人信念與行為不一致時產生的心理不適感" },
                { points: 1000, question: "什麼是「正念療法」？其應用領域？", answer: "專注當下體驗的心理治療方法，用於減壓、治療抑鬱等" }
            ]
        },
        {
            name: "哲學",
            questions: [
                { points: 100, question: "誰說「我思故我在」？", answer: "笛卡爾" },
                { points: 200, question: "什麼是邏輯學？", answer: "研究推理規則和思維方法的學科" },
                { points: 400, question: "何謂「存在主義」？", answer: "強調個人存在意義和自由選擇的哲學思潮" },
                { points: 600, question: "解釋柏拉圖的「洞穴寓言」", answer: "說明人們對真實世界認識的局限性，真理需要擺脫感官束縛" },
                { points: 1000, question: "什麼是「知識論」？其研究重點為何？", answer: "研究知識本質、來源和限度的哲學分支，探討如何獲得確實知識" }
            ]
        }
    ]
}; 