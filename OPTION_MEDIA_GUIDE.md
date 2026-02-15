# 題目與選項媒體功能使用指南

## 功能概述

### 題目內容支持：
- 📝 **文本**：題目的文字描述
- 🖼️ **圖片**：題目的圖片展示（支持多張圖片輪播）
- 🎵 **音頻**：題目的音頻內容
- 🎬 **影片**：題目的視頻內容

### 選項內容支持：
- 📝 **文本**：選項的文字描述
- 🖼️ **圖片**：選項的圖片展示（支持多張圖片輪播）
- 🎵 **音頻**：選項的音頻內容
- 🎬 **影片**：選項的視頻內容

### 🎠 圖片輪播功能
- 題目和每個選項都可添加**多張圖片**
- 自動以**輪播圖模式**顯示
- 左右箭頭切換圖片
- 底部指示器顯示當前圖片位置
- 支持 Google Drive 圖片

## 數據結構

### 新格式（對象格式）

#### 單張圖片（字符串）
```json
{
  "options": [
    {
      "text": "(A) 選項文本",
      "imageUrl": "https://example.com/image.jpg",
      "audioUrl": "https://example.com/audio.mp3",
      "videoUrl": "https://example.com/video.mp4"
    },
    {
      "text": "(B) 另一個選項",
      "imageUrl": "",
      "audioUrl": "",
      "videoUrl": ""
    }
  ]
}
```

#### 多張圖片（數組）- 輪播模式
```json
{
  "options": [
    {
      "text": "(A) 選項文本",
      "imageUrl": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
        "https://example.com/image3.jpg"
      ],
      "audioUrl": "https://example.com/audio.mp3",
      "videoUrl": "https://example.com/video.mp4"
    },
    {
      "text": "(B) 另一個選項",
      "imageUrl": "https://example.com/single-image.jpg",
      "audioUrl": "",
      "videoUrl": ""
    }
  ]
}
```

### 舊格式（字符串格式，仍然支持）
```json
{
  "options": ["(A) 選項一", "(B) 選項二", "(C) 選項三"]
}
```

## 使用方法

### 1. 通過自定義題目對話框添加

1. 點擊「自定義題目」按鈕
2. 切換到「添加題目」標籤

#### 題目內容部分：
- **問題內容**：輸入題目文字
- **題目圖片（支持多張）**：
  - 默認有一個圖片輸入框
  - 點擊「添加圖片」按鈕可添加更多圖片
  - 多張圖片會自動以輪播模式顯示
  - 每個圖片 URL 旁有刪除按鈕
- **音頻網址**：輸入音頻 URL（可選）
- **影片網址**：輸入視頻 URL（可選）

#### 選項區域：
每個選項卡片包含：
- **選項文本**：輸入選項的文字內容
- **圖片網址（支持多張）**：
  - 默認有一個圖片輸入框
  - 點擊「添加圖片」按鈕可添加更多圖片
  - 多張圖片會自動以輪播模式顯示
  - 每個圖片 URL 旁有刪除按鈕
- **音頻網址**：輸入音頻 URL（可選）
- **影片網址**：輸入視頻 URL（可選）

#### 通用支持：
所有媒體 URL 都支持：
- 直接鏈接（https://example.com/file.jpg）
- Google Drive 分享鏈接
- YouTube 鏈接（僅視頻）

#### 圖片輪播預覽：
- 添加多個圖片 URL 後，會在下方實時預覽輪播效果
- 使用左右箭頭切換圖片
- 底部圓點指示當前圖片位置
- 題目和選項都有獨立的輪播預覽

### 2. 通過 JSON 導入

#### 示例 1：單張圖片選項
```json
{
  "categories": [
    {
      "id": 1,
      "name": "音樂題",
      "nameEn": "Music",
      "color": "#E91E63"
    }
  ],
  "questions": {
    "音樂題": [
      {
        "id": 1,
        "points": 100,
        "question": "請選擇正確的樂器圖片",
        "options": [
          {
            "text": "(A) 小提琴",
            "imageUrl": "https://example.com/violin.jpg",
            "audioUrl": "https://example.com/violin-sound.mp3",
            "videoUrl": ""
          },
          {
            "text": "(B) 鋼琴",
            "imageUrl": "https://example.com/piano.jpg",
            "audioUrl": "https://example.com/piano-sound.mp3",
            "videoUrl": ""
          },
          {
            "text": "(C) 吉他",
            "imageUrl": "https://example.com/guitar.jpg",
            "audioUrl": "https://example.com/guitar-sound.mp3",
            "videoUrl": ""
          },
          {
            "text": "(D) 鼓",
            "imageUrl": "https://example.com/drums.jpg",
            "audioUrl": "https://example.com/drums-sound.mp3",
            "videoUrl": ""
          }
        ],
        "correctAnswer": "(A) 小提琴",
        "explanation": "這是小提琴的圖片和聲音",
        "timeLimit": 30
      }
    ]
  }
}
```

#### 示例 2：多張圖片輪播選項
```json
{
  "categories": [
    {
      "id": 2,
      "name": "藝術題",
      "nameEn": "Art",
      "color": "#9C27B0"
    }
  ],
  "questions": {
    "藝術題": [
      {
        "id": 1,
        "points": 200,
        "question": "以下哪組圖片展示的是同一位畫家的作品？",
        "options": [
          {
            "text": "(A) 梵谷系列",
            "imageUrl": [
              "https://example.com/vangogh1.jpg",
              "https://example.com/vangogh2.jpg",
              "https://example.com/vangogh3.jpg",
              "https://example.com/vangogh4.jpg"
            ],
            "audioUrl": "",
            "videoUrl": ""
          },
          {
            "text": "(B) 莫奈系列",
            "imageUrl": [
              "https://example.com/monet1.jpg",
              "https://example.com/monet2.jpg",
              "https://example.com/monet3.jpg"
            ],
            "audioUrl": "",
            "videoUrl": ""
          },
          {
            "text": "(C) 畢卡索系列",
            "imageUrl": [
              "https://example.com/picasso1.jpg",
              "https://example.com/picasso2.jpg"
            ],
            "audioUrl": "",
            "videoUrl": ""
          },
          {
            "text": "(D) 達文西系列",
            "imageUrl": "https://example.com/davinci.jpg",
            "audioUrl": "",
            "videoUrl": ""
          }
        ],
        "correctAnswer": "(A) 梵谷系列",
        "explanation": "這些都是梵谷的代表作",
        "timeLimit": 60
      }
    ]
  }
}
```

#### 示例 3：題目和選項都使用多張圖片
```json
{
  "categories": [
    {
      "id": 3,
      "name": "比較題",
      "nameEn": "Comparison",
      "color": "#FF5722"
    }
  ],
  "questions": {
    "比較題": [
      {
        "id": 1,
        "points": 300,
        "question": "請觀察題目中的建築物特徵，選擇與之風格相同的建築群",
        "imageUrl": [
          "https://example.com/building-question1.jpg",
          "https://example.com/building-question2.jpg",
          "https://example.com/building-question3.jpg"
        ],
        "audioUrl": "",
        "videoUrl": "",
        "options": [
          {
            "text": "(A) 哥德式建築群",
            "imageUrl": [
              "https://example.com/gothic1.jpg",
              "https://example.com/gothic2.jpg",
              "https://example.com/gothic3.jpg"
            ],
            "audioUrl": "",
            "videoUrl": ""
          },
          {
            "text": "(B) 巴洛克建築群",
            "imageUrl": [
              "https://example.com/baroque1.jpg",
              "https://example.com/baroque2.jpg"
            ],
            "audioUrl": "",
            "videoUrl": ""
          },
          {
            "text": "(C) 現代主義建築群",
            "imageUrl": [
              "https://example.com/modern1.jpg",
              "https://example.com/modern2.jpg",
              "https://example.com/modern3.jpg",
              "https://example.com/modern4.jpg"
            ],
            "audioUrl": "",
            "videoUrl": ""
          },
          {
            "text": "(D) 古典主義建築群",
            "imageUrl": "https://example.com/classical.jpg",
            "audioUrl": "",
            "videoUrl": ""
          }
        ],
        "correctAnswer": "(A) 哥德式建築群",
        "explanation": "題目中展示的建築物具有哥德式建築的典型特徵",
        "timeLimit": 90
      }
    ]
  }
}
```

## 顯示效果

### 題目內容區域會顯示：
1. **題目文本**（始終顯示）
2. **題目圖片輪播**（如果提供）
   - 單張圖片：直接顯示
   - 多張圖片：輪播模式顯示
     - 左右箭頭切換（白色半透明背景）
     - 底部圓點指示器（顯示當前位置）
     - 點擊圓點直接跳轉到對應圖片
     - 平滑過渡動畫
   - 最大寬度 800px
   - 最大高度 400px
   - 自動縮放保持比例
   - 支持 Google Drive 圖片（iframe 顯示）
3. **題目音頻播放器**（如果提供）
4. **題目視頻播放器**（如果提供）

### 選項按鈕會顯示：
1. **選項文本**（始終顯示）
2. **選項圖片輪播**（如果提供）
   - 單張圖片：直接顯示
   - 多張圖片：輪播模式顯示
     - 左右箭頭切換（白色半透明背景）
     - 底部圓點指示器（顯示當前位置）
     - 點擊圓點直接跳轉到對應圖片
     - 平滑過渡動畫
   - 最大寬度 300px
   - 最大高度 200px
   - 自動縮放保持比例
   - 支持 Google Drive 圖片（iframe 顯示）
3. **選項音頻播放器**（如果提供）
   - 標準 HTML5 音頻控件
   - 最大寬度 300px
4. **選項視頻播放器**（如果提供）
   - 標準 HTML5 視頻控件
   - 支持 YouTube 嵌入
   - 支持 Google Drive 嵌入
   - 最大寬度 300px，高度 200px

## 兼容性說明

- ✅ 新代碼完全兼容舊格式的字符串選項
- ✅ 可以混合使用對象格式和字符串格式
- ✅ 媒體字段都是可選的，不填寫不會影響功能
- ✅ 舊題目會自動適配新的顯示方式

## 注意事項

1. **媒體 URL 必須可訪問**：確保提供的 URL 是公開可訪問的
2. **文件大小**：建議使用合理大小的媒體文件以確保加載速度
3. **格式支持**：
   - 圖片：jpg, png, gif, webp, Google Drive
   - 音頻：mp3, wav, ogg, Google Drive
   - 視頻：mp4, webm, YouTube, Google Drive
4. **正確答案格式**：`correctAnswer` 應該匹配選項的 `text` 字段
5. **圖片輪播建議**：
   - 建議每個選項添加 2-5 張圖片
   - 過多圖片可能影響用戶體驗
   - 確保同一選項內的圖片具有相關性
   - 單張圖片不會顯示輪播控制（直接顯示）
6. **數據格式靈活性**：
   - `imageUrl` 可以是字符串（單張）或數組（多張）
   - 系統會自動識別並適配顯示方式
   - 完全向後兼容舊的字符串格式

## 示例場景

### 情景1：音樂識別題
每個選項包含音樂片段的音頻，讓學生聽音樂猜樂器或歌曲。

### 情景2：圖片識別題
每個選項顯示不同的圖片，讓學生選擇符合描述的圖片。

### 情景3：視頻分析題
每個選項包含一段短視頻，讓學生選擇正確的答案。

### 情景4：混合媒體題
同時使用圖片、音頻和視頻，創建豐富的多媒體題目。

### 情景5：藝術作品比較題 ⭐ 新功能
每個選項包含多張圖片輪播，展示同一系列或同一畫家的多幅作品，讓學生通過觀察多張圖片來做出判斷。

**範例**：
- 題目：「以下哪組畫作都是梵谷的作品？」
- 選項 A：展示 4 張梵谷畫作的輪播
- 選項 B：展示 3 張莫奈畫作的輪播
- 選項 C：展示 3 張畢卡索畫作的輪播
- 選項 D：展示單張達文西畫作

### 情景6：產品對比題 ⭐ 新功能
每個選項包含多張產品圖片（不同角度、不同特寫），讓學生通過完整觀察來選擇正確答案。

### 情景7：故事序列題 ⭐ 新功能
每個選項包含多張連續圖片，展示一個故事或過程，讓學生選擇正確的順序或結果。

### 情景8：建築風格比較題 ⭐⭐ 新功能
- **題目**：展示多張某種建築風格的圖片（如哥德式建築的不同角度）
- **選項**：每個選項展示一組不同建築風格的圖片
- **目標**：學生通過觀察題目中的多張圖片，理解該風格的特徵，然後選擇相同風格的建築群

### 情景9：作品鑑賞題 ⭐⭐ 新功能
- **題目**：展示一組藝術作品的多張細節圖
- **選項**：提供不同藝術家或風格的選擇
- **目標**：通過觀察多個細節來判斷作品的創作者或風格

### 情景10：實驗步驟題 ⭐⭐ 新功能
- **題目**：展示實驗的多個步驟圖片
- **選項**：不同的實驗結果或下一步操作
- **目標**：根據實驗過程選擇正確的結果或操作
