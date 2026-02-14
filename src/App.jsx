import { useState, useEffect } from 'react'
import { Box, Container, Grid, Paper, Typography, Zoom, Slide, Button, IconButton, Fade } from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import UndoIcon from '@mui/icons-material/Undo';
import AddIcon from '@mui/icons-material/Add';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import categories from './data/categories'
import questions from './data/questions'
import QuestionDialog from './components/QuestionDialog'
import CustomQuestionDialog from './components/CustomQuestionDialog'
import brainIcon from './assets/img/brain.png'
import ScoreBoard from './components/ScoreBoard'
import ScoreBoardDialog from './components/ScoreBoardDialog'

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(5deg); }
  75% { transform: translateY(10px) rotate(-5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const fadeOutUpAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0) scale(0.6);
  }
`;

const typewriterAnimation = keyframes`
  0% { 
    clip-path: inset(0 100% 0 0);
  }
  100% { 
    clip-path: inset(0 0 0 0);
  }
`;

const blinkCursorAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const AnimatedTitle = styled(Typography)`
  display: inline-block;
  white-space: nowrap;
  position: relative;
  animation: ${typewriterAnimation} 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  &::after {
    content: '';
    position: absolute;
    right: -4px;
    top: 0;
    height: 100%;
    width: 4px;
    background-color: white;
    animation: ${blinkCursorAnimation} 0.8s infinite;
  }
`;

const FloatingIcon = styled('img')`
  animation: ${floatAnimation} 3s ease-in-out infinite;
`;

const CategoryCard = styled(Paper)(({ theme, color }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
  backgroundColor: color,
  height: 'auto',
  minHeight: {
    xs: '160px',
    sm: '170px',
    md: '180px'
  },
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  }
}));

const PointButton = styled(Paper, {
  shouldForwardProp: (prop) => !['answered'].includes(prop)
})(({ theme, answered }) => ({
  padding: theme.spacing(0.5),
  width: {
    xs: '40px',
    sm: '45px',
    md: '50px'
  },
  height: {
    xs: '32px',
    sm: '36px',
    md: '40px'
  },
  textAlign: 'center',
  cursor: answered ? 'default' : 'pointer',
  backgroundColor: answered ? '#666' : theme.palette.background.paper,
  opacity: answered ? 0.7 : 1,
  transition: 'all 0.2s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    transform: answered ? 'none' : 'scale(1.1)',
    backgroundColor: answered ? '#666' : theme.palette.action.hover,
  },
}));

const ExpandingButton = styled(Button)(({ theme }) => ({
  minWidth: '50px',
  width: '50px',
  height: '50px',
  borderRadius: '25px',
  padding: 0,
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  backgroundColor: '#f44336',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  '& .MuiSvgIcon-root': {
    transition: 'all 0.3s ease-in-out',
    fontSize: '1.8rem',
  },
  '& .button-text': {
    opacity: 0,
    width: 0,
    transition: 'all 0.3s ease-in-out',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  '&:hover': {
    width: '200px',
    backgroundColor: '#d32f2f',
    '& .button-text': {
      opacity: 1,
      width: 'auto',
      marginLeft: '8px',
    },
    '& .MuiSvgIcon-root': {
      transform: 'rotate(-360deg)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '40px',
    width: '40px',
    height: '40px',
    '& .MuiSvgIcon-root': {
      fontSize: '1.5rem',
    },
    '&:hover': {
      width: '160px',
    },
  },
}));

function App() {
  const fullTitle = "腦洞星期五";
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(() => {
    const saved = localStorage.getItem('answeredQuestions');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [titleText, setTitleText] = useState(fullTitle);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scoreBoardOpen, setScoreBoardOpen] = useState(false);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [teams, setTeams] = useState(() => {
    const savedTeams = localStorage.getItem('scoreboardTeams');
    return savedTeams ? JSON.parse(savedTeams) : [];
  });
  
  // 自定義類別和題目
  const [customCategories, setCustomCategories] = useState(() => {
    const saved = localStorage.getItem('customCategories');
    return saved ? JSON.parse(saved) : [];
  });
  const [customQuestions, setCustomQuestions] = useState(() => {
    const saved = localStorage.getItem('customQuestions');
    return saved ? JSON.parse(saved) : {};
  });
  
  // 題庫切換狀態 (true: 自定義題庫, false: 預設題庫)
  const [useCustomQuestionBank, setUseCustomQuestionBank] = useState(() => {
    const saved = localStorage.getItem('useCustomQuestionBank');
    return saved ? JSON.parse(saved) : false;
  });
  
  // 檢查是否有自定義數據
  const hasCustomData = customCategories.length > 0 || Object.keys(customQuestions).length > 0;
  
  // 根據切換狀態決定使用哪個題庫
  const allCategories = useCustomQuestionBank && hasCustomData ? customCategories : categories;
  const allQuestions = useCustomQuestionBank && hasCustomData ? customQuestions : questions;
  
  useEffect(() => {
    // 等待動畫完成後消失
    const timer = setTimeout(() => {
      setShowTitle(false);
    }, 1500); // 0.8s動畫 + 0.7s等待

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save to localStorage whenever answeredQuestions changes
  useEffect(() => {
    localStorage.setItem('answeredQuestions', JSON.stringify([...answeredQuestions]));
  }, [answeredQuestions]);

  // Add this useEffect to load teams from localStorage
  useEffect(() => {
    const savedTeams = localStorage.getItem('scoreboardTeams');
    if (savedTeams) {
      setTeams(JSON.parse(savedTeams));
    }
  }, [scoreBoardOpen]);

  // 保存自定義類別到 localStorage
  useEffect(() => {
    localStorage.setItem('customCategories', JSON.stringify(customCategories));
  }, [customCategories]);

  // 保存自定義題目到 localStorage
  useEffect(() => {
    localStorage.setItem('customQuestions', JSON.stringify(customQuestions));
  }, [customQuestions]);

  // 保存題庫切換狀態到 localStorage
  useEffect(() => {
    localStorage.setItem('useCustomQuestionBank', JSON.stringify(useCustomQuestionBank));
  }, [useCustomQuestionBank]);

  const handlePointClick = (category, points) => {
    // Don't open if already answered
    if (isQuestionAnswered(category, points)) {
      return;
    }
    
    setSelectedCategory(category);
    // Get questions for this category and points
    const categoryQuestions = allQuestions[category.name] || [];
    const pointQuestion = categoryQuestions.find(q => q.points === points);
    if (pointQuestion) {
      setCurrentQuestion(pointQuestion);
      setDialogOpen(true);
    }
  };

  const handleQuestionClose = () => {
    setDialogOpen(false);
    setCurrentQuestion(null);
    setSelectedCategory(null);
  };

  const handleAnswerShown = (questionId) => {
    if (currentQuestion && selectedCategory) {
      setAnsweredQuestions(prev => {
        const newSet = new Set(prev);
        newSet.add(`${selectedCategory.name}-${currentQuestion.points}`);
        return newSet;
      });
    }
  };

  const handleReset = () => {
    setAnsweredQuestions(new Set());
    localStorage.removeItem('answeredQuestions');
  };

  const isQuestionAnswered = (category, points) => {
    return answeredQuestions.has(`${category.name}-${points}`);
  };

  // 獲取指定類別的所有分數值（已排序）
  const getCategoryPoints = (categoryName) => {
    const categoryQuestions = allQuestions[categoryName] || [];
    const points = categoryQuestions.map(q => q.points);
    // 去重並排序
    return [...new Set(points)].sort((a, b) => a - b);
  };

  const handleScoreBoardOpen = () => {
    setScoreBoardOpen(true);
  };

  const handleScoreBoardClose = () => {
    setScoreBoardOpen(false);
  };

  const handleCustomDialogOpen = () => {
    setCustomDialogOpen(true);
  };

  const handleCustomDialogClose = () => {
    setCustomDialogOpen(false);
  };

  const handleToggleQuestionBank = () => {
    if (!hasCustomData && !useCustomQuestionBank) {
      alert('尚未添加自定義題庫，請先添加自定義題目！');
      return;
    }
    setUseCustomQuestionBank(prev => !prev);
  };

  const handleSaveCustomData = (type, data) => {
    if (type === 'category') {
      // 添加新類別
      setCustomCategories(prev => [...prev, data]);
      // 初始化該類別的題目數組
      setCustomQuestions(prev => ({
        ...prev,
        [data.name]: prev[data.name] || []
      }));
    } else if (type === 'question') {
      // 添加新題目到指定類別
      setCustomQuestions(prev => {
        const categoryQuestions = prev[data.categoryName] || [];
        return {
          ...prev,
          [data.categoryName]: [...categoryQuestions, data.question]
        };
      });
    }
  };

  const handleDeleteCustomData = (type, data) => {
    if (type === 'category') {
      // 刪除類別
      setCustomCategories(prev => prev.filter(cat => cat.id !== data));
      // 同時刪除該類別下的所有題目
      setCustomQuestions(prev => {
        const category = customCategories.find(cat => cat.id === data);
        if (category) {
          const { [category.name]: _, ...rest } = prev;
          return rest;
        }
        return prev;
      });
    } else if (type === 'question') {
      // 刪除題目
      setCustomQuestions(prev => {
        const categoryQuestions = prev[data.categoryName] || [];
        return {
          ...prev,
          [data.categoryName]: categoryQuestions.filter(q => q.id !== data.questionId)
        };
      });
    }
  };

  const handleEditCustomData = (type, data) => {
    if (type === 'category') {
      // 編輯類別
      setCustomCategories(prev => 
        prev.map(cat => cat.id === data.id ? data : cat)
      );
      // 如果類別名稱改變了，需要更新 questions 中的鍵
      const oldCategory = customCategories.find(cat => cat.id === data.id);
      if (oldCategory && oldCategory.name !== data.name) {
        setCustomQuestions(prev => {
          const questions = prev[oldCategory.name] || [];
          const { [oldCategory.name]: _, ...rest } = prev;
          return {
            ...rest,
            [data.name]: questions
          };
        });
      }
    } else if (type === 'question') {
      // 編輯題目
      setCustomQuestions(prev => {
        const categoryQuestions = prev[data.categoryName] || [];
        return {
          ...prev,
          [data.categoryName]: categoryQuestions.map(q => 
            q.id === data.question.id ? data.question : q
          )
        };
      });
    }
  };

  const handleImportJSON = (jsonData) => {
    // 導入 JSON 數據
    setCustomCategories(jsonData.categories);
    setCustomQuestions(jsonData.questions);
  };

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        pt: { xs: 16, sm: 18, md: 20 },
        pb: { xs: 2, sm: 3, md: 4 },
        width: { 
          xs: '98%',
          sm: '95%',
          md: '90%',
          lg: '85%' 
        },
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: showTitle ? '100vh' : 'auto',
        backgroundColor: showTitle ? 'rgba(0,0,0,0.9)' : 'transparent',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 1000,
        display: 'flex',
        alignItems: showTitle ? 'center' : 'flex-start',
        justifyContent: 'center',
        opacity: isScrolled ? 0 : 1,
        visibility: isScrolled ? 'hidden' : 'visible',
        transform: isScrolled ? 'translateY(-100%)' : 'none'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 2, sm: 3, md: 4 },
          transform: showTitle 
            ? 'translateY(0)' 
            : 'translateY(0) scale(0.7)',
          py: showTitle 
            ? { xs: 4, sm: 6, md: 8 }
            : { xs: 3, sm: 4, md: 5 },
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          width: '100%'
        }}>
          <FloatingIcon 
            src={brainIcon} 
            alt="Brain Icon" 
            sx={{
              width: { 
                xs: showTitle ? '60px' : '70px',
                sm: showTitle ? '80px' : '90px',
                md: showTitle ? '100px' : '110px'
              },
              height: { 
                xs: showTitle ? '60px' : '70px',
                sm: showTitle ? '80px' : '90px',
                md: showTitle ? '100px' : '110px'
              },
              objectFit: 'contain',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
          <AnimatedTitle 
            variant="h1" 
            component="h1"
            sx={{
              fontSize: {
                xs: showTitle ? '2.5rem' : '2.8rem',
                sm: showTitle ? '3.5rem' : '3.8rem',
                md: showTitle ? '4.5rem' : '4.8rem'
              },
              color: 'white',
              textShadow: '4px 4px 8px rgba(0,0,0,0.5)',
              fontWeight: 'bold',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {titleText}
          </AnimatedTitle>
        </Box>
      </Box>

      {/* Add ScoreBoard button in the top-right corner */}
      <Box sx={{ 
        position: 'fixed',
        top: { xs: 16, sm: 24, md: 32 },
        right: { xs: 16, sm: 24, md: 32 },
        zIndex: 1000,
        opacity: showTitle ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out',
        transitionDelay: '0.3s',
      }}>
        <ScoreBoard 
          onClick={handleScoreBoardOpen} 
          teamCount={teams.length}
        />
      </Box>

      <Box sx={{ 
        flexGrow: 1, 
        opacity: showTitle ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out',
        transitionDelay: '0.3s',
        position: 'relative',
        zIndex: 1
      }}>
        <Grid 
          container 
          spacing={{ xs: 1, sm: 1.5, md: 2 }}
          sx={{ 
            p: { xs: 1, sm: 1.5, md: 2 },
            width: '100%',
            margin: '0 auto',
            justifyContent: 'center'
          }}
        >
          {Object.entries(allQuestions).map(([categoryName, categoryQuestions]) => (
            <Grid 
              item 
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={categoryName}
              sx={{
                mb: { xs: 1, sm: 1.5, md: 2 },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CategoryCard color={allCategories.find(c => c.name === categoryName)?.color || '#1a237e'}>
                <Box>
                  <Typography 
                    variant="h2" 
                    component="div" 
                    className="category-title" 
                    sx={{ 
                      color: 'white',
                      fontWeight: 'bold',
                      mb: { xs: 0.5, sm: 0.75, md: 1 },
                      fontSize: {
                        xs: '1.4rem',
                        sm: '1.6rem',
                        md: '1.8rem'
                      },
                      lineHeight: 1.2,
                      padding: '0 10px',
                      width: '100%',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    {categoryName}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: {
                        xs: '0.8rem',
                        sm: '0.9rem',
                        md: '1rem'
                      },
                      mb: { xs: 1, sm: 1.5, md: 2 }
                    }}
                  >
                    {allCategories.find(c => c.name === categoryName)?.nameEn || categoryName}
                  </Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  gap: { xs: '4px', sm: '6px', md: '8px' },
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  mb: { xs: 1, sm: 1.5, md: 2 },
                  width: '100%',
                  px: { xs: 0.5, sm: 1, md: 1.5 }
                }}>
                  {getCategoryPoints(categoryName).map((points) => (
                    <PointButton
                      key={points}
                      answered={isQuestionAnswered({ name: categoryName }, points)}
                      onClick={() => handlePointClick({ name: categoryName }, points)}
                      elevation={2}
                    >
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontSize: {
                            xs: '0.9rem',
                            sm: '1rem',
                            md: '1.1rem'
                          },
                          fontWeight: 'bold',
                          color: 'white',
                          userSelect: 'none'
                        }}
                      >
                        {points}
                      </Typography>
                    </PointButton>
                  ))}
                </Box>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 切換題庫按鈕 */}
      <Box sx={{ 
        position: 'fixed',
        bottom: { xs: 144, sm: 156, md: 168 },
        right: { xs: 16, sm: 24, md: 32 },
        zIndex: 1000
      }}>
        <ExpandingButton
          onClick={handleToggleQuestionBank}
          variant="contained"
          sx={{
            backgroundColor: useCustomQuestionBank ? '#FF9800' : '#4CAF50',
            '&:hover': {
              backgroundColor: useCustomQuestionBank ? '#F57C00' : '#388E3C',
            }
          }}
        >
          <SwapHorizIcon />
          <span className="button-text">
            {useCustomQuestionBank ? '切換為預設題庫' : '切換為自定義題庫'}
          </span>
        </ExpandingButton>
      </Box>

      {/* 自定義題目按鈕 */}
      <Box sx={{ 
        position: 'fixed',
        bottom: { xs: 80, sm: 90, md: 100 },
        right: { xs: 16, sm: 24, md: 32 },
        zIndex: 1000
      }}>
        <ExpandingButton
          onClick={handleCustomDialogOpen}
          variant="contained"
          sx={{
            backgroundColor: '#2196F3',
            '&:hover': {
              backgroundColor: '#1976D2',
            }
          }}
        >
          <AddIcon />
          <span className="button-text">自定義題目</span>
        </ExpandingButton>
      </Box>

      {/* 重置按鈕 */}
      <Box sx={{ 
        position: 'fixed',
        bottom: { xs: 16, sm: 24, md: 32 },
        right: { xs: 16, sm: 24, md: 32 },
        zIndex: 1000
      }}>
        <ExpandingButton
          onClick={handleReset}
          variant="contained"
        >
          <UndoIcon />
          <span className="button-text">重置所有答案</span>
        </ExpandingButton>
      </Box>

      {currentQuestion && selectedCategory && (
        <QuestionDialog
          open={dialogOpen}
          onClose={handleQuestionClose}
          question={currentQuestion}
          category={selectedCategory}
          onAnswerShown={handleAnswerShown}
        />
      )}

      {/* Add ScoreBoardDialog */}
      <ScoreBoardDialog
        open={scoreBoardOpen}
        onClose={handleScoreBoardClose}
      />

      {/* 自定義題目對話框 */}
      <CustomQuestionDialog
        open={customDialogOpen}
        onClose={handleCustomDialogClose}
        onSave={handleSaveCustomData}
        onDelete={handleDeleteCustomData}
        onEdit={handleEditCustomData}
        onImportJSON={handleImportJSON}
        existingCategories={allCategories}
        customCategories={customCategories}
        customQuestions={customQuestions}
      />
    </Container>
  )
}

export default App 