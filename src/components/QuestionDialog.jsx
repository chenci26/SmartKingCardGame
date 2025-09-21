import React, {
  useState, useEffect, useRef,
  forwardRef, useImperativeHandle, createRef, useMemo, useCallback
} from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
  Button, Typography, Box, LinearProgress, Grid, Grow,
  ButtonBase, Paper, IconButton, Stack, Tooltip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import Timer from "./Timer";

/* --------------------- 可選：舊 OptionButton（目前未使用，保留給相容） --------------------- */
const OptionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isCorrect",
})(({ theme, isCorrect }) => ({
  width: "100%",
  height: "100%",
  marginBottom: theme.spacing(2),
  backgroundColor: isCorrect ? "#4caf50" : theme.palette.background.paper,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: isCorrect ? "#45a049" : theme.palette.background.paper,
    "& .option-text": {
      transform: "scale(1.5)",
      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    },
  },
  transition: "all 0.3s ease-in-out",
  fontSize: "2rem",
  fontWeight: 500,
  pointerEvents: "auto !important",
  cursor: "pointer !important",
  "&.Mui-disabled": {
    color: "white",
    opacity: 1,
    backgroundColor: isCorrect ? "#4caf50" : theme.palette.background.paper,
  },
  padding: "25px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  lineHeight: 1.2,
  overflow: "hidden",
  "& .option-text": {
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    display: "block",
    width: "100%",
  },
}));

/* --------------------- 工具：路徑標準化（支援 base href 與中文/空白） --------------------- */
const assetSrc = (p) => {
  if (!p) return p;
  const s = String(p);
  if (/^(https?:)?\/\//i.test(s) || s.startsWith("data:")) return s;
  const [pathOnly, query = ""] = s.split("?");
  const encoded = encodeURI(pathOnly);
  let base = "/";
  if (typeof document !== "undefined") {
    const baseEl = document.querySelector("base[href]");
    base = baseEl?.getAttribute("href") || document.baseURI || "/";
  }
  const baseNorm = base.endsWith("/") ? base : base + "/";
  const rel = encoded.startsWith("/") ? encoded.slice(1) : encoded;
  return baseNorm + rel + (query ? `?${query}` : "");
};

/* --------------------- 題庫標籤/正規化 --------------------- */
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
function normalizeOptions(options = [], { enableAutoLabel = true } = {}) {
  return options.map((opt, idx) => {
    const hasExplicitLabel =
      typeof opt === "object" &&
      opt !== null &&
      Object.prototype.hasOwnProperty.call(opt, "label");

    if (typeof opt === "string") {
      return {
        value: opt,
        text: opt,
        image: undefined,
        label: enableAutoLabel ? LETTERS[idx] || String(idx + 1) : undefined,
        explicitLabel: false,
        audio: undefined,
      };
    }
    return {
      value: opt.value ?? opt.text ?? `opt-${idx}`,
      text: opt.text ?? "",
      image: opt.image,
      label: hasExplicitLabel
        ? opt.label
        : enableAutoLabel
        ? LETTERS[idx] || String(idx + 1)
        : undefined,
      explicitLabel: hasExplicitLabel,
      audio: opt.audio, // { type: 'file'|'youtube', src|id, start?, end? }
      // 可選擴充：video: { src, type } 用 <video> 取代 GIF
      video: opt.video,
    };
  });
}

/* --------------------- 本地音檔播放器（命令式控制） --------------------- */
const FileAudioPlayer = forwardRef(({ src, onEnd }, ref) => {
  const elRef = useRef(null);
  useImperativeHandle(
    ref,
    () => ({
      play: () => elRef.current?.play().catch(() => {}),
      pause: () => elRef.current?.pause(),
      stop: () => {
        if (!elRef.current) return;
        elRef.current.pause();
        elRef.current.currentTime = 0;
      },
    }),
    []
  );
  return (
    <audio
      ref={elRef}
      src={src}
      preload="none" /* 點擊才解碼，省資源 */
      onEnded={onEnd}
      style={{ display: "none" }}
    />
  );
});

/* --------------------- YouTube IFrame API：單例載入 + 單一隱形播放器 --------------------- */
let __ytPromise = null;
let __ytPlayer = null;
let __ytReady = false;
let __ytCurrent = { videoId: null, start: 0, end: undefined };

function loadYouTubeIframeAPI() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (__ytPromise) return __ytPromise;

  __ytPromise = new Promise((resolve) => {
    const existing = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    if (!existing) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev && prev();
      resolve(window.YT);
    };
    if (window.YT && window.YT.Player) resolve(window.YT);
  });
  return __ytPromise;
}

function ensureYouTubeSingleton(origin) {
  return loadYouTubeIframeAPI().then((YT) => {
    if (!YT) return null;
    if (__ytPlayer) return __ytPlayer;

    // 建立隱形容器
    const containerId = "yt-audio-singleton";
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      Object.assign(container.style, {
        width: "1px",
        height: "1px",
        opacity: "0.01",
        pointerEvents: "none",
        position: "absolute",
        left: "-9999px",
        top: "0",
      });
      document.body.appendChild(container);
    }

    __ytPlayer = new YT.Player(containerId, {
      height: "1",
      width: "1",
      videoId: "",
      playerVars: {
        origin: origin || (typeof location !== "undefined" ? location.origin : undefined),
        controls: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onReady: () => {
          __ytReady = true;
        },
      },
    });

    return __ytPlayer;
  });
}

function ytPlayClip({ videoId, start = 0, end }) {
  if (!__ytPlayer || !__ytReady) {
    return ensureYouTubeSingleton().then(() => ytPlayClip({ videoId, start, end }));
  }
  __ytCurrent = { videoId, start, end };
  __ytPlayer.loadVideoById({
    videoId,
    startSeconds: start || 0,
    endSeconds: typeof end === "number" ? end : undefined,
  });
  __ytPlayer.playVideo();
}
function ytPauseClip() {
  try {
    __ytPlayer?.pauseVideo?.();
  } catch {}
}
function ytStopClip() {
  try {
    __ytPlayer?.pauseVideo?.();
    const s = __ytCurrent?.start ?? 0;
    __ytPlayer?.seekTo?.(s, true);
  } catch {}
}

/* --------------------- 選項網格（圖片/GIF/音訊；單一選項大卡片） --------------------- */
function OptionGrid({ options = [], onSelect, active, showResult, correctAnswer, allowPlayAfterResult = true, optionFontSize = "1.75rem", singleOptionFontSize = "2.5rem"}) {
  const normalized = useMemo(
    () =>
      normalizeOptions(options, {
        enableAutoLabel: (options?.length || 0) > 1,
      }),
    [options]
  );

  const [playingKey, setPlayingKey] = useState(null);
  const [playingType, setPlayingType] = useState(null); // 'file' | 'youtube'
  const playingKeyRef = useRef(null);
  const ytEndTimerRef = useRef(null);
  useEffect(() => {
    playingKeyRef.current = playingKey;
  }, [playingKey]);

  // 本地 audio 的 ref map
  const playerRefs = useRef({});
  const ensureRef = useCallback((key) => {
    if (!playerRefs.current[key]) playerRefs.current[key] = createRef();
    return playerRefs.current[key];
  }, []);

  // 預先建立 YouTube 單例播放器（避免第一次點擊還沒 ready）
  useEffect(() => {
    ensureYouTubeSingleton();
    return () => {
      clearTimeout(ytEndTimerRef.current);
      ytStopClip();
    };
  }, []);

  const stopAny = useCallback(() => {
    clearTimeout(ytEndTimerRef.current);
    if (playingType === "file") {
      const k = playingKeyRef.current;
      if (k && playerRefs.current[k]?.current) playerRefs.current[k].current.stop();
    } else if (playingType === "youtube") {
      ytStopClip();
    }
    setPlayingKey(null);
    setPlayingType(null);
  }, [playingType]);

  // 關閉/顯示答案 → 停止目前播放
  //useEffect(() => {
  //  if (!active || showResult) stopAny();
  //}, [active, showResult, stopAny]);

  // 顯示答案的瞬間仍先把正在播的停掉（體驗較乾淨）
  useEffect(() => { if (showResult && !allowPlayAfterResult) {stopAny();}}, [showResult, allowPlayAfterResult, stopAny]);
  // 對話框關閉/失效時一律停播
  useEffect(() => { if (!active)   stopAny(); }, [active]);

  const startPlay = useCallback(
    (key, opt) => {
      //if (!active || showResult) return;
      if (!active) return;
      if (showResult && !allowPlayAfterResult) return;

      // 先停掉前一條
      if (playingKeyRef.current && playingKeyRef.current !== key) stopAny();

      if (opt.audio?.type === "file") {
        ensureRef(key);
        playerRefs.current[key]?.current?.play(); // 直接在點擊事件中呼叫
        setPlayingKey(key);
        setPlayingType("file");
      } else if (opt.audio?.type === "youtube") {
        const s = Number(opt.audio.start || 0);
        const e =
          opt.audio.end != null && opt.audio.end !== ""
            ? Number(opt.audio.end)
            : undefined;

        ytPlayClip({ videoId: opt.audio.id, start: s, end: e }); // 直接在點擊事件中呼叫
        clearTimeout(ytEndTimerRef.current);
        if (typeof e === "number" && e > s) {
          ytEndTimerRef.current = setTimeout(() => {
            ytStopClip();
            setPlayingKey(null);
            setPlayingType(null);
          }, Math.max(0, (e - s) * 1000));
        }
        setPlayingKey(key);
        setPlayingType("youtube");
      }
    },
    [active, showResult, stopAny, ensureRef]
  );

  const pauseCurrent = useCallback(
    (key) => {
      if (playingType === "file") {
        playerRefs.current[key]?.current?.pause();
      } else if (playingType === "youtube") {
        ytPauseClip();
      }
      setPlayingKey(null);
    },
    [playingType]
  );

  const stopCurrent = useCallback(() => {
    stopAny();
  }, [stopAny]);

  /* -- 圖片/GIF/（可選）video 呈現共用函式 -- */
  const renderMedia = (opt, { height, radius }) => {
    if (opt.video?.src) {
      const src = assetSrc(opt.video.src);
      return (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height,
            objectFit: "contain",
            borderRadius: radius,
            background: "var(--mui-palette-background-default)",
            marginBottom: 8,
          }}
        />
      );
    }

    if (!opt.image) return null;
    const isGif = typeof opt.image === "string" && /\.gif(\?.*)?$/i.test(opt.image);
    const src = assetSrc(opt.image);
    const commonStyle = {
      width: "100%",
      height,
      objectFit: "contain",
      borderRadius: radius,
      background: "var(--mui-palette-background-default)",
      marginBottom: 8,
    };
    const onErr = (e) => {
      console.warn("[OptionGrid] 圖片載入失敗：", e.currentTarget.src);
      e.currentTarget.style.display = "none";
    };
    return isGif ? (
      <img
        src={src}
        alt={opt.text || `選項 ${opt.label || ""}`}
        style={commonStyle}
        loading="eager"
        decoding="async"
        onError={onErr}
      />
    ) : (
      <Box
        component="img"
        src={src}
        alt={opt.text || `選項 ${opt.label || ""}`}
        sx={commonStyle}
        onError={onErr}
      />
    );
  };

  const isSingle = normalized.length === 1;

  // ----- 單一選項大卡片 -----
  if (isSingle) {
    const opt = normalized[0];
    const key = String(opt.value ?? 0);
    const isCorrect = showResult && String(opt.value) === String(correctAnswer);
    const isPlaying = playingKey === key;

    return (
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 1 }}>
        <Paper
          elevation={4}
          sx={{
            width: { xs: "100%", sm: "85%", md: "75%" },
            p: 3,
            borderRadius: 3,
            textAlign: "center",
            border: isCorrect ? "3px solid #4caf50" : "3px solid transparent",
            transition: "transform 120ms",
            "&:hover": { transform: showResult ? "none" : "translateY(-3px)" },
          }}
        >
          <ButtonBase
            onClick={() => !showResult && onSelect?.(opt.value)}
            disabled={showResult}
            focusRipple
            sx={{ width: "100%", borderRadius: 3, overflow: "hidden" }}
          >
            <Box sx={{ width: "100%", p: 2 }}>
              {renderMedia(opt, { height: 320, radius: 8 })}
              {/* 若未明確指定 label，單選僅顯示文字，不顯示 A */}
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: singleOptionFontSize 
                }}>
                {opt.explicitLabel
                  ? ["(" + opt.label + ")", opt.text].filter(Boolean).join("．")
                  : opt.text || opt.label || ""}
              </Typography>
            </Box>
          </ButtonBase>

          {opt.audio && (
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
              {!isPlaying ? (
                <Tooltip title="播放">
                  <IconButton onClick={() => startPlay(key, opt)} size="large">
                    <PlayArrowRoundedIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="暫停">
                  <IconButton onClick={() => pauseCurrent(key)} size="large">
                    <PauseRoundedIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="停止">
                <IconButton onClick={stopCurrent} size="large">
                  <StopRoundedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>

              {opt.audio.type === "file" && (
                <FileAudioPlayer
                  ref={ensureRef(key)}
                  src={opt.audio.src}
                  onEnd={() => setPlayingKey(null)}
                />
              )}
              {/* YouTube 使用全域單例，不需要在這裡掛子元件 */}
            </Stack>
          )}
        </Paper>
      </Box>
    );
  }

  // ----- 多選：兩欄卡片 -----
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {normalized.map((opt, i) => {
        const key = String(opt.value ?? i);
        const isCorrect = showResult && String(opt.value) === String(correctAnswer);
        const isPlaying = playingKey === key;

        return (
          <Grid item xs={12} sm={6} md={6} key={key}>
            <Paper
              elevation={3}
              sx={{
                p: 1.5,
                width: "100%",
                textAlign: "center",
                borderRadius: 2,
                transition: "transform 120ms",
                "&:hover": { transform: showResult ? "none" : "translateY(-2px)" },
                border: isCorrect ? "2px solid #4caf50" : "2px solid transparent",
              }}
            >
              <ButtonBase
                onClick={() => !showResult && onSelect?.(opt.value)}
                focusRipple
                disabled={showResult}
                sx={{ width: "100%", borderRadius: 2, overflow: "hidden" }}
              >
                <Box sx={{ width: "100%", textAlign: "center", p: 1 }}>
                  {renderMedia(opt, { height: 160, radius: 4 })}
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: optionFontSize,
                      lineHeight: 1.1, 
                      }}>
                    {[opt.label, opt.text].filter(Boolean).join("．")}
                  </Typography>
                </Box>
              </ButtonBase>

              {opt.audio && (
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1, justifyContent: "center" }}>
                  {!isPlaying ? (
                    <Tooltip title="播放">
                      <IconButton onClick={() => startPlay(key, opt)}>
                        <PlayArrowRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="暫停">
                      <IconButton onClick={() => pauseCurrent(key)}>
                        <PauseRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="停止">
                    <IconButton onClick={stopCurrent}>
                      <StopRoundedIcon />
                    </IconButton>
                  </Tooltip>

                  {opt.audio.type === "file" && (
                    <FileAudioPlayer
                      ref={ensureRef(key)}
                      src={opt.audio.src}
                      onEnd={() => setPlayingKey(null)}
                    />
                  )}
                  {/* YouTube 使用全域單例，不需要在這裡掛子元件 */}
                </Stack>
              )}
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}

/* --------------------- 主對話框 --------------------- */
export default function QuestionDialog({
  open,
  onClose,
  question,
  category,
  onAnswerShown,
}) {
  const [showResult, setShowResult] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(question?.timeLimit || 0);

  // 題目層（非選項）YouTube 播放器
  const playerRef = useRef(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setShowResult(false);
    setShowPlayer(false);
    setPlayerReady(false);
    // 清除舊的 YouTube Player（如果有）
    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch {}
      playerRef.current = null;
    }
  }, [question]);

  useEffect(() => {
    if (!showPlayer || playerReady || !question?.youtube) return;

    function getYoutubeID(url) {
      const regExp = /^.*(youtu.be\/|v=)([^#&?]*).*/;
      const match = url?.match?.(regExp);
      return match && match[2]?.length === 11 ? match[2] : null;
    }

    function createPlayer() {
      const id = getYoutubeID(question.youtube);
      if (!id) return;
      playerRef.current = new window.YT.Player("youtube-audio", {
        height: "1",
        width: "1",
        videoId: id,
        events: {
          onReady: () => setPlayerReady(true),
        },
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          playsinline: 1,
        },
      });
    }

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else if (window.YT && window.YT.Player) {
      createPlayer();
    }
  }, [showPlayer, playerReady, question]);

  const handleShowAnswer = () => setOpenConfirm(true);
  const handleConfirm = () => {
    setOpenConfirm(false);
    setShowResult(true);
    if (onAnswerShown) onAnswerShown(question.id);
    // 顯示答案時也停掉題目層播放器
    try { playerRef.current?.pauseVideo?.(); } catch {}
  };

  const handleTick = (currentTime) => setTimeLeft(currentTime);
  const handleTimeUp = () => setTimeUp(true);
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
            background: "linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)",
            minHeight: "80vh",
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle>
          <Typography
            variant="h4"
            component="div"
            align="center"
            gutterBottom
            sx={{ color: "white", mb: 3 }}
          >
            {category.name} - {question.points}分
          </Typography>

          {question?.timeLimit && (
            <Box sx={{ position: "relative", mb: 2, display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ position: "relative" }}>
                <LinearProgress
                  variant="determinate"
                  value={progressValue}
                  sx={{
                    height: 15,
                    borderRadius: 5,
                    backgroundColor: "#ffffff33",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor:
                        progressValue > 60 ? "#4caf50" : progressValue > 30 ? "#ff9800" : "#f44336",
                    },
                  }}
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: -30,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
                <Timer
                  initialTime={question.timeLimit}
                  onTimeUp={handleTimeUp}
                  onTick={handleTick}
                  active={open}
                  sx={{
                    "& .timer-display": { display: "none" },
                    "& .timer-button": {
                      margin: "0 8px",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontSize: "1.2rem",
                    },
                  }}
                />
              </Box>
            </Box>
          )}
        </DialogTitle>

        <DialogContent>
          <Grow in={open} timeout={500}>
            <Box
              sx={{
                minHeight: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {/* 題目圖片 */}
              {question.questionImage && (
                <Box sx={{ textAlign: "center", my: 2 }}>
                  <img
                    src={question.questionImage}
                    alt="題目圖片"
                    style={{ maxWidth: "100%", borderRadius: "10px" }}
                  />
                </Box>
              )}

              {/* 題目層 YouTube 音訊 */}
              {question?.youtube && !showResult && (
                <Box sx={{ my: 2, textAlign: "center" }}>
                  {!showPlayer ? (
                    <Button
                      variant="contained"
                      onClick={() => setShowPlayer(true)}
                      sx={{
                        backgroundColor: "#ff5722",
                        color: "#fff",
                        fontSize: "1.2rem",
                        padding: "10px 24px",
                        borderRadius: "10px",
                        "&:hover": { backgroundColor: "#e64a19" },
                      }}
                    >
                      ▶ 播放音訊
                    </Button>
                  ) : (
                    <>
                      <div
                        id="youtube-audio"
                        style={{
                          width: 1,
                          height: 1,
                          opacity: 0.01,
                          pointerEvents: "none",
                          position: "absolute",
                        }}
                      />
                      <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
                        <Button
                          variant="outlined"
                          disabled={!playerReady}
                          onClick={() => playerRef.current?.playVideo()}
                        >
                          ▶ 播放
                        </Button>
                        <Button
                          variant="outlined"
                          disabled={!playerReady}
                          onClick={() => playerRef.current?.pauseVideo()}
                        >
                          ⏸ 暫停
                        </Button>
                        <Button
                          variant="outlined"
                          disabled={!playerReady}
                          onClick={() => {
                            try { playerRef.current?.seekTo(0); } catch {}
                            playerRef.current?.playVideo();
                          }}
                        >
                          🔁 重播
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              )}

              {/* 題目文字 */}
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                sx={{
                  my: 4,
                  color: "white",
                  textAlign: "center",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {question.question.replace(/\\n/g, "\n")}
              </Typography>

              {/* 選項 */}
              <OptionGrid
                options={question.options}
                correctAnswer={question.correctAnswer}
                active={open}
                showResult={showResult}
                allowPlayAfterResult   
                onSelect={(value) => {
                  const isCorrect = String(value) === String(question.correctAnswer);
                  // 需要即時加分/提示可在此處處理 isCorrect
                }}
              />
            </Box>
          </Grow>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 4, flexDirection: "column", gap: 3 }}>
          {!showResult && (
            <Button
              variant="contained"
              onClick={handleShowAnswer}
              sx={{
                backgroundColor: "#fff",
                color: "#1a237e",
                "&:hover": { backgroundColor: "#f5f5f5" },
                width: "400px",
                height: "80px",
                fontSize: "2.5rem",
                borderRadius: "15px",
              }}
            >
              顯示答案
            </Button>
          )}

          {showResult && (
            <Grow in={showResult} timeout={800}>
              <Box
                sx={{
                  textAlign: "center",
                  width: "80%",
                  margin: "0 auto",
                  maxHeight: "300px",
                  overflowY: "auto",
                  paddingRight: "10px",
                }}
              >
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    color: "#fff",
                    mb: 3,
                    fontWeight: "bold",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    width: "100%",
                    animation: "bounceInDown 1s ease-out",
                    padding: "30px",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(135deg, rgba(76, 175, 80, 0.3) 0%, rgba(76, 175, 80, 0.1) 100%)",
                    border: "2px solid #4caf50",
                    boxShadow: "0 0 20px rgba(76, 175, 80, 0.5)",
                    "@keyframes bounceInDown": {
                      "0%": { opacity: 0, transform: "translateY(-500px)" },
                      "60%": { opacity: 1, transform: "translateY(30px)" },
                      "80%": { transform: "translateY(-10px)" },
                      "100%": { transform: "translateY(0)" },
                    },
                    "&::after": {
                      content: '"✓"',
                      position: "absolute",
                      top: "-15px",
                      right: "-15px",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#4caf50",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      animation: "popIn 0.5s ease-out 0.8s both",
                    },
                    "@keyframes popIn": {
                      "0%": { transform: "scale(0)" },
                      "80%": { transform: "scale(1.2)" },
                      "100%": { transform: "scale(1)" },
                    },
                    position: "relative",
                  }}
                >
                  正確答案：{question.correctAnswer.replace(/\\n/g, "\n")}
                </Typography>

                {question.answerImage && (
                  <Box sx={{ textAlign: "center", my: 3 }}>
                    <img
                      src={question.answerImage}
                      alt="答案圖片"
                      style={{ maxWidth: "100%", borderRadius: "10px", border: "2px solid #4caf50" }}
                    />
                  </Box>
                )}

                {question.explanation && (
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      color: "#fff",
                      mt: 3,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      width: "100%",
                      opacity: 0,
                      animation: "slideUp 0.5s ease-out 0.3s forwards",
                      padding: "20px",
                      borderRadius: "15px",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      "@keyframes slideUp": {
                        "0%": { opacity: 0, transform: "translateY(20px)" },
                        "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    {question.explanation.replace(/\\n/g, "\n")}
                  </Typography>
                )}
              </Box>
            </Grow>
          )}

          {timeUp && !showResult && (
            <Grow in={timeUp}>
              <Typography variant="h3" component="div" sx={{ color: "#f44336", fontWeight: "bold" }}>
                時間到！
              </Typography>
            </Grow>
          )}
        </DialogActions>
      </Dialog>

      {/* 顯示答案前的確認彈窗 */}
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        PaperProps={{ sx: { backgroundColor: "#1a237e", borderRadius: 3, minWidth: "600px" } }}
      >
        <DialogTitle sx={{ textAlign: "center", color: "white", pt: 4, pb: 3, fontSize: "2.5rem" }}>
          確認顯示答案
        </DialogTitle>
        <DialogContent sx={{ pb: 4 }}>
          <DialogContentText sx={{ color: "white", textAlign: "center", opacity: 0.9, fontSize: "2rem" }}>
            確定要顯示答案嗎？
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 4, gap: 4 }}>
          <Button
            onClick={() => setOpenConfirm(false)}
            sx={{
              color: "#fff",
              borderColor: "#fff",
              "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255, 255, 255, 0.1)" },
              width: "200px",
              height: "70px",
              fontSize: "1.8rem",
              borderRadius: "12px",
            }}
            variant="outlined"
          >
            取消
          </Button>
          <Button
            onClick={handleConfirm}
            sx={{
              backgroundColor: "#fff",
              color: "#1a237e",
              "&:hover": { backgroundColor: "#f5f5f5" },
              width: "200px",
              height: "70px",
              fontSize: "1.8rem",
              borderRadius: "12px",
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
