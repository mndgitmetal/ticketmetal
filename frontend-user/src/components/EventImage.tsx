import React, { useState, useRef } from 'react';

const DEFAULT_EVENT_IMAGE = 'https://metalneverdie.com.br/_next/image?url=%2Fheavy-metal-concert-dark.png&w=384&q=75';

interface EventImageProps {
  src: string;
  alt: string;
  className?: string;
}

// Função para validar se a URL é válida
const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed === '' || trimmed === 'null' || trimmed === 'undefined' || trimmed === 'null' || trimmed.toLowerCase() === 'none') {
    return false;
  }
  
  // Verificar se é uma URL válida (http, https, data:)
  try {
    const urlObj = new URL(trimmed);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    // Se não for URL absoluta, pode ser data: ou caminho relativo
    return trimmed.startsWith('data:') || trimmed.startsWith('/');
  }
};

const EventImage: React.FC<EventImageProps> = ({ src, alt, className = '' }) => {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    // Se src estiver vazio ou inválido, usar imagem padrão
    if (!isValidImageUrl(src)) {
      return DEFAULT_EVENT_IMAGE;
    }
    return src;
  });
  const errorCountRef = useRef(0);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    // Limitar tentativas para evitar loop infinito
    if (errorCountRef.current < 2 && target.src !== DEFAULT_EVENT_IMAGE) {
      errorCountRef.current += 1;
      setImgSrc(DEFAULT_EVENT_IMAGE);
    }
  };

  // Atualizar quando src mudar
  React.useEffect(() => {
    errorCountRef.current = 0;
    if (isValidImageUrl(src)) {
      setImgSrc(src);
    } else {
      setImgSrc(DEFAULT_EVENT_IMAGE);
    }
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default EventImage;

