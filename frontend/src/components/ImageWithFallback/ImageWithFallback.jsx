import React from 'react';

/**
 * A component that displays an image with a fallback if the image fails to load
 */
const ImageWithFallback = ({
  src,
  alt,
  fallbackSrc = '/placeholder-image.png',
  className = '',
  ...props
}) => {
  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackSrc;
  };

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};

export default ImageWithFallback;
