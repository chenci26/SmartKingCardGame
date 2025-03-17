import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  LinearProgress,
  Grid,
  Fade,
  Grow,
  DialogContentText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Timer from './Timer';

const OptionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isCorrect'
})(({ theme, isCorrect }) => ({
  width: '100%',
  height: '100%',
  marginBottom: theme.spacing(2),
  backgroundColor: isCorrect ? '#4caf50' : theme.palette.background.paper,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: isCorrect ? '#45a049' : theme.palette.background.paper,
    '& .option-text': {
      transform: 'scale(1.5)',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    }
  },
  transition: 'all 0.3s ease-in-out',
  fontSize: '2rem',
  fontWeight: 500,
  pointerEvents: 'auto !important',
  cursor: 'pointer !important',
  '&.Mui-disabled': {
    color: 'white',
    opacity: 1,
    backgroundColor: isCorrect ? '#4caf50' : theme.palette.background.paper,
  },
  padding: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  lineHeight: 1.2,
  overflow: 'hidden',
  '& .option-text': {
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    display: 'block',
    width: '100%'
  }
}));

export default function QuestionDialog({ 
  open, 
  onClose, 
  question, 
  category,
  onAnswerShown
}) {
  const [showResult, setShowResult] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(question?.timeLimit || 0);

  const handleShowAnswer = () => {
    setOpenConfirm(true);
  };

  const handleConfirm = () => {
    setOpenConfirm(false);
    setShowResult(true);
    if (onAnswerShown) {
      onAnswerShown(question.id);
    }
  };

  const handleTick = (currentTime) => {
    setTimeLeft(currentTime);
  };

  const handleTimeUp = () => {
    setTimeUp(true);
  };

  const progressValue = question?.timeLimit ? (timeLeft / question.timeLimit) * 100 : 100;

  return (
    <>
      <Dialog 
        open={open} 
        maxWidth="lg"
        fullWidth
        onClose={() => onClose()}
        PaperProps={{
          sx: {
            background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
            minHeight: '80vh',
            maxHeight: '90vh',
          }
        }}
      >
        <DialogTitle>
          <Typography 
            variant="h4" 
            component="div" 
            align="center" 
            gutterBottom 
            sx={{ color: 'white', mb: 3 }}
          >
            {category.name} - {question.points}分
          </Typography>
          {question?.timeLimit && (
            <Box sx={{ 
              position: 'relative', 
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <Box sx={{ position: 'relative' }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progressValue}
                  sx={{
                    height: 15,
                    borderRadius: 5,
                    backgroundColor: '#ffffff33',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: progressValue > 60 ? '#4caf50' : progressValue > 30 ? '#ff9800' : '#f44336',
                    }
                  }}
                />
                <Typography 
                  variant="h6" 
                  component="div"
                  sx={{ 
                    position: 'absolute',
                    right: 0,
                    top: -30,
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </Typography>
              </Box>
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 1
              }}>
                <Timer 
                  initialTime={question.timeLimit} 
                  onTimeUp={handleTimeUp}
                  onTick={handleTick}
                  isActive={open && !showResult}
                  sx={{
                    '& .timer-display': {
                      display: 'none'
                    },
                    '& .timer-button': {
                      margin: '0 8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '1.2rem'
                    }
                  }}
                />
              </Box>
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          <Grow in={open} timeout={500}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography 
                variant="h4" 
                component="div"
                gutterBottom 
                sx={{ 
                  my: 4, 
                  color: 'white', 
                  textAlign: 'center',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}
              >
                {question.question.replace(/\\n/g, '\n')}
              </Typography>
              <Grid 
                container 
                spacing={4} 
                sx={{ 
                  flexGrow: 1,
                  justifyContent: question.options.length === 1 ? 'center' : 'flex-start'
                }}
              >
                {question.options.map((option, index) => (
                  <Grid 
                    item 
                    xs={question.options.length === 1 ? 6 : 6} 
                    key={index} 
                    sx={{ 
                      display: 'flex',
                      justifyContent: question.options.length === 1 ? 'center' : 'flex-start'
                    }}
                  >
                    <Fade in={true} timeout={500 + index * 200} style={{ width: '100%' }}>
                      <div style={{ width: '100%', height: '100%' }}>
                        <OptionButton
                          variant="contained"
                          disabled={showResult}
                          isCorrect={showResult && option === question.correctAnswer}
                        >
                          <span className="option-text">{option}</span>
                        </OptionButton>
                      </div>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grow>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 4, flexDirection: 'column', gap: 3 }}>
          {!showResult && (
            <Button 
              variant="contained" 
              onClick={handleShowAnswer}
              sx={{ 
                backgroundColor: '#fff',
                color: '#1a237e',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                },
                width: '400px',
                height: '80px',
                fontSize: '2.5rem',
                borderRadius: '15px',
              }}
            >
              顯示答案
            </Button>
          )}
          {showResult && (
            <Grow in={showResult} timeout={800}>
              <Box sx={{ 
                textAlign: 'center', 
                width: '80%', 
                margin: '0 auto'
              }}>
                <Typography 
                  variant="h3" 
                  component="div"
                  sx={{ 
                    color: '#fff', 
                    mb: 3, 
                    fontWeight: 'bold',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    width: '100%',
                    animation: 'bounceInDown 1s ease-out',
                    padding: '30px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.3) 0%, rgba(76, 175, 80, 0.1) 100%)',
                    border: '2px solid #4caf50',
                    boxShadow: '0 0 20px rgba(76, 175, 80, 0.5)',
                    '@keyframes bounceInDown': {
                      '0%': {
                        opacity: 0,
                        transform: 'translateY(-500px)',
                      },
                      '60%': {
                        opacity: 1,
                        transform: 'translateY(30px)',
                      },
                      '80%': {
                        transform: 'translateY(-10px)',
                      },
                      '100%': {
                        transform: 'translateY(0)',
                      }
                    },
                    '&::after': {
                      content: '"✓"',
                      position: 'absolute',
                      top: '-15px',
                      right: '-15px',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#4caf50',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      animation: 'popIn 0.5s ease-out 0.8s both'
                    },
                    '@keyframes popIn': {
                      '0%': {
                        transform: 'scale(0)',
                      },
                      '80%': {
                        transform: 'scale(1.2)',
                      },
                      '100%': {
                        transform: 'scale(1)',
                      }
                    },
                    position: 'relative'
                  }}
                >
                  正確答案：{question.correctAnswer.replace(/\\n/g, '\n')}
                </Typography>
                {question.explanation && (
                  <Typography 
                    variant="h4" 
                    component="div"
                    sx={{ 
                      color: '#fff', 
                      mt: 3,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      width: '100%',
                      opacity: 0,
                      animation: 'slideUp 0.5s ease-out 0.3s forwards',
                      padding: '20px',
                      borderRadius: '15px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      '@keyframes slideUp': {
                        '0%': {
                          opacity: 0,
                          transform: 'translateY(20px)'
                        },
                        '100%': {
                          opacity: 1,
                          transform: 'translateY(0)'
                        }
                      }
                    }}
                  >
                    {question.explanation.replace(/\\n/g, '\n')}
                  </Typography>
                )}
              </Box>
            </Grow>
          )}
          {timeUp && !showResult && (
            <Grow in={timeUp}>
              <Typography 
                variant="h3" 
                component="div"
                sx={{ color: '#f44336', fontWeight: 'bold' }}
              >
                時間到！
              </Typography>
            </Grow>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#1a237e',
            borderRadius: 3,
            minWidth: '600px'
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          color: 'white',
          pt: 4,
          pb: 3,
          fontSize: '2.5rem'
        }}>
          確認顯示答案
        </DialogTitle>
        <DialogContent sx={{ pb: 4 }}>
          <DialogContentText sx={{ 
            color: 'white',
            textAlign: 'center',
            opacity: 0.9,
            fontSize: '2rem'
          }}>
            確定要顯示答案嗎？
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ 
          justifyContent: 'center', 
          pb: 4,
          gap: 4
        }}>
          <Button 
            onClick={() => setOpenConfirm(false)} 
            sx={{ 
              color: '#fff',
              borderColor: '#fff',
              '&:hover': {
                borderColor: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              },
              width: '200px',
              height: '70px',
              fontSize: '1.8rem',
              borderRadius: '12px'
            }}
            variant="outlined"
          >
            取消
          </Button>
          <Button 
            onClick={handleConfirm} 
            sx={{ 
              backgroundColor: '#fff',
              color: '#1a237e',
              '&:hover': {
                backgroundColor: '#f5f5f5'
              },
              width: '200px',
              height: '70px',
              fontSize: '1.8rem',
              borderRadius: '12px'
            }}
            variant="contained"
          >
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 