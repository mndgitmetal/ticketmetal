import React from 'react';
import LogoLockup from '../components/LogoLockup.tsx';

const LogoShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black metal-text text-red-400 mb-4" 
              style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase', letterSpacing: '2px' }}>
            LOGO LOCKUP SHOWCASE
          </h1>
          <p className="text-gray-300 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Demonstração das variações do logo unindo Ticket Metal e Metal Never Die
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Variação Simples (Header) */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-red-500/30">
            <h2 className="text-2xl font-bold text-red-400 mb-6" 
                style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>
              Layout Simples (Header)
            </h2>
            
            <div className="space-y-8">
              {/* Tamanho Grande */}
              <div className="bg-black/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Tamanho Grande</h3>
                <LogoLockup size="large" variant="simple" />
              </div>
              
              {/* Tamanho Médio */}
              <div className="bg-black/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Tamanho Médio</h3>
                <LogoLockup size="medium" variant="simple" />
              </div>
              
              {/* Tamanho Pequeno */}
              <div className="bg-black/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Tamanho Pequeno</h3>
                <LogoLockup size="small" variant="simple" />
              </div>
            </div>
          </div>

          {/* Variação Horizontal */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-red-500/30">
            <h2 className="text-2xl font-bold text-red-400 mb-6" 
                style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>
              Layout Horizontal
            </h2>
            
            <div className="space-y-8">
              {/* Tamanho Grande */}
              <div className="bg-black/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Tamanho Grande</h3>
                <LogoLockup size="large" variant="horizontal" />
              </div>
              
              {/* Tamanho Médio */}
              <div className="bg-black/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Tamanho Médio</h3>
                <LogoLockup size="medium" variant="horizontal" />
              </div>
              
              {/* Tamanho Pequeno */}
              <div className="bg-black/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Tamanho Pequeno</h3>
                <LogoLockup size="small" variant="horizontal" />
              </div>
            </div>
          </div>

          {/* Variação Vertical */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-red-500/30">
            <h2 className="text-2xl font-bold text-red-400 mb-6" 
                style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>
              Layout Vertical
            </h2>
            
            <div className="space-y-8">
              {/* Tamanho Grande */}
              <div className="bg-black/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Tamanho Grande</h3>
                <LogoLockup size="large" variant="vertical" />
              </div>
              
              {/* Tamanho Médio */}
              <div className="bg-black/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Tamanho Médio</h3>
                <LogoLockup size="medium" variant="vertical" />
              </div>
              
              {/* Tamanho Pequeno */}
              <div className="bg-black/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Tamanho Pequeno</h3>
                <LogoLockup size="small" variant="vertical" />
              </div>
            </div>
          </div>
        </div>

        {/* Aplicações Práticas */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-red-400 mb-8 text-center" 
              style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>
            Aplicações Práticas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Header */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
              <h3 className="text-xl font-bold text-red-400 mb-4">Header</h3>
              <div className="bg-black/50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <LogoLockup size="medium" variant="simple" />
                  <div className="text-gray-400 text-sm">Menu items...</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
              <h3 className="text-xl font-bold text-red-400 mb-4">Footer</h3>
              <div className="bg-black/50 p-4 rounded-lg">
                <LogoLockup size="small" variant="vertical" />
              </div>
            </div>

            {/* Cards */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
              <h3 className="text-xl font-bold text-red-400 mb-4">Cards</h3>
              <div className="bg-black/50 p-4 rounded-lg">
                <LogoLockup size="small" variant="horizontal" />
              </div>
            </div>
          </div>
        </div>

        {/* Especificações Técnicas */}
        <div className="mt-12 bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-red-500/30">
          <h2 className="text-3xl font-bold text-red-400 mb-6" 
              style={{ fontFamily: 'Orbitron, monospace', textTransform: 'uppercase' }}>
            Especificações Técnicas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-300 mb-4">Cores</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• <span className="text-red-400">Ticket Metal</span>: Vermelho metal (#ef4444)</li>
                <li>• <span className="text-red-500">MND</span>: Vermelho (#ef4444) - baseado no logo real</li>
                <li>• <span className="text-white">METAL NEVER DIE</span>: Branco - baseado no logo real</li>
                <li>• <span className="text-gray-400">Powered by</span>: Cinza médio</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-300 mb-4">Fontes</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• <span className="font-mono">Ticket Metal</span>: Orbitron (monospace)</li>
                <li>• <span className="font-sans">MND</span>: Arial (sans-serif) - baseado no logo real</li>
                <li>• <span className="font-sans">METAL NEVER DIE</span>: Arial (sans-serif) - baseado no logo real</li>
                <li>• <span className="font-sans">Powered by</span>: Rajdhani (sans-serif)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Baseado no Logo Real da MND</h3>
            <div className="bg-black/50 p-6 rounded-lg border border-red-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <span className="font-black text-red-500 text-2xl" 
                      style={{ fontFamily: 'Arial, sans-serif', fontWeight: '900' }}>
                  MND
                </span>
                <span className="font-black text-white text-xl" 
                      style={{ fontFamily: 'Arial, sans-serif', fontWeight: '900' }}>
                  METAL NEVER DIE
                </span>
              </div>
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                O logo lockup foi atualizado para refletir fielmente a identidade visual real da marca Metal Never Die, 
                usando as mesmas cores (vermelho e branco) e fonte (Arial bold) do site oficial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
