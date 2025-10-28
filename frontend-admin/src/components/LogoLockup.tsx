import React from 'react';

interface LogoLockupProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'horizontal' | 'vertical' | 'simple';
  className?: string;
}

const LogoLockup: React.FC<LogoLockupProps> = ({ 
  size = 'medium', 
  variant = 'horizontal',
  className = '' 
}) => {
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl'
  };

  const mndSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  const handleMndClick = () => {
    window.open('https://www.metalneverdie.com.br', '_blank');
  };

  if (variant === 'simple') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {/* Logo Principal Ticket Metal */}
        <div className={`font-black text-blue-600 ${sizeClasses[size]}`} 
             style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase', letterSpacing: '2px' }}>
          TICKET METAL
        </div>
        
        {/* Separador mais sutil */}
        <div className="text-gray-500 font-normal">•</div>
        
        {/* Powered by MND simples */}
        <div className={`flex items-center space-x-1 ${mndSizeClasses[size]} text-gray-500`}>
          <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>powered by</span>
          
          {/* Logo MND clicável - versão simples */}
          <button
            onClick={handleMndClick}
            className="hover:opacity-80 transition-opacity cursor-pointer group"
            title="Visitar Metal Never Die"
          >
            <span className="font-black text-red-500 group-hover:text-red-400 transition-colors" 
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.1em', fontWeight: '900' }}>
              MND
            </span>
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center space-y-3 ${className}`}>
        {/* Logo Principal Ticket Metal */}
        <div className={`font-black text-blue-600 ${sizeClasses[size]}`} 
             style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase', letterSpacing: '2px' }}>
          TICKET METAL
        </div>
        
        {/* Powered by Metal Never Die */}
        <div className={`flex flex-col items-center space-y-2 ${mndSizeClasses[size]} text-gray-500`}>
          <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>powered by</span>
          
          {/* Logo MND clicável - baseado no logo real */}
          <button
            onClick={handleMndClick}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer group"
            title="Visitar Metal Never Die"
          >
            {/* MND em vermelho */}
            <span className="font-black text-red-500 group-hover:text-red-400 transition-colors" 
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.1em', fontWeight: '900' }}>
              MND
            </span>
            {/* METAL NEVER DIE em branco */}
            <span className="font-black text-gray-800 group-hover:text-gray-600 transition-colors" 
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.9em', fontWeight: '900' }}>
              METAL NEVER DIE
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Principal Ticket Metal */}
      <div className={`font-black text-blue-600 ${sizeClasses[size]}`} 
           style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase', letterSpacing: '2px' }}>
        TICKET METAL
      </div>
      
      {/* Separador mais sutil */}
      <div className="text-gray-500 font-normal">•</div>
      
      {/* Powered by Metal Never Die */}
      <div className={`flex items-center space-x-2 ${mndSizeClasses[size]} text-gray-500`}>
        <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>powered by</span>
        
        {/* Logo MND clicável - baseado no logo real */}
        <button
          onClick={handleMndClick}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer group"
          title="Visitar Metal Never Die"
        >
          {/* MND em vermelho */}
          <span className="font-black text-red-500 group-hover:text-red-400 transition-colors" 
                style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.1em', fontWeight: '900' }}>
            MND
          </span>
          {/* METAL NEVER DIE em branco */}
          <span className="font-black text-gray-800 group-hover:text-gray-600 transition-colors" 
                style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.9em', fontWeight: '900' }}>
            METAL NEVER DIE
          </span>
        </button>
      </div>
    </div>
  );
};

export default LogoLockup;
