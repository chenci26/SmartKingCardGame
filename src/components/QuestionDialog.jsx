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
  height: '100%',
  marginBottom: theme.spacing(2),
  backgroundColor: isCorrect ? '#4caf50' : theme.palette.background.paper,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: isCorrect ? '#45a049' : theme.palette.background.paper,
  },
  transition: 'all 0.3s ease-in-out',
  fontSize: '2rem',
  fontWeight: 500,
  cursor: 'default',
  '&.Mui-disabled': {
    color: 'white',
    opacity: 1
  },
  padding: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  lineHeight: 1.2,
}));

export default function QuestionDialog({ 
  open, 
  onClose, 
  question, 
  category,
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
          <Typography variant="h4" align="center" gutterBottom sx={{ color: 'white', mb: 3 }}>
            {category.name} - {question.points}分
          </Typography>
          {question?.timeLimit && (
            <Box sx={{ position: 'relative', mb: 2 }}>
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
                sx={{ 
                  position: 'absolute', 
                  right: 0, 
                  top: -30, 
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
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" gutterBottom sx={{ my: 4, color: 'white', textAlign: 'center' }}>
                {question.question}
              </Typography>
              <Grid container spacing={4} sx={{ flexGrow: 1 }}>
                {question.options.map((option, index) => (
                  <Grid item xs={6} key={index} sx={{ display: 'flex' }}>
                    <Fade in={true} timeout={500 + index * 200} style={{ width: '100%' }}>
                      <div style={{ width: '100%', height: '100%' }}>
                        <OptionButton
                          variant="contained"
                          disabled
                          isCorrect={showResult && option === question.correctAnswer}
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
            <Grow in={showResult}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: '#4caf50', mb: 3, fontWeight: 'bold' }}>
                  正確答案：{question.correctAnswer}
                </Typography>
                <Typography variant="h4" sx={{ color: '#fff', mt: 3 }}>
                  {question.explanation}
                </Typography>
              </Box>
            </Grow>
          )}
          {timeUp && !showResult && (
            <Grow in={timeUp}>
              <Typography variant="h3" sx={{ color: '#f44336', fontWeight: 'bold' }}>
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