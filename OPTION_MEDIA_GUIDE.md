# 選項媒體功能使用指南

## 功能概述

現在每個選項都支持添加：
- 📝 **文本**：選項的文字描述
- 🖼️ **圖片**：選項的圖片展示
- 🎵 **音頻**：選項的音頻內容
- 🎬 **影片**：選項的視頻內容

## 數據結構

### 新格式（對象格式）
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
3. 在選項區域，每個選項卡片包含四個輸入框：
   - **選項文本**：輸入選項的文字內容
   - **圖片網址**：輸入圖片 URL（可選）
   - **音頻網址**：輸入音頻 URL（可選）
   - **影片網址**：輸入視頻 URL（可選）

4. 所有媒體 URL 都支持：
   - 直接鏈接（https://example.com/file.jpg）
   - Google Drive 分享鏈接
   - YouTube 鏈接（僅視頻）

### 2. 通過 JSON 導入

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

## 顯示效果

在答題對話框中，每個選項按鈕會顯示：
1. **選項文本**（始終顯示）
2. **圖片**（如果提供）
   - 最大寬度 100%
   - 最大高度 200px
   - 自動縮放保持比例
3. **音頻播放器**（如果提供）
   - 標準 HTML5 音頻控件
   - 最大寬度 300px
4. **視頻播放器**（如果提供）
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
   - 圖片：jpg, png, gif, webp
   - 音頻：mp3, wav, ogg
   - 視頻：mp4, webm, YouTube, Google Drive
4. **正確答案格式**：`correctAnswer` 應該匹配選項的 `text` 字段

## 示例場景

### 情景1：音樂識別題
每個選項包含音樂片段的音頻，讓學生聽音樂猜樂器或歌曲。

### 情景2：圖片識別題
每個選項顯示不同的圖片，讓學生選擇符合描述的圖片。

### 情景3：視頻分析題
每個選項包含一段短視頻，讓學生選擇正確的答案。

### 情景4：混合媒體題
同時使用圖片、音頻和視頻，創建豐富的多媒體題目。
