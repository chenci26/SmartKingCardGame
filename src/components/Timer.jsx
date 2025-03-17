import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

const Timer = ({ initialTime, onTimeUp, onTick, isActive = false, sx = {} }) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    setTime(initialTime);
    setIsRunning(false);
  }, [initialTime]);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime <= 1 ? 0 : prevTime - 1;
          if (onTick) onTick(newTime);
          if (newTime === 0) {
            setIsRunning(false);
            if (onTimeUp) onTimeUp();
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, time, onTimeUp, onTick]);

  useEffect(() => {
    if (!isActive) {
      setIsRunning(false);
    }
  }, [isActive]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(initialTime);
    if (onTick) onTick(initialTime);
  };

  return (
    <Box className="timer-container" sx={sx}>
      <div className="timer-display">
        {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
      </div>
      <div className="timer-controls">
        <Button 
          onClick={startTimer} 
          disabled={isRunning || !isActive}
          className="timer-button"
          variant="contained"
          color="success"
        >
          開始
        </Button>
        <Button 
          onClick={pauseTimer}
          disabled={!isRunning || !isActive}
          className="timer-button"
          variant="contained"
          color="warning"
        >
          暫停
        </Button>
        <Button 
          onClick={resetTimer}
          disabled={!isActive}
          className="timer-button"
          variant="contained"
          color="error"
        >
          重設
        </Button>
      </div>
    </Box>
  );
};

export default Timer; 