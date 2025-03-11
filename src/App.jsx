import { useState } from 'react'
import { Box, Container, Grid, Paper, Typography, Zoom, Slide } from '@mui/material'
import { styled } from '@mui/material/styles'
import categories from './data/categories'
import questions, { pointValues } from './data/questions'
import QuestionDialog from './components/QuestionDialog'
import brainIcon from './assets/img/brain.png'

const CategoryCard = styled(Paper)(({ theme, color }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
  backgroundColor: color,
  height: '180px', // 增加高度以容纳分数
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const PointButton = styled(Paper)(({ theme, answered }) => ({
  padding: theme.spacing(1),
  width: '60px',
  height: '45px',
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

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);

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
      setAnsweredQuestions(prev => new Set([...prev, `${selectedCategory.name}-${currentQuestion.points}`]));
    }
  };

  const isQuestionAnswered = (category, points) => {
    return answeredQuestions.has(`${category.name}-${points}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Slide in={true} direction="down" timeout={1000}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          mb: 3
        }}>
          <img 
            src={brainIcon} 
            alt="Brain Icon" 
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'contain'
            }}
          />
          <Typography variant="h2" component="h1">
            智慧王遊戲
          </Typography>
        </Box>
      </Slide>

      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Grid container spacing={2}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                <CategoryCard color={category.color}>
                  <Box>
                    <Typography variant="h5" component="h2">
                      {category.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      {category.nameEn}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    justifyContent: 'center',
                    mb: 1
                  }}>
                    {pointValues.map((points) => (
                      <PointButton
                        key={points}
                        answered={isQuestionAnswered(category, points)}
                        onClick={() => handlePointClick(category, points)}
                        elevation={2}
                      >
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontSize: '1.3rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {points}
                        </Typography>
                      </PointButton>
                    ))}
                  </Box>
                </CategoryCard>
              </Zoom>
            </Grid>
          ))}
        </Grid>
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