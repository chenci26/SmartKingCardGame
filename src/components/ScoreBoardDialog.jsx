import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  TextField,
  Grid,
  Popover,
  Fade,
  InputAdornment,
  Divider,
  Tooltip
} from '@mui/material';
import { BarChart } from '@mui/x-charts';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import RemoveIcon from '@mui/icons-material/Remove';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';

// 调整配色方案
const COLORS = {
  primary: '#6a1b9a',         // 深紫色作为主色调
  primaryLight: '#9c4dcc',    // 浅紫色
  primaryDark: '#38006b',     // 暗紫色
  secondary: '#ff6d00',       // 橙色作为强调色
  secondaryLight: '#ff9e40',  // 浅橙色
  secondaryDark: '#c43e00',   // 暗橙色
  background: '#1a1a2e',      // 深蓝黑色背景
  backgroundLight: '#2d2d42', // 稍浅的背景色
  text: '#ffffff',            // 白色文字
  textSecondary: 'rgba(255, 255, 255, 0.7)', // 次要文字
  chartColors: ['#ff6d00', '#9c4dcc', '#00bcd4', '#4caf50', '#f44336', '#ffeb3b', '#2196f3'] // 图表颜色
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '90%',
    height: '90vh',
    maxWidth: '90%',
    maxHeight: '90vh',
    borderRadius: '12px',
    backgroundColor: COLORS.background,
    color: COLORS.text,
    display: 'flex',
    flexDirection: 'column',
  },
  '& .MuiDialogContent-root': {
    paddingTop: `${theme.spacing(3)} !important`,
    overflow: 'auto',
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: COLORS.text,
  fontSize: '1.1rem',
  borderBottom: `1px solid ${COLORS.backgroundLight}`,
  padding: theme.spacing(2),
  '&.MuiTableCell-head': {
    backgroundColor: COLORS.primaryDark,
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: 0,
  },
}));

const ScoreTextField = styled(TextField)(({ theme }) => ({
  width: '120px',
  '& .MuiOutlinedInput-root': {
    color: COLORS.text,
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: COLORS.secondary,
    },
  },
  '& .MuiInputLabel-root': {
    color: COLORS.textSecondary,
  },
  '& .MuiInputAdornment-root .MuiIconButton-root': {
    color: COLORS.text,
  },
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '12px',
  padding: theme.spacing(2),
  height: '100%',
  minHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
}));

const LayoutButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: COLORS.backgroundLight,
  color: COLORS.text,
  borderRadius: '50%',
  width: '48px',
  height: '48px',
  position: 'absolute',
  bottom: '24px',
  right: '24px',
  zIndex: 20,
  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

const ScoreBoardDialog = ({ open, onClose }) => {
  const [teams, setTeams] = useState(() => {
    const savedTeams = localStorage.getItem('scoreboardTeams');
    return savedTeams ? JSON.parse(savedTeams) : [
      { id: 1, name: '第一組', score: 0 },
      { id: 2, name: '第二組', score: 0 },
    ];
  });
  
  const [newTeamName, setNewTeamName] = useState('');
  const [deleteConfirmState, setDeleteConfirmState] = useState({
    open: false,
    teamId: null,
    anchorEl: null
  });
  
  // 添加重置确认状态
  const [resetConfirmState, setResetConfirmState] = useState({
    open: false,
    anchorEl: null
  });
  
  // 为每个队伍添加分数输入状态
  const [scoreInputs, setScoreInputs] = useState({});
  
  // 准备图表数据
  const [chartData, setChartData] = useState({
    xLabels: [],
    series: []
  });
  
  // 布局状态: 0 = 两侧都显示, 1 = 只显示右侧, 2 = 只显示左侧
  const [layoutMode, setLayoutMode] = useState(0);

  useEffect(() => {
    // 初始化每个队伍的分数输入
    const inputs = {};
    teams.forEach(team => {
      inputs[team.id] = '10'; // 默认值
    });
    setScoreInputs(inputs);
    
    // 更新图表数据
    updateChartData();
    
    localStorage.setItem('scoreboardTeams', JSON.stringify(teams));
  }, [teams]);
  
  // 更新图表数据
  const updateChartData = () => {
    // 按分数从高到低排序
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
    
    // 使用完整队伍名称，不再截断
    setChartData({
      xLabels: sortedTeams.map(team => team.name), // 使用完整名称
      series: [
        {
          data: sortedTeams.map(team => team.score),
          label: '分數',
          color: COLORS.secondary,
          valueFormatter: (value) => `${value} 分`,
        }
      ],
      fullNames: sortedTeams.map(team => team.name)
    });
  };

  const handleScoreInputChange = (id, value) => {
    // 确保输入是数字
    if (/^\d*$/.test(value) || value === '') {
      setScoreInputs({
        ...scoreInputs,
        [id]: value
      });
    }
  };

  const handleScoreChange = (id, isAdd) => {
    const amount = parseInt(scoreInputs[id] || '0', 10);
    if (isNaN(amount)) return;
    
    setTeams(teams.map(team => 
      team.id === id 
        ? { ...team, score: Math.max(0, team.score + (isAdd ? amount : -amount)) } 
        : team
    ));
    
    // 更新图表数据
    updateChartData();
  };

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      const newId = teams.length > 0 ? Math.max(...teams.map(t => t.id)) + 1 : 1;
      const newTeam = { id: newId, name: newTeamName.trim(), score: 0 };
      setTeams([...teams, newTeam]);
      setScoreInputs({
        ...scoreInputs,
        [newId]: '10'
      });
      setNewTeamName('');
      
      // 更新图表数据
      updateChartData();
    }
  };

  // 打开删除确认
  const handleDeleteClick = (event, id) => {
    setDeleteConfirmState({
      open: true,
      teamId: id,
      anchorEl: event.currentTarget
    });
  };

  // 关闭删除确认
  const handleDeleteCancel = () => {
    setDeleteConfirmState({
      open: false,
      teamId: null,
      anchorEl: null
    });
  };

  // 确认删除
  const handleDeleteConfirm = () => {
    if (deleteConfirmState.teamId) {
      setTeams(teams.filter(team => team.id !== deleteConfirmState.teamId));
      // 删除对应的分数输入
      const newScoreInputs = { ...scoreInputs };
      delete newScoreInputs[deleteConfirmState.teamId];
      setScoreInputs(newScoreInputs);
      
      // 更新图表数据
      updateChartData();
    }
    handleDeleteCancel();
  };

  // 打开重置确认
  const handleResetClick = (event) => {
    setResetConfirmState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  // 关闭重置确认
  const handleResetCancel = () => {
    setResetConfirmState({
      open: false,
      anchorEl: null
    });
  };

  // 确认重置
  const handleResetConfirm = () => {
    setTeams([]);
    setScoreInputs({});
    localStorage.removeItem('scoreboardTeams');
    
    // 更新图表数据
    setChartData({
      xLabels: [],
      series: []
    });
    
    handleResetCancel();
  };
  
  // 切换布局模式
  const toggleLayout = () => {
    // 循环切换三种状态: 0 -> 1 -> 2 -> 0
    setLayoutMode((prevMode) => (prevMode + 1) % 3);
  };
  
  // 根据当前布局模式获取提示文本
  const getLayoutTooltip = () => {
    switch(layoutMode) {
      case 0: return "點擊隱藏左側面板";
      case 1: return "點擊隱藏右側面板";
      case 2: return "點擊顯示兩側面板";
      default: return "切換布局";
    }
  };
  
  // 根据当前布局模式获取图标
  const getLayoutIcon = () => {
    switch(layoutMode) {
      case 0: return <ChevronLeftIcon />;
      case 1: return <ChevronRightIcon />;
      case 2: return <ViewWeekIcon />;
      default: return <ViewWeekIcon />;
    }
  };

  // 根据布局模式计算左右面板的宽度和显示状态
  const showLeftPanel = layoutMode !== 1;
  const showRightPanel = layoutMode !== 2;
  
  const leftPanelWidth = showLeftPanel 
    ? (showRightPanel ? '50%' : '100%') 
    : '0';
  
  const rightPanelWidth = showRightPanel 
    ? (showLeftPanel ? '50%' : '100%') 
    : '0';

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="scoreboard-dialog-title"
      maxWidth={false}
      fullWidth
    >
      <DialogTitle id="scoreboard-dialog-title" sx={{ 
        backgroundColor: COLORS.primary, 
        color: COLORS.text,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        flexShrink: 0,
      }}>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          計分板
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ 
        padding: 3, 
        paddingTop: '24px !important',
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        minHeight: '80vh',
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexGrow: 1,
          position: 'relative',
          mb: 8,
        }}>
          {/* 左侧面板 - 队伍管理 */}
          <Box 
            sx={{ 
              width: leftPanelWidth,
              display: showLeftPanel ? 'block' : 'none',
              position: 'relative',
              transition: 'all 0.3s ease',
              pr: showRightPanel ? 2 : 0
            }}
          >
            {/* 左侧内容 */}
            <Box sx={{ 
              height: '100%',
              overflow: 'auto'
            }}>
              <Box sx={{ mb: 4 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="新增隊伍"
                      variant="outlined"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      InputProps={{
                        style: { color: COLORS.text }
                      }}
                      InputLabelProps={{
                        style: { color: COLORS.textSecondary }
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: COLORS.secondary,
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button 
                      variant="contained" 
                      startIcon={<AddIcon />}
                      onClick={handleAddTeam}
                      sx={{ 
                        backgroundColor: COLORS.secondary,
                        '&:hover': {
                          backgroundColor: COLORS.secondaryDark,
                        },
                        height: '56px'
                      }}
                    >
                      新增隊伍
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                    <Button 
                      variant="outlined" 
                      onClick={handleResetClick}
                      sx={{ 
                        borderColor: COLORS.secondary,
                        color: COLORS.secondary,
                        '&:hover': {
                          borderColor: COLORS.secondaryLight,
                          backgroundColor: 'rgba(255, 109, 0, 0.1)',
                        },
                        height: '56px'
                      }}
                    >
                      重置所有數據
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              {/* 队伍表格 */}
              <TableContainer component={Paper} sx={{ 
                backgroundColor: COLORS.background, 
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                mb: 4
              }}>
                <Table sx={{ minWidth: 450 }} aria-label="scoreboard table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>隊伍名稱</StyledTableCell>
                      <StyledTableCell align="center">分數</StyledTableCell>
                      <StyledTableCell align="center">操作</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teams.map((team) => (
                      <StyledTableRow key={team.id}>
                        <StyledTableCell component="th" scope="row">
                          <Typography variant="h6">{team.name}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography variant="h4" sx={{ fontWeight: 'bold', color: COLORS.secondary }}>
                            {team.score}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, alignItems: 'center' }}>
                            <IconButton 
                              onClick={() => handleScoreChange(team.id, false)}
                              sx={{ 
                                backgroundColor: COLORS.primaryDark,
                                color: COLORS.text,
                                '&:hover': {
                                  backgroundColor: '#2c004d',
                                }
                              }}
                            >
                              <RemoveIcon />
                            </IconButton>
                            
                            <ScoreTextField
                              variant="outlined"
                              value={scoreInputs[team.id] || ''}
                              onChange={(e) => handleScoreInputChange(team.id, e.target.value)}
                              size="small"
                              inputProps={{ 
                                style: { textAlign: 'center' },
                                min: 0
                              }}
                            />
                            
                            <IconButton 
                              onClick={() => handleScoreChange(team.id, true)}
                              sx={{ 
                                backgroundColor: COLORS.primary,
                                color: COLORS.text,
                                '&:hover': {
                                  backgroundColor: COLORS.primaryLight,
                                }
                              }}
                            >
                              <AddIcon />
                            </IconButton>
                            
                            <IconButton 
                              color="error" 
                              onClick={(e) => handleDeleteClick(e, team.id)}
                              sx={{ 
                                color: COLORS.secondary,
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 109, 0, 0.1)',
                                }
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          
          {/* 右侧面板 - 统计图表 */}
          <Box 
            sx={{ 
              width: rightPanelWidth,
              display: showRightPanel ? 'block' : 'none',
              position: 'relative',
              transition: 'all 0.3s ease',
              pl: showLeftPanel ? 2 : 0
            }}
          >
            {/* 右侧内容 */}
            <Box sx={{ 
              height: '100%'
            }}>
              <ChartContainer>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: COLORS.text }}>
                  隊伍分數統計
                </Typography>
                
                {teams.length > 0 ? (
                  <BarChart
                    xAxis={[{ 
                      scaleType: 'band', 
                      data: chartData.xLabels,
                      tickLabelStyle: {
                        fill: COLORS.text,
                        fontSize: 14
                      }
                    }]}
                    yAxis={[{ 
                      tickLabelStyle: {
                        fill: COLORS.text
                      }
                    }]}
                    series={chartData.series}
                    height={500} // 增加图表高度
                    margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                    // 添加图例配置，放在右上角
                    legend={{ 
                      position: { vertical: 'top', horizontal: 'right' },
                      padding: 8,
                      itemMarkWidth: 10,
                      itemMarkHeight: 10,
                      markGap: 5,
                      labelStyle: {
                        fill: COLORS.text,
                        fontSize: 14
                      }
                    }}
                    sx={{
                      '.MuiChartsAxis-tickLabel': {
                        fill: COLORS.text,
                      },
                      '.MuiChartsAxis-line': {
                        stroke: COLORS.textSecondary,
                      },
                      '.MuiChartsAxis-tick': {
                        stroke: COLORS.textSecondary,
                      },
                      '.MuiChartsLegend-label': {
                        fill: COLORS.text,
                      },
                      '.MuiChartsLegend-mark': {
                        rx: 10,
                      },
                    }}
                  />
                ) : (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '500px',
                    color: COLORS.textSecondary
                  }}>
                    <Typography variant="h6">
                      尚無隊伍數據
                    </Typography>
                  </Box>
                )}
              </ChartContainer>
            </Box>
          </Box>
        </Box>
        
        {/* 布局切换按钮 - 放在对话框右下角 */}
        <Tooltip title={getLayoutTooltip()}>
          <LayoutButton onClick={toggleLayout}>
            {getLayoutIcon()}
          </LayoutButton>
        </Tooltip>
      </DialogContent>

      {/* 删除确认弹出框 */}
      <Popover
        open={deleteConfirmState.open}
        anchorEl={deleteConfirmState.anchorEl}
        onClose={handleDeleteCancel}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={Fade}
      >
        <Box sx={{ 
          p: 2, 
          backgroundColor: COLORS.backgroundLight, 
          color: COLORS.text,
          width: 220,
          borderRadius: 1,
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 'medium' }}>
            確定要刪除此隊伍嗎？
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="contained" 
              startIcon={<CheckIcon />}
              onClick={handleDeleteConfirm}
              sx={{ 
                backgroundColor: COLORS.secondary,
                '&:hover': {
                  backgroundColor: COLORS.secondaryDark,
                }
              }}
            >
              確定
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<CancelIcon />}
              onClick={handleDeleteCancel}
              sx={{ 
                borderColor: COLORS.textSecondary,
                color: COLORS.textSecondary,
                '&:hover': {
                  borderColor: COLORS.text,
                  color: COLORS.text,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              取消
            </Button>
          </Box>
        </Box>
      </Popover>

      {/* 重置确认弹出框 */}
      <Popover
        open={resetConfirmState.open}
        anchorEl={resetConfirmState.anchorEl}
        onClose={handleResetCancel}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={Fade}
      >
        <Box sx={{ 
          p: 2, 
          backgroundColor: COLORS.backgroundLight, 
          color: COLORS.text,
          width: 280,
          borderRadius: 1,
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
            <WarningIcon sx={{ color: COLORS.secondary }} />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              警告
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 2 }}>
            確定要清空所有隊伍數據嗎？此操作不可恢復。
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="contained" 
              startIcon={<CheckIcon />}
              onClick={handleResetConfirm}
              sx={{ 
                backgroundColor: COLORS.secondary,
                '&:hover': {
                  backgroundColor: COLORS.secondaryDark,
                }
              }}
            >
              確定清空
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<CancelIcon />}
              onClick={handleResetCancel}
              sx={{ 
                borderColor: COLORS.textSecondary,
                color: COLORS.textSecondary,
                '&:hover': {
                  borderColor: COLORS.text,
                  color: COLORS.text,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              取消
            </Button>
          </Box>
        </Box>
      </Popover>
    </StyledDialog>
  );
};

export default ScoreBoardDialog; 