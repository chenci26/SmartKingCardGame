import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const ImageCarousel = ({ images, isGoogleDriveUrl, convertGoogleDriveUrl, maxHeight = '200px', maxWidth = '100%' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  // 确保 images 是数组
  const imageArray = Array.isArray(images) ? images : [images];

  const handlePrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imageArray.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === imageArray.length - 1 ? 0 : prev + 1));
  };

  const currentImage = imageArray[currentIndex];

  // 单张图片不显示轮播控制
  if (imageArray.length === 1) {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {isGoogleDriveUrl(currentImage) ? (
          <Box
            component="iframe"
            src={convertGoogleDriveUrl(currentImage)}
            sx={{
              width: maxWidth,
              height: maxHeight,
              borderRadius: '8px',
              border: 'none'
            }}
          />
        ) : (
          <Box
            component="img"
            src={currentImage}
            alt="选项图片"
            sx={{
              maxWidth: maxWidth,
              maxHeight: maxHeight,
              borderRadius: '8px',
              objectFit: 'contain'
            }}
          />
        )}
      </Box>
    );
  }

  // 多张图片显示轮播
  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* 左箭头 */}
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: 0,
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          },
          boxShadow: 2
        }}
        size="small"
      >
        <ChevronLeft />
      </IconButton>

      {/* 图片显示区域 */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', px: 5 }}>
        {isGoogleDriveUrl(currentImage) ? (
          <Box
            component="iframe"
            src={convertGoogleDriveUrl(currentImage)}
            sx={{
              width: maxWidth,
              height: maxHeight,
              borderRadius: '8px',
              border: 'none',
              transition: 'all 0.3s ease-in-out'
            }}
          />
        ) : (
          <Box
            component="img"
            src={currentImage}
            alt={`图片 ${currentIndex + 1}`}
            sx={{
              maxWidth: maxWidth,
              maxHeight: maxHeight,
              borderRadius: '8px',
              objectFit: 'contain',
              transition: 'all 0.3s ease-in-out'
            }}
          />
        )}
      </Box>

      {/* 右箭头 */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 0,
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          },
          boxShadow: 2
        }}
        size="small"
      >
        <ChevronRight />
      </IconButton>

      {/* 指示器 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -20,
          display: 'flex',
          gap: 0.5,
          justifyContent: 'center'
        }}
      >
        {imageArray.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.4)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageCarousel;
