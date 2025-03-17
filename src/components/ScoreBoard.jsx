import React from 'react';
import { Button, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import ScoreIcon from '@mui/icons-material/Scoreboard';

// 调整配色方案
const COLORS = {
  primary: '#6a1b9a',         // 深紫色作为主色调
  primaryLight: '#9c4dcc',    // 浅紫色
  primaryDark: '#38006b',     // 暗紫色
  secondary: '#ff6d00',       // 橙色作为强调色
  secondaryLight: '#ff9e40',  // 浅橙色
  secondaryDark: '#c43e00',   // 暗橙色
};

const ScoreBoardButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  padding: '8px 16px',
  backgroundColor: COLORS.secondary,
  color: 'white',
  fontWeight: 'bold',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: COLORS.secondaryDark,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
  },
  '& .MuiSvgIcon-root': {
    marginRight: '8px',
    fontSize: '1.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '6px 12px',
    '& .MuiSvgIcon-root': {
      fontSize: '1.3rem',
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: COLORS.textSecondary,
  },
}));

const ScoreBoard = ({ onClick, teamCount = 0 }) => {
  return (
    <StyledBadge badgeContent={teamCount} color="secondary">
      <ScoreBoardButton
        variant="contained"
        startIcon={<ScoreIcon />}
        onClick={onClick}
      >
        計分板
      </ScoreBoardButton>
    </StyledBadge>
  );
};

export default ScoreBoard; 