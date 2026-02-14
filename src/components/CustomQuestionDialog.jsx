import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Card,
  CardContent,
  CardActions,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import { HexColorPicker } from 'react-colorful';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ paddingTop: '20px' }}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function CustomQuestionDialog({ 
  open, 
  onClose, 
  onSave, 
  existingCategories,
  customCategories,
  customQuestions,
  onDelete,
  onEdit,
  onImportJSON,
}) {
  const [tabValue, setTabValue] = useState(0);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  
  // 類別表單狀態
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    nameEn: '',
    color: '#4CAF50',
  });

  // 問題表單狀態
  const [questionForm, setQuestionForm] = useState({
    categoryName: '',
    points: 100,
    question: '',
    imageUrl: '',
    audioUrl: '',
    videoUrl: '',
    options: ['(A) ', '(B) ', '(C) ', '(D) '],
    correctAnswer: '',
    explanation: '',
    timeLimit: 30,
  });

  // JSON上傳狀態
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSuccessMessage('');
    setJsonError('');
    setEditingCategory(null);
    setEditingQuestion(null);
    setUploadedFileName('');
  };

  // 類別相關處理
  const handleCategoryChange = (field, value) => {
    setCategoryForm(prev => ({ ...prev, [field]: value }));
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      nameEn: category.nameEn,
      color: category.color,
    });
    setTabValue(0); // 切換到添加類別標籤
  };

  const handleSaveCategory = () => {
    if (!categoryForm.name || !categoryForm.nameEn) {
      alert('請填寫完整的類別信息');
      return;
    }

    if (editingCategory) {
      // 編輯模式
      const updatedCategory = {
        ...editingCategory,
        name: categoryForm.name,
        nameEn: categoryForm.nameEn,
        color: categoryForm.color,
      };
      onEdit('category', updatedCategory);
      setSuccessMessage('類別已成功更新！');
      setEditingCategory(null);
    } else {
      // 新增模式
      const newCategory = {
        id: Date.now(),
        name: categoryForm.name,
        nameEn: categoryForm.nameEn,
        color: categoryForm.color,
      };
      onSave('category', newCategory);
      setSuccessMessage('類別已成功添加！');
    }
    
    // 清空表單
    setCategoryForm({
      name: '',
      nameEn: '',
      color: '#4CAF50',
    });
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditingQuestion(null);
    setCategoryForm({
      name: '',
      nameEn: '',
      color: '#4CAF50',
    });
    setQuestionForm({
      categoryName: '',
      points: 100,
      question: '',
      imageUrl: '',
      audioUrl: '',
      videoUrl: '',
      options: ['(A) ', '(B) ', '(C) ', '(D) '],
      correctAnswer: '',
      explanation: '',
      timeLimit: 30,
    });
  };

  // 問題相關處理
  const handleQuestionChange = (field, value) => {
    setQuestionForm(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...questionForm.options];
    newOptions[index] = value;
    setQuestionForm(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    const nextLetter = String.fromCharCode(65 + questionForm.options.length);
    setQuestionForm(prev => ({
      ...prev,
      options: [...prev.options, `(${nextLetter}) `],
    }));
  };

  const removeOption = (index) => {
    if (questionForm.options.length > 2) {
      const newOptions = questionForm.options.filter((_, i) => i !== index);
      setQuestionForm(prev => ({ ...prev, options: newOptions }));
    }
  };

  const handleEditQuestion = (categoryName, question) => {
    setEditingQuestion({ categoryName, question });
    setQuestionForm({
      categoryName: categoryName,
      points: question.points,
      question: question.question,
      imageUrl: question.imageUrl || '',
      audioUrl: question.audioUrl || '',
      videoUrl: question.videoUrl || '',
      options: question.options,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation || '',
      timeLimit: question.timeLimit,
    });
    setTabValue(1); // 切換到添加題目標籤
  };

  const handleSaveQuestion = () => {
    if (!questionForm.categoryName || !questionForm.question) {
      alert('請至少填寫類別和問題');
      return;
    }

    const questionData = {
      points: parseInt(questionForm.points),
      question: questionForm.question,
      imageUrl: questionForm.imageUrl || undefined,
      audioUrl: questionForm.audioUrl || undefined,
      videoUrl: questionForm.videoUrl || undefined,
      options: questionForm.options.filter(opt => opt.trim() !== ''),
      correctAnswer: questionForm.correctAnswer,
      explanation: questionForm.explanation || undefined,
      timeLimit: parseInt(questionForm.timeLimit),
    };

    if (editingQuestion) {
      // 編輯模式
      const updatedQuestion = {
        ...editingQuestion.question,
        ...questionData,
      };
      onEdit('question', {
        categoryName: questionForm.categoryName,
        question: updatedQuestion,
      });
      setSuccessMessage('題目已成功更新！');
      setEditingQuestion(null);
    } else {
      // 新增模式
      const newQuestion = {
        id: Date.now(),
        ...questionData,
      };
      onSave('question', {
        categoryName: questionForm.categoryName,
        question: newQuestion,
      });
      setSuccessMessage('題目已成功添加！');
    }

    // 清空表單
    setQuestionForm({
      categoryName: questionForm.categoryName,
      points: 100,
      question: '',
      imageUrl: '',
      audioUrl: '',
      videoUrl: '',
      options: ['(A) ', '(B) ', '(C) ', '(D) '],
      correctAnswer: '',
      explanation: '',
      timeLimit: 30,
    });
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('確定要刪除此類別嗎？這將同時刪除該類別下的所有題目。')) {
      onDelete('category', categoryId);
      setSuccessMessage('類別已刪除！');
    }
  };

  const handleDeleteQuestion = (categoryName, questionId) => {
    if (window.confirm('確定要刪除此題目嗎？')) {
      onDelete('question', { categoryName, questionId });
      setSuccessMessage('題目已刪除！');
    }
  };

  // 文件上傳處理
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 檢查文件類型
    if (!file.name.endsWith('.json') && !file.name.endsWith('.js')) {
      setJsonError('請上傳 .json 或 .js 格式的文件');
      event.target.value = ''; // 清空文件選擇
      return;
    }

    setUploadedFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let content = e.target.result;
        
        // 如果是 .js 文件，嘗試提取 JSON 部分
        if (file.name.endsWith('.js')) {
          // 移除可能的 export 語句和其他 JS 語法
          content = content
            .replace(/export\s+(default\s+)?/g, '')
            .replace(/const\s+\w+\s*=\s*/g, '')
            .replace(/;?\s*$/g, '');
        }
        
        setJsonInput(content);
        setJsonError('');
      } catch (error) {
        setJsonError(`讀取文件失敗：${error.message}`);
        setUploadedFileName('');
      }
    };
    
    reader.onerror = () => {
      setJsonError('讀取文件失敗');
      setUploadedFileName('');
    };
    
    reader.readAsText(file);
    event.target.value = ''; // 清空文件選擇，允許重複上傳同一文件
  };

  // JSON處理
  const validateJSON = (jsonData) => {
    try {
      // 檢查是否有categories和questions
      if (!jsonData.categories || !Array.isArray(jsonData.categories)) {
        return { valid: false, error: '缺少 categories 陣列' };
      }
      if (!jsonData.questions || typeof jsonData.questions !== 'object') {
        return { valid: false, error: '缺少 questions 物件' };
      }

      // 驗證categories格式
      for (const cat of jsonData.categories) {
        if (!cat.id || !cat.name || !cat.nameEn || !cat.color) {
          return { valid: false, error: `類別格式錯誤：缺少必要欄位 (id, name, nameEn, color)` };
        }
      }

      // 驗證questions格式
      for (const [categoryName, questions] of Object.entries(jsonData.questions)) {
        if (!Array.isArray(questions)) {
          return { valid: false, error: `類別 "${categoryName}" 的題目必須是陣列` };
        }
        for (const q of questions) {
          if (!q.id || !q.points || !q.question || !q.options || !q.correctAnswer || !q.timeLimit) {
            return { valid: false, error: `題目格式錯誤：缺少必要欄位 (id, points, question, options, correctAnswer, timeLimit)` };
          }
          if (!Array.isArray(q.options)) {
            return { valid: false, error: '選項必須是陣列' };
          }
        }
      }

      return { valid: true };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  };

  const handleImportJSON = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      const validation = validateJSON(jsonData);
      
      if (!validation.valid) {
        setJsonError(`格式驗證失敗：${validation.error}`);
        return;
      }

      onImportJSON(jsonData);
      setSuccessMessage('JSON 數據已成功導入！');
      setJsonInput('');
      setJsonError('');
      setUploadedFileName('');
    } catch (error) {
      setJsonError(`JSON 解析失敗：${error.message}`);
    }
  };

  const handleExportJSON = () => {
    const exportData = {
      categories: customCategories,
      questions: customQuestions,
    };
    
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `智慧王題庫_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setSuccessMessage('題庫已導出！');
  };

  const getFormatExample = () => {
    return {
      categories: [
        {
          id: 1,
          name: "地理",
          nameEn: "Geography",
          color: "#4CAF50"
        }
      ],
      questions: {
        "地理": [
          {
            id: 1,
            points: 100,
            question: "世界上最長的河流是哪一條？",
            imageUrl: "https://example.com/image.jpg",
            audioUrl: "https://example.com/audio.mp3",
            videoUrl: "https://example.com/video.mp4",
            options: ["(A) 亞馬遜河", "(B) 長江", "(C) 尼羅河", "(D) 密西西比河"],
            correctAnswer: "(C) 尼羅河",
            explanation: "尼羅河長約6650公里",
            timeLimit: 30
          }
        ]
      }
    };
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '70vh',
          maxHeight: '90vh',
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="div" fontWeight="bold">
          自定義題目管理
        </Typography>
      </DialogTitle>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ px: 3 }} variant="scrollable" scrollButtons="auto">
        <Tab label="添加類別" />
        <Tab label="添加題目" />
        <Tab label="管理類別" />
        <Tab label="管理題目" />
        <Tab label="JSON 上傳" />
      </Tabs>

      <DialogContent>
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage('')}>
            {successMessage}
          </Alert>
        )}

        {/* 添加類別面板 */}
        <TabPanel value={tabValue} index={0}>
          <Stack spacing={3}>
            {editingCategory && (
              <Alert severity="info" sx={{ mb: 2 }}>
                正在編輯類別：{editingCategory.name}
                <Button size="small" onClick={handleCancelEdit} sx={{ ml: 2 }}>
                  取消編輯
                </Button>
              </Alert>
            )}
            
            <TextField
              fullWidth
              label="類別名稱（中文）"
              value={categoryForm.name}
              onChange={(e) => handleCategoryChange('name', e.target.value)}
              placeholder="例如：地理"
            />

            <TextField
              fullWidth
              label="類別名稱（英文）"
              value={categoryForm.nameEn}
              onChange={(e) => handleCategoryChange('nameEn', e.target.value)}
              placeholder="例如：Geography"
            />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                類別顏色
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  sx={{
                    width: 100,
                    height: 50,
                    backgroundColor: categoryForm.color,
                    border: '2px solid #ddd',
                    borderRadius: 1,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                />
                <TextField
                  value={categoryForm.color}
                  onChange={(e) => handleCategoryChange('color', e.target.value)}
                  size="small"
                  label="顏色代碼"
                  sx={{ width: 150 }}
                />
              </Box>

              {showColorPicker && (
                <Box sx={{ mt: 2 }}>
                  <HexColorPicker
                    color={categoryForm.color}
                    onChange={(color) => handleCategoryChange('color', color)}
                  />
                </Box>
              )}
            </Box>

            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                預覽效果：
              </Typography>
              <Chip
                label={`${categoryForm.name || '類別名稱'} - ${categoryForm.nameEn || 'Category Name'}`}
                sx={{
                  bgcolor: categoryForm.color,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  padding: '20px 10px',
                }}
              />
            </Box>
          </Stack>
        </TabPanel>

        {/* 添加題目面板 */}
        <TabPanel value={tabValue} index={1}>
          <Stack spacing={3}>
            {editingQuestion && (
              <Alert severity="info" sx={{ mb: 2 }}>
                正在編輯題目（{editingQuestion.question.points}分）
                <Button size="small" onClick={handleCancelEdit} sx={{ ml: 2 }}>
                  取消編輯
                </Button>
              </Alert>
            )}

            <FormControl fullWidth>
              <InputLabel>選擇類別</InputLabel>
              <Select
                value={questionForm.categoryName}
                onChange={(e) => handleQuestionChange('categoryName', e.target.value)}
                label="選擇類別"
              >
                {customCategories.length === 0 ? (
                  <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                      請先添加自定義類別
                    </Typography>
                  </MenuItem>
                ) : (
                  customCategories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.name}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: cat.color,
                            borderRadius: '50%',
                          }}
                        />
                        {cat.name} - {cat.nameEn}
                      </Box>
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="分數"
                type="number"
                value={questionForm.points}
                onChange={(e) => handleQuestionChange('points', e.target.value)}
                sx={{ width: 150 }}
                inputProps={{ min: 100, step: 100 }}
              />
              <TextField
                label="答題時間（秒）"
                type="number"
                value={questionForm.timeLimit}
                onChange={(e) => handleQuestionChange('timeLimit', e.target.value)}
                sx={{ width: 150 }}
                inputProps={{ min: 10, step: 5 }}
              />
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="問題內容"
              value={questionForm.question}
              onChange={(e) => handleQuestionChange('question', e.target.value)}
              placeholder="輸入你的問題..."
            />

            <TextField
              fullWidth
              label="圖片網址（可選）"
              value={questionForm.imageUrl}
              onChange={(e) => handleQuestionChange('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
              helperText="如果題目需要顯示圖片，請輸入圖片網址"
            />

            {questionForm.imageUrl && (
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  圖片預覽：
                </Typography>
                <Box
                  component="img"
                  src={questionForm.imageUrl}
                  alt="預覽"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: 200,
                    borderRadius: 1,
                    mt: 1
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <Typography variant="caption" color="error" sx={{ display: 'none' }}>
                  無法載入圖片，請檢查網址是否正確
                </Typography>
              </Box>
            )}

            <TextField
              fullWidth
              label="音頻網址（可選）"
              value={questionForm.audioUrl}
              onChange={(e) => handleQuestionChange('audioUrl', e.target.value)}
              placeholder="https://example.com/audio.mp3"
              helperText="支援 mp3、wav、ogg 等音頻格式"
            />

            {questionForm.audioUrl && (
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  音頻播放器：
                </Typography>
                <audio 
                  controls 
                  style={{ width: '100%', marginTop: '8px' }}
                  src={questionForm.audioUrl}
                >
                  您的瀏覽器不支援音頻播放
                </audio>
              </Box>
            )}

            <TextField
              fullWidth
              label="影片網址（可選）"
              value={questionForm.videoUrl}
              onChange={(e) => handleQuestionChange('videoUrl', e.target.value)}
              placeholder="https://example.com/video.mp4"
              helperText="支援 mp4、webm、ogg 等影片格式，或 YouTube 網址"
            />

            {questionForm.videoUrl && (
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  影片預覽：
                </Typography>
                {questionForm.videoUrl.includes('youtube.com') || questionForm.videoUrl.includes('youtu.be') ? (
                  <Box
                    component="iframe"
                    src={questionForm.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                    sx={{
                      width: '100%',
                      height: 200,
                      borderRadius: 1,
                      mt: 1,
                      border: 'none'
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video 
                    controls 
                    style={{ width: '100%', maxHeight: '200px', marginTop: '8px', borderRadius: '4px' }}
                    src={questionForm.videoUrl}
                  >
                    您的瀏覽器不支援影片播放
                  </video>
                )}
              </Box>
            )}

            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1">選項</Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={addOption}
                  size="small"
                  disabled={questionForm.options.length >= 10}
                >
                  添加選項
                </Button>
              </Box>

              {questionForm.options.map((option, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`選項 ${String.fromCharCode(65 + index)}`}
                  />
                  <IconButton
                    onClick={() => removeOption(index)}
                    disabled={questionForm.options.length <= 2}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>

            <TextField
              fullWidth
              label="正確答案"
              value={questionForm.correctAnswer}
              onChange={(e) => handleQuestionChange('correctAnswer', e.target.value)}
              placeholder="例如：(A) 答案內容 或直接輸入答案"
              helperText="請輸入完整的正確答案"
            />

            <TextField
              fullWidth
              multiline
              rows={2}
              label="答案解釋（可選）"
              value={questionForm.explanation}
              onChange={(e) => handleQuestionChange('explanation', e.target.value)}
              placeholder="可以添加答案的詳細解釋..."
            />
          </Stack>
        </TabPanel>

        {/* 管理類別面板 */}
        <TabPanel value={tabValue} index={2}>
          {customCategories.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                尚未添加任何自定義類別
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {customCategories.map((category) => (
                <Card key={category.id} variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: category.color,
                          borderRadius: 1,
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">
                          {category.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {category.nameEn}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => handleEditCategory(category)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteCategory(category.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </TabPanel>

        {/* 管理題目面板 */}
        <TabPanel value={tabValue} index={3}>
          {Object.keys(customQuestions).length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                尚未添加任何自定義題目
              </Typography>
            </Box>
          ) : (
            <Stack spacing={3}>
              {Object.entries(customQuestions).map(([categoryName, questions]) => (
                <Box key={categoryName}>
                  <Typography variant="h6" gutterBottom sx={{ 
                    color: existingCategories.find(c => c.name === categoryName)?.color || '#000',
                    fontWeight: 'bold'
                  }}>
                    {categoryName}
                  </Typography>
                  <Stack spacing={1}>
                    {questions.map((question) => (
                      <Card key={question.id} variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle2" color="primary" gutterBottom>
                                {question.points} 分
                              </Typography>
                              <Typography variant="body2">
                                {question.question}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                                {question.imageUrl && (
                                  <Chip 
                                    label="含圖片" 
                                    size="small"
                                    color="info"
                                  />
                                )}
                                {question.audioUrl && (
                                  <Chip 
                                    label="含音頻" 
                                    size="small"
                                    color="success"
                                  />
                                )}
                                {question.videoUrl && (
                                  <Chip 
                                    label="含影片" 
                                    size="small"
                                    color="warning"
                                  />
                                )}
                              </Box>
                            </Box>
                            <Box>
                              <IconButton
                                onClick={() => handleEditQuestion(categoryName, question)}
                                color="primary"
                                size="small"
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDeleteQuestion(categoryName, question.id)}
                                color="error"
                                size="small"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Stack>
          )}
        </TabPanel>

        {/* JSON 上傳面板 */}
        <TabPanel value={tabValue} index={4}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" gutterBottom>
                導入 JSON 題庫
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                可以上傳 .json 或 .js 格式的文件，或直接貼上 JSON 數據。
              </Typography>
            </Box>

            {jsonError && (
              <Alert severity="error" onClose={() => setJsonError('')}>
                {jsonError}
              </Alert>
            )}

            {/* 文件上傳區域 */}
            <Box>
              <input
                accept=".json,.js"
                style={{ display: 'none' }}
                id="json-file-upload"
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="json-file-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<UploadFileIcon />}
                  fullWidth
                  sx={{ py: 2 }}
                >
                  選擇文件上傳 (.json 或 .js)
                </Button>
              </label>
              {uploadedFileName && (
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    label={`已選擇：${uploadedFileName}`}
                    color="primary"
                    onDelete={() => {
                      setUploadedFileName('');
                      setJsonInput('');
                    }}
                  />
                </Box>
              )}
            </Box>

            <Divider>
              <Chip label="或" />
            </Divider>

            <TextField
              fullWidth
              multiline
              rows={10}
              label="JSON 數據"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="直接貼上 JSON 格式的題庫數據..."
              variant="outlined"
            />

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<UploadFileIcon />}
                onClick={handleImportJSON}
                disabled={!jsonInput}
              >
                導入數據
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExportJSON}
                disabled={customCategories.length === 0}
              >
                導出當前題庫
              </Button>
              {jsonInput && (
                <Button
                  variant="text"
                  color="error"
                  onClick={() => {
                    setJsonInput('');
                    setUploadedFileName('');
                    setJsonError('');
                  }}
                >
                  清空
                </Button>
              )}
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom>
                JSON 格式範例
              </Typography>
              <Paper sx={{ 
                p: 2, 
                bgcolor: '#f5f5f5', 
                maxHeight: 400, 
                overflow: 'auto',
                border: '1px solid #e0e0e0'
              }}>
                <pre style={{ 
                  margin: 0, 
                  fontSize: '0.875rem',
                  color: '#1a1a1a',
                  fontFamily: 'monospace',
                  lineHeight: 1.5
                }}>
                  {JSON.stringify(getFormatExample(), null, 2)}
                </pre>
              </Paper>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                注意：
                <br />• categories 必須包含 id, name, nameEn, color
                <br />• questions 必須按類別名稱分組
                <br />• 每個題目必須包含 id, points, question, options, correctAnswer, timeLimit
                <br />• imageUrl、audioUrl、videoUrl 和 explanation 是可選欄位
                <br />• audioUrl 支援 mp3、wav、ogg 等音頻格式
                <br />• videoUrl 支援 mp4、webm 等影片格式，或 YouTube 網址
              </Typography>
            </Box>
          </Stack>
        </TabPanel>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button onClick={onClose} variant="outlined">
          關閉
        </Button>
        {tabValue === 0 && (
          <Button onClick={handleSaveCategory} variant="contained" color="primary">
            {editingCategory ? '更新類別' : '保存類別'}
          </Button>
        )}
        {tabValue === 1 && (
          <Button onClick={handleSaveQuestion} variant="contained" color="primary">
            {editingQuestion ? '更新題目' : '保存題目'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default CustomQuestionDialog;
