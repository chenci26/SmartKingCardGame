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

const OptionButton = styled(Button)(({ theme, isCorrect }) => ({
  width: '100%',
  marginBottom: theme.spacing(1),
  backgroundColor: isCorrect ? '#4caf50' : theme.palette.background.paper,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: isCorrect ? '#45a049' : theme.palette.background.paper,
  },
  transition: 'all 0.3s ease-in-out',
  fontSize: '1.1rem',
  fontWeight: 500,
  cursor: 'default',
  '&.Mui-disabled': {
    color: 'white',
    opacity: 1
  }
}));

export default function QuestionDialog({ 
  open, 
  onClose, 
  question, 
  category,
  onScore,
  onAnswerShown
}) {
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(question?.timeLimit || 0);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    let timer;
    if (open && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResult && !timeUp && question?.timeLimit) {
      handleTimeUp();
    }
    return () => timer && clearInterval(timer);
  }, [open, timeLeft, question?.timeLimit]);

  useEffect(() => {
    if (open) {
      setTimeLeft(question?.timeLimit || 0);
      setShowResult(false);
      setTimeUp(false);
    }
  }, [open, question]);

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

  const handleTimeUp = () => {
    setTimeUp(true);
  };

  const progressValue = question?.timeLimit ? (timeLeft / question.timeLimit) * 100 : 100;

  return (
    <>
      <Dialog 
        open={open} 
        maxWidth="sm" 
        fullWidth
        onClose={() => onClose()}
        PaperProps={{
          sx: {
            background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h5" align="center" gutterBottom sx={{ color: 'white' }}>
            {category.name} - {question.points}分
          </Typography>
          {question?.timeLimit && (
            <Box sx={{ position: 'relative' }}>
              <LinearProgress 
                variant="determinate" 
                value={progressValue}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#ffffff33',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: progressValue > 60 ? '#4caf50' : progressValue > 30 ? '#ff9800' : '#f44336',
                  }
                }}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  position: 'absolute', 
                  right: 0, 
                  top: -20, 
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                {timeLeft}秒
              </Typography>
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          <Grow in={open} timeout={500}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ my: 2, color: 'white' }}>
                {question.question}
              </Typography>
              <Grid container spacing={2}>
                {question.options.map((option, index) => (
                  <Grid item xs={12} key={index}>
                    <Fade in={true} timeout={500 + index * 200}>
                      <div>
                        <OptionButton
                          variant="contained"
                          disabled
                          isCorrect={showResult && index === question.correctAnswer}
                        >
                          {option}
                        </OptionButton>
                      </div>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grow>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2, flexDirection: 'column', gap: 2 }}>
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
                width: '200px'
              }}
            >
              顯示答案
            </Button>
          )}
          {showResult && (
            <Grow in={showResult}>
              <Typography variant="h6" sx={{ color: '#4caf50' }}>
                正確答案：{question.options[question.correctAnswer]}
              </Typography>
            </Grow>
          )}
          {timeUp && !showResult && (
            <Grow in={timeUp}>
              <Typography variant="h6" sx={{ color: '#f44336' }}>
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
            minWidth: '300px'
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          color: 'white',
          pt: 3,
          pb: 2
        }}>
          確認顯示答案
        </DialogTitle>
        <DialogContent sx={{ pb: 3 }}>
          <DialogContentText sx={{ 
            color: 'white',
            textAlign: 'center',
            opacity: 0.9,
            fontSize: '1.1rem'
          }}>
            確定要顯示答案嗎？
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ 
          justifyContent: 'center', 
          pb: 3,
          gap: 2 
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
              width: '100px'
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
              width: '100px'
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