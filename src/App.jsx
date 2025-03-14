import { useState, useEffect } from 'react'
import { Box, Container, Grid, Paper, Typography, Zoom, Slide, Button, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import UndoIcon from '@mui/icons-material/Undo';
import categories from './data/categories'
import questions, { pointValues } from './data/questions'
import QuestionDialog from './components/QuestionDialog'
import brainIcon from './assets/img/brain.png'

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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(() => {
    const saved = localStorage.getItem('answeredQuestions');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  // Save to localStorage whenever answeredQuestions changes
  useEffect(() => {
    localStorage.setItem('answeredQuestions', JSON.stringify([...answeredQuestions]));
  }, [answeredQuestions]);

  const handlePointClick = (category, points) => {
    // Don't open if already answered
    if (isQuestionAnswered(category, points)) {
      return;
    }
    
    setSelectedCategory(category);
    // Get questions for this category and points
    const categoryQuestions = questions[category.name] || [];
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

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        py: { xs: 2, sm: 3, md: 4 },
        width: { 
          xs: '98%',
          sm: '95%',
          md: '90%',
          lg: '85%' 
        },
        margin: '0 auto'
      }}
    >
      <Slide in={true} direction="down" timeout={1000}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 1, sm: 1.5, md: 2 },
          mb: { xs: 2, sm: 2.5, md: 3 }
        }}>
          <img 
            src={brainIcon} 
            alt="Brain Icon" 
            style={{
              width: { xs: '40px', sm: '50px', md: '60px' },
              height: { xs: '40px', sm: '50px', md: '60px' },
              objectFit: 'contain'
            }}
          />
          <Typography 
            variant="h1" 
            component="h1"
            sx={{
              fontSize: {
                xs: '1.8rem',
                sm: '2.2rem',
                md: '2.5rem'
              }
            }}
          >
            智慧王遊戲
          </Typography>
        </Box>
      </Slide>

      <Box sx={{ flexGrow: 1, mt: { xs: 2, sm: 3, md: 4 } }}>
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
          {Object.entries(questions).map(([categoryName, categoryQuestions]) => (
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
              <CategoryCard color={categories.find(c => c.name === categoryName)?.color || '#1a237e'}>
                <Typography 
                  variant="h2" 
                  component="div" 
                  className="category-title" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    mb: { xs: 1, sm: 1.5, md: 2 },
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
                <Box sx={{ 
                  display: 'flex', 
                  gap: { xs: '4px', sm: '6px', md: '8px' },
                  justifyContent: 'center',
                  flexWrap: 'nowrap',
                  mb: { xs: 1, sm: 1.5, md: 2 },
                  width: '100%',
                  px: { xs: 0.5, sm: 1, md: 1.5 }
                }}>
                  {pointValues.map((points) => (
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
    </Container>
  )
}

export default App 