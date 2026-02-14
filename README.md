# 🧠 智慧王遊戲

一個功能豐富的題庫問答遊戲，支援多種題目類別、自定義題庫、計分板等功能。

## ✨ 功能特色

### 核心功能
- 🎯 **18+ 個題目類別**：地理、歷史、電影、動漫、音樂等
- 💯 **彈性分數系統**：支援任意分數配置（100-1000分）
- ⏱️ **倒數計時**：每題可設定答題時間限制
- 🖼️ **圖片支援**：題目可包含圖片網址
- 📊 **計分板**：追蹤多個隊伍的分數

### 自定義功能
- ✏️ **自定義題庫**：完整的題目和類別管理系統
- 🎨 **顏色選擇器**：為每個類別選擇專屬顏色
- 📁 **JSON 導入/導出**：支援 .json 和 .js 格式
- 🔄 **題庫切換**：在預設和自定義題庫間快速切換
- ✍️ **編輯功能**：可編輯已建立的類別和題目

### 使用體驗
- 🎭 **精美動畫**：流暢的標題動畫和過場效果
- 📱 **響應式設計**：支援桌面、平板和手機
- 💾 **自動保存**：答題進度和自定義內容自動儲存
- 🌓 **深色主題**：護眼的深藍色主題

## 🚀 快速開始

### 安裝

```bash
# 克隆項目
git clone https://github.com/你的用戶名/SmartKing.git

# 進入項目目錄
cd SmartKing

# 安裝依賴
npm install
```

### 開發

```bash
# 啟動開發服務器
npm run dev

# 訪問 http://localhost:5173
```

### 構建

```bash
# 構建生產版本
npm run build

# 預覽構建結果
npm run preview
```

## 📦 部署到 GitHub Pages

本項目已配置自動部署，詳細步驟請參考 [DEPLOYMENT.md](./DEPLOYMENT.md)

簡易步驟：
1. 推送代碼到 GitHub
2. 在倉庫設置中啟用 GitHub Pages（Source 選擇 GitHub Actions）
3. 完成！每次推送 main 分支都會自動部署

## 🎮 使用說明

### 開始遊戲
1. 選擇題目類別
2. 點擊分數按鈕選擇題目
3. 閱讀題目後點擊「顯示答案」
4. 確認後查看正確答案

### 自定義題庫

#### 添加類別
1. 點擊右下角藍色「自定義題目」按鈕
2. 在「添加類別」標籤填寫信息
3. 使用顏色選擇器選擇類別顏色
4. 點擊「保存類別」

#### 添加題目
1. 在「添加題目」標籤選擇類別
2. 填寫分數、時間、問題內容
3. （可選）添加圖片網址
4. 編輯選項和正確答案
5. 點擊「保存題目」

#### 導入 JSON
1. 切換到「JSON 上傳」標籤
2. 點擊「選擇文件上傳」或直接貼上 JSON
3. 點擊「導入數據」

#### 切換題庫
- 點擊右下角的切換按鈕
- 🟢 綠色：當前使用預設題庫
- 🟠 橙色：當前使用自定義題庫

## 🛠️ 技術棧

- **前端框架**：React 18
- **構建工具**：Vite 5
- **UI 框架**：Material-UI (MUI) 5
- **狀態管理**：React Hooks + localStorage
- **樣式方案**：Emotion (CSS-in-JS)
- **圖表**：MUI X-Charts
- **顏色選擇器**：react-colorful

## 📊 JSON 格式範例

```json
{
  "categories": [
    {
      "id": 1,
      "name": "地理",
      "nameEn": "Geography",
      "color": "#4CAF50"
    }
  ],
  "questions": {
    "地理": [
      {
        "id": 1,
        "points": 100,
        "question": "世界上最長的河流是哪一條？",
        "imageUrl": "https://example.com/image.jpg",
        "options": [
          "(A) 亞馬遜河",
          "(B) 長江",
          "(C) 尼羅河",
          "(D) 密西西比河"
        ],
        "correctAnswer": "(C) 尼羅河",
        "explanation": "尼羅河長約6650公里",
        "timeLimit": 30
      }
    ]
  }
}
```

## 🎨 專案結構

```
SmartKing/
├── src/
│   ├── components/          # React 組件
│   │   ├── CustomQuestionDialog.jsx  # 自定義題目管理
│   │   ├── QuestionDialog.jsx        # 題目顯示
│   │   ├── ScoreBoard.jsx            # 計分板按鈕
│   │   ├── ScoreBoardDialog.jsx      # 計分板對話框
│   │   └── Timer.jsx                 # 倒數計時器
│   ├── data/                # 資料
│   │   ├── categories.js    # 預設類別
│   │   └── questions.js     # 預設題目
│   ├── assets/              # 靜態資源
│   ├── App.jsx              # 主應用組件
│   └── main.jsx             # 應用入口
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions 部署配置
├── public/                  # 公共資源
├── index.html              # HTML 入口
├── vite.config.js          # Vite 配置
└── package.json            # 依賴配置
```

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## 👨‍💻 作者

DingYi

## 🙏 致謝

感謝所有使用和支持這個項目的人！
